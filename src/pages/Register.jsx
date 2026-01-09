import  { useRef, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const fullName = useRef();
  const userName = useRef();
  const email = useRef();
  const password = useRef();
  const mobileNumber = useRef();
  const [image, setimage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleImageChange = (event) => {
    setimage(event.target.files[0]);
  };
  console.log(handleImageChange);
  

  // const handleRegister = async (event) => {
  //   event.preventDefault();
  //   setLoading(true);

  //   try {
  //     const formData = new FormData();
  //     formData.append('fullName', fullName.current.value);
  //     formData.append('userName', userName.current.value);
  //     formData.append('email', email.current.value);
  //     formData.append('password', password.current.value);
  //     formData.append('mobileNumber', mobileNumber.current.value);
  //     if (image) {
  //       formData.append('image', image);
  //     }
  //     fullName.current.value = "";
  //     userName.current.value = "";
  //     email.current.value = "";
  //     password.current.value = "";
      

  //     const response = await axios.post('https://ecommerce-web-app-server.vercel.app/api/v1/auth/register', formData, {
  //       headers: { 'Content-Type': 'multipart/form-data' },
  //       withCredentials: true, // ✅ Important for authentication
        
  //     });

  //     console.log(response.data);

      
  //     Swal.fire({
  //       icon: 'success',
  //       title: 'Success!',
  //       text: 'Registration successful!',
  //     }).then(() => {
  //       navigate('/login'); 
  //     });

  //   } catch (error) {
  //     console.error("Registration Error:", error.response?.data); // ✅ Debugging Step
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Oops...',
  //       text: 'Registration failed. User already Exist.',
  //     });
  //   } finally {
  //     setLoading(false);
  //   }
  // };

const handleRegister = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('fullName', fullName.current.value);
      formData.append('userName', userName.current.value);
      formData.append('email', email.current.value);
      formData.append('password', password.current.value);
      formData.append('mobileNumber', mobileNumber.current.value);
      if (image) {
        formData.append('image', image);
      }
      fullName.current.value = "";
      userName.current.value = "";
      email.current.value = "";
      password.current.value = "";
      

      const response = await axios.post('https://ecommerce-web-app-server.vercel.app/api/v1/auth/register', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true, // ✅ Important for authentication
        
      });

      console.log(response.data);

      
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Registration successful!',
      }).then(() => {
        navigate('/login'); 
      });

    } catch (error) {
      console.error("Registration Error:", error.response?.data); // ✅ Debugging Step
      
      // Check if user already exists
      const errorMessage = error.response?.data?.message || '';
      const isUserExists = errorMessage.toLowerCase().includes('exist') || 
                          errorMessage.toLowerCase().includes('already') ||
                          error.response?.status === 409; // 409 is Conflict status code
      
      if (isUserExists) {
        Swal.fire({
          icon: 'error',
          title: 'User Already Exists',
          text: 'This email or username is already registered. Please try logging in or use different credentials.',
        });
      } else {
        // Server error or other errors
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: error.response?.data?.message || 'Something went wrong. Please try again later.',
        });
      }
    } finally {
      setLoading(false);
    }
  };




  return (
    <>
<h1 className="text-center mt-8 text-4xl font-bold text-[#d32e2e]">Register</h1>
<div className="flex justify-center items-center mt-9">
  <form
    className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-300"
    onSubmit={handleRegister}
  >
    <div className="mb-4">
      <input
        type="text"
        required
        placeholder="Enter your first name"
        ref={userName}
        className="text-black input w-full border border-gray-400 focus:border-[#d32e2e] shadow-sm hover:shadow-md transition-shadow duration-300"
      />
    </div>
    <div className="mb-4">
      <input
        type="text"
        placeholder="Enter your last name"
        ref={fullName}
        className="text-black input w-full border border-gray-400 focus:border-[#d32e2e] shadow-sm hover:shadow-md transition-shadow duration-300"
      />
    </div>
    <div className="mb-4">
      <input
        type="email"
        required
        placeholder="Enter your email"
        ref={email}
        className="text-black input w-full border border-gray-400 focus:border-[#d32e2e] shadow-sm hover:shadow-md transition-shadow duration-300"
      />
    </div>
    <div className="mb-4">
      <input
        type="password"
        required
        placeholder="Enter your password"
        ref={password}
        className="text-black input w-full border border-gray-400 focus:border-[#d32e2e] shadow-sm hover:shadow-md transition-shadow duration-300"
      />
    </div>
    <div className="mb-4">
      <input
        type="number"
        required
        placeholder="Enter your mobile number"
        ref={mobileNumber}
        className="text-black input w-full border border-gray-400 focus:border-[#d32e2e] shadow-sm hover:shadow-md transition-shadow duration-300"
      />
    </div>
    <div className="mb-4">
      <input
        type="file"
        required
        accept="image/*"
        onChange={handleImageChange}
        className="text-black file-input w-full border border-gray-400 shadow-sm hover:shadow-md transition-shadow duration-300"
      />
    </div>
    <div className="flex justify-center">
      <button
        type="submit"
        className={`btn bg-[#d32e2e] text-white w-25 shadow-md hover:shadow-lg transition-all duration-300 ${loading ? 'btn-disabled' : ''}`}
        disabled={loading}
      >
        {loading ? <span className="loading loading-spinner"></span> : 'Register'}
      </button>
    </div>
    <div className="mt-2 text-center">
      <Link to="/login" className="text-[#d32e2e] hover:underline">
        Already a user? Login here.
      </Link>
    </div>
  </form>
</div>
    </>
  );
};

export default Register;

