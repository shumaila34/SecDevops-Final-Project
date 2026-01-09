import  { useRef, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../Config/redux/reducers/userSlice.js';

const Login = () => {
  const email = useRef();
  const password = useRef();
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "https://ecommerce-web-app-server.vercel.app/api/v1/auth/login",
        {
          email: email.current.value,
          password: password.current.value,
        },
        { withCredentials: true }
      );

      if (response.data && response.data.accessToken) {
        const { accessToken, data: user } = response.data;
        dispatch(setUser({ userId: user.id, accessToken }));
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("userId", user.id);
      }

      Swal.fire({
        icon: "success",
        title: "Welcome!",
        text: "Login successful!",
        confirmButtonColor: "#d32e2e",
      }).then(() => navigate("/"));

    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Check your email and password.",
        confirmButtonColor: "#d32e2e",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white border border-gray-300 p-10 rounded-2xl shadow-xl relative">
        <h2 className="text-3xl font-bold text-center text-[#d32e2e] mb-8 relative z-10">Login</h2>
        <form onSubmit={handleLogin} className="space-y-5 z-10 relative">
          <input
            type="email"
            ref={email}
            placeholder="Email"
            required
            className="w-full p-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d32e2e] placeholder-gray-500 text-black transition-all"
          />
          <input
            type="password"
            ref={password}
            placeholder="Password"
            required
            className="w-full p-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d32e2e] placeholder-gray-500 text-black transition-all"
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 bg-[#d32e2e] text-white font-semibold rounded-lg hover:bg-[#b72929] transition-all duration-300 ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
          >
            {loading ? <span className="loading loading-spinner text-white" /> : "Login"}
          </button>
        </form>
          <p className="text-sm text-gray-600 text-center mt-6">
         Don’t have an account? <Link to="/Register" className="text-[#d32e2e] hover:underline">Register here</Link>
          </p>
      </div>
    </div>
  );
};

export default Login;
