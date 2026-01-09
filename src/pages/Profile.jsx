import  { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // ✅ import Link

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [userProducts, setUserProducts] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('https://ecommerce-web-app-server.vercel.app/api/v1/auth/single-user', {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });
        console.log(response);
        
        setUserData(response.data);
      } catch (error) {
        console.error("User fetch error:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchUserProducts = async () => {
      try {
        const res = await axios.get('https://ecommerce-web-app-server.vercel.app/api/v1/userProducts', {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });
        console.log(res);

        setUserProducts(res.data.data);
      } catch (err) {
        console.error("Product fetch error:", err);
      }
    };

    fetchUserProducts();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      {/* 🔹 Profile Section */}
      <div className="bg-white shadow-md rounded-lg p-4 flex items-center gap-4 max-w-3xl mx-auto mb-8">
        <img
          className="w-20 h-20 object-cover rounded-full border-2 border-gray-400"
          src={userData?.user?.profilePicture || 'https://www.shutterstock.com/image-vector/avatar-gender-neutral-silhouette-vector-600nw-2470054311.jpg'}
          alt="profile"
        />
        <div>
          <h2 className="text-xl font-semibold">{userData?.user?.userName} {userData?.user?.fullName}</h2>
          <p className="text-gray-600">{userData?.user?.email}</p>
        </div>
      </div>

      {/* 🔸 Products Section */}
      <div className="max-w-5xl mx-auto">
        <h3 className="text-2xl font-bold mb-4">Uploaded Products</h3>
        {userProducts && userProducts.length > 0 ? (
  <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
    {userProducts.map((product) => (
      <Link
        to={`/SingleProduct/${product._id}`}
        key={product._id}
        className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform"
      >
        <img
          src={product.postImage || "https://via.placeholder.com/300"}
          alt={product.title}
          className="h-48 w-full object-cover"
        />
        <div className="p-4">
          <h4 className="text-lg font-semibold">{product.title}</h4>
          <p className="text-gray-600 text-sm mb-2">
            {product.description?.slice(0, 60)}...
          </p>
          <p className="text-green-600 font-bold">Rs. {product.price}</p>
        </div>
      </Link>
    ))}
  </div>
) : (
  <p className="text-gray-500">You have not posted any products yet.</p>
)}

      </div>
    </div>
  );
};

export default Profile;
