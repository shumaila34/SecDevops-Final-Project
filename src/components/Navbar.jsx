import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, setUser } from "../Config/redux/reducers/userSlice.js";
import { FaShoppingCart, FaUser, FaPlus, FaBars, FaTimes, FaHome, FaUserCircle, FaSignOutAlt, FaSignInAlt } from "react-icons/fa";
import { MdLocalShipping } from "react-icons/md";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const user = useSelector((state) => state.user.user);
  const accessToken = useSelector((state) => state.user.accessToken);

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    const storedUserId = localStorage.getItem("userId");

    if (storedToken && storedUserId) {
      fetchUser(storedToken);
    }
  }, [accessToken]);

  const fetchUser = async (token) => {
    try {
      const response = await axios.get(
        "https://ecommerce-web-app-server.vercel.app/api/v1/auth/single-user",
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      dispatch(setUser({
        user: response.data,
        accessToken: token
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleSellClick = () => {
    if (user) {
      navigate("/Dashboard");
    } else {
      navigate("/login");
    }
  };

  const userLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, logout",
      cancelButtonText: "Cancel",
      customClass: {
        popup: 'custom-swal-popup',
        backdrop: 'custom-swal-backdrop',
      },
      allowOutsideClick: false,
      allowEscapeKey: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const blurDiv = document.createElement("div");
        blurDiv.id = "logout-blur-overlay";
        blurDiv.innerHTML = `
          <div style="
            position: fixed;
            top: 0; left: 0;
            width: 100vw; height: 100vh;
            backdrop-filter: blur(6px);
            background-color: rgba(0, 0, 0, 0.2);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
          ">
            <span class="loading loading-spinner loading-lg text-white"></span>
          </div>
        `;
        document.body.appendChild(blurDiv);

        try {
          setLogoutLoading(true);

          await axios.post(
            "https://ecommerce-web-app-server.vercel.app/api/v1/auth/logout",
            {},
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              },
              withCredentials: true,
            }
          );

          dispatch(logoutUser());
          localStorage.removeItem("accessToken");
          localStorage.removeItem("userId");

          document.getElementById("logout-blur-overlay")?.remove();

          Swal.fire({
            title: "Logged out!",
            text: "You have been logged out successfully.",
            icon: "success",
            confirmButtonText: "OK",
            customClass: {
              popup: 'custom-swal-popup'
            }
          });

          navigate("/login");
        } catch (error) {
          document.getElementById("logout-blur-overlay")?.remove();
          Swal.fire({
            title: "Error!",
            text: "Something went wrong while logging out.",
            icon: "error",
            confirmButtonText: "OK"
          });
        } finally {
          setLogoutLoading(false);
        }
      }
    });
  };

  return (
    <nav className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 shadow-lg sticky top-0 z-50">
      {/* Top Bar - Announcement */}
      <div className="bg-gradient-to-r from-red-800 to-red-900 text-white text-center py-2 text-sm">
        <div className="flex items-center justify-center gap-2">
          <MdLocalShipping className="animate-bounce" />
          <span>Free Shipping on Orders Over Rs. 2000 | Use Code: <span className="font-bold">FREESHIP</span></span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          
          {/* Logo - Unique Design */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              <div className="bg-white rounded-lg p-2 shadow-lg transform group-hover:scale-110 transition-all duration-300">
                <div className="relative">
                  <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-700 rounded-md flex items-center justify-center">
                    <FaShoppingCart className="text-white text-lg" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                KHARIDAAR
              </h1>
              <span className="text-xs text-red-200 tracking-wider">Your Shopping Partner</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            {/* Sell Button */}
            <button
              onClick={handleSellClick}
              className="flex items-center gap-2 bg-white text-red-700 font-bold px-6 py-2.5 rounded-full hover:bg-yellow-400 hover:text-red-800 transition-all duration-300 shadow-lg transform hover:scale-105"
            >
              <FaPlus className="text-sm" /> Sell
            </button>

            {/* User Dropdown */}
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar hover:scale-110 transition-transform duration-300">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-lg">
                  <img
                    src={user?.user?.profilePicture || "https://www.shutterstock.com/image-vector/avatar-gender-neutral-silhouette-vector-600nw-2470054311.jpg"}
                    alt="User Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-white rounded-xl z-[1] mt-3 w-56 p-3 shadow-2xl border border-gray-200"
              >
                {user ? (
                  <>
                    <li className="mb-1">
                      <Link to="/" className="flex items-center gap-3 hover:bg-red-50 hover:text-red-700 rounded-lg py-2.5 transition-all duration-200">
                        <FaHome className="text-lg" />
                        <span className="font-medium">Home</span>
                      </Link>
                    </li>
                    <li className="mb-1">
                      <Link to="/Profile" className="flex items-center gap-3 hover:bg-red-50 hover:text-red-700 rounded-lg py-2.5 transition-all duration-200">
                        <FaUserCircle className="text-lg" />
                        <span className="font-medium">Profile</span>
                      </Link>
                    </li>
                    <li className="mt-2 pt-2 border-t border-gray-200">
                      <button
                        onClick={userLogout}
                        disabled={logoutLoading}
                        className="w-full flex items-center justify-center gap-2 bg-red-600 text-white hover:bg-red-700 rounded-lg py-2.5 font-medium transition-all duration-200"
                      >
                        {logoutLoading ? (
                          <span className="loading loading-spinner loading-sm"></span>
                        ) : (
                          <>
                            <FaSignOutAlt className="text-lg" />
                            <span>Logout</span>
                          </>
                        )}
                      </button>
                    </li>
                  </>
                ) : (
                  <li>
                    <Link to="/Login" className="flex items-center justify-center gap-2 bg-red-600 text-white hover:bg-red-700 rounded-lg py-2.5 font-medium transition-all duration-200">
                      <FaSignInAlt className="text-lg" />
                      <span>Login</span>
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={handleSellClick}
              className="bg-white text-red-700 p-2 rounded-full hover:bg-yellow-400 transition-all duration-300"
            >
              <FaPlus className="text-lg" />
            </button>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white text-2xl hover:text-yellow-400 transition-all duration-300"
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gradient-to-b from-red-700 to-red-800 border-t border-red-500">
          <div className="px-4 py-6 space-y-3">
            <div className="flex items-center gap-3 pb-4 border-b border-red-600">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-lg">
                <img
                  src={user?.user?.profilePicture || "https://www.shutterstock.com/image-vector/avatar-gender-neutral-silhouette-vector-600nw-2470054311.jpg"}
                  alt="User Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-white">
                <p className="font-semibold">{user?.user?.fullName || "Guest User"}</p>
                <p className="text-xs text-red-200">{user?.user?.email || "Please login"}</p>
              </div>
            </div>

            {user ? (
              <>
                <Link to="/" className="flex items-center gap-3 text-white hover:text-yellow-400 py-3 border-b border-red-600 transition-all duration-300">
                  <FaHome className="text-lg" /> Home
                </Link>
                <Link to="/Profile" className="flex items-center gap-3 text-white hover:text-yellow-400 py-3 border-b border-red-600 transition-all duration-300">
                  <FaUserCircle className="text-lg" /> Profile
                </Link>
                <button
                  onClick={userLogout}
                  disabled={logoutLoading}
                  className="w-full flex items-center justify-center gap-2 bg-white text-red-700 hover:bg-yellow-400 rounded-lg py-3 font-semibold mt-4 transition-all duration-300"
                >
                  {logoutLoading ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : (
                    <>
                      <FaSignOutAlt className="text-lg" />
                      <span>Logout</span>
                    </>
                  )}
                </button>
              </>
            ) : (
              <Link to="/Login" className="w-full flex items-center justify-center gap-2 bg-white text-red-700 hover:bg-yellow-400 rounded-lg py-3 font-semibold transition-all duration-300">
                <FaSignInAlt className="text-lg" />
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;




















// import  { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { logoutUser, setUser } from "../Config/redux/reducers/userSlice.js";
// import { FaPlus } from "react-icons/fa";

// const Navbar = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [logoutLoading, setLogoutLoading] = useState(false);

//   const user = useSelector((state) => state.user.user);
//   const accessToken = useSelector((state) => state.user.accessToken);

//   useEffect(() => {
//     const storedToken = localStorage.getItem("accessToken");
//     const storedUserId = localStorage.getItem("userId");

//     if (storedToken && storedUserId) {
//       fetchUser(storedToken);
//     }
//   }, [accessToken]);

//   const fetchUser = async (token) => {
//     try {
//       const response = await axios.get(
//         "https://ecommerce-web-app-server.vercel.app/api/v1/auth/single-user",
//         {
//           headers: { Authorization: `Bearer ${token}` },
//           withCredentials: true,
//         }
//       );

//       dispatch(setUser({
//         user: response.data,
//         accessToken: token
//       }));
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleSellClick = () => {
//     if (user) {
//       navigate("/Dashboard");
//     } else {
//       navigate("/login");
//     }
//   };

//   const userLogout = () => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You will be logged out!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Yes, logout",
//       cancelButtonText: "Cancel",
//       customClass: {
//         popup: 'custom-swal-popup',
//         backdrop: 'custom-swal-backdrop',
//       },
//       allowOutsideClick: false,
//       allowEscapeKey: false,
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         // Show blur and spinner
//         const blurDiv = document.createElement("div");
//         blurDiv.id = "logout-blur-overlay";
//         blurDiv.innerHTML = `
//           <div style="
//             position: fixed;
//             top: 0; left: 0;
//             width: 100vw; height: 100vh;
//             backdrop-filter: blur(6px);
//             background-color: rgba(0, 0, 0, 0.2);
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             z-index: 9999;
//           ">
//             <span class="loading loading-spinner loading-lg text-white"></span>
//           </div>
//         `;
//         document.body.appendChild(blurDiv);

//         try {
//           setLogoutLoading(true);

//           await axios.post(
//             "https://ecommerce-web-app-server.vercel.app/api/v1/auth/logout",
//             {},
//             {
//               headers: {
//                 Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//               },
//               withCredentials: true,
//             }
//           );

//           dispatch(logoutUser());
//           localStorage.removeItem("accessToken");
//           localStorage.removeItem("userId");

//           // Remove blur and show success
//           document.getElementById("logout-blur-overlay")?.remove();

//           Swal.fire({
//             title: "Logged out!",
//             text: "You have been logged out successfully.",
//             icon: "success",
//             confirmButtonText: "OK",
//             customClass: {
//               popup: 'custom-swal-popup'
//             }
//           });

//           navigate("/login");
//         } catch (error) {
//           document.getElementById("logout-blur-overlay")?.remove();
//           Swal.fire({
//             title: "Error!",
//             text: "Something went wrong while logging out.",
//             icon: "error",
//             confirmButtonText: "OK"
//           });
//         } finally {
//           setLogoutLoading(false);
//         }
//       }
//     });
//   };

//   return (
//     <div className="navbar bg-red-700 px-4">
//       <div className="flex-1">
//         <Link to="/" className="btn btn-ghost text-xl text-white">
//           KHARIDAAR
//         </Link>
//       </div>

//       {/* Sell Button */}
//       <div className="mr-4">
//         <button
//           onClick={handleSellClick}
//           className="flex items-center gap-2 bg-white text-red-700 font-bold px-4 py-2 rounded-full hover:bg-red-100 transition border border-red-700"
//         >
//           <FaPlus className="text-sm" /> Sell
//         </button>
//       </div>

//       {/* User Avatar and Dropdown */}
//       <div className="flex-none gap-2">
//         <div className="dropdown dropdown-end">
//           <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
//             <div className="w-12 aspect-square rounded-full overflow-hidden border border-gray-300">
//               <img
//                 src={user?.user?.profilePicture || "https://www.shutterstock.com/image-vector/avatar-gender-neutral-silhouette-vector-600nw-2470054311.jpg"}
//                 alt="User Avatar"
//                 className="w-full h-full object-cover"
//               />
//             </div>
//           </div>
//           <ul
//             tabIndex={0}
//             className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
//           >
//             {user ? (
//               <>
//                 <li className="text-center"><Link to="/">Home</Link></li>
//                 <li className="text-center"><Link to="/Profile">Profile</Link></li>
//                 <li className="text-center">
//                   <button
//                     onClick={userLogout}
//                     disabled={logoutLoading}
//                     className="btn btn-sm bg-red-500 text-white hover:bg-red-600"
//                   >
//                     {logoutLoading ? (
//                       <span className="loading loading-spinner loading-sm"></span>
//                     ) : (
//                       "Logout"
//                     )}
//                   </button>
//                 </li>
//               </>
//             ) : (
//               <li className="text-center"><Link to="/Login">Login</Link></li>
//             )}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;
