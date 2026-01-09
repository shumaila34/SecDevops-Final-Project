import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addproduct } from "../Config/redux/reducers/productSlice";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const categories = [
  "Fashion",
  "Beauty",
  "Electronics",
  "Laptops",
  "Home",
  "Appliances",
  "Gaming",
  "Clothing",
];

const Dashboard = () => {
  const Name = useRef();
  const Description = useRef();
  const Price = useRef();
  const mobileNumber = useRef();
  const [category, setCategory] = useState("");
  const [image, setimage] = useState(null);
  const [location, setLocation] = useState(""); 
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleImageChange = (event) => {
    setimage(event.target.files[0]);
  };

  const addProduct = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", Name.current?.value || "");
      formData.append("description", Description.current?.value || "");
      formData.append("price", Price.current?.value || "");
      formData.append("mobileNumber", mobileNumber.current?.value || "");
      formData.append("category", category || "");
      formData.append("location",location || "")
      formData.append("image", image);

      const token = localStorage.getItem("accessToken");
      if (!token) {
        return Swal.fire("Unauthorized", "Please login first", "error");
      }

      const response = await axios.post(
        "https://ecommerce-web-app-server.vercel.app/api/v1/addProduct",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(addproduct(response.data.product));

      // Reset fields
      Name.current.value = "";
      Description.current.value = "";
      Price.current.value = "";
      mobileNumber.current.value = "";
      setCategory("");
      setimage(null);

      // Show alert and redirect
      Swal.fire("Success", "Product added successfully!", "success").then(() => {
        navigate("/");
      });
    } catch (error) {
      console.error(error);
      Swal.fire("Error", error.response?.data?.error || "Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Add Product</h1>

      <form
        onSubmit={addProduct}
        className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 backdrop-blur-md transition-all duration-300 hover:shadow-xl"
      >
        <input
          type="text"
          ref={Name}
          placeholder="Product Name"
          className="text-black input input-bordered w-full mb-4 transition-all duration-300 focus:ring-2 focus:ring-[#d32e2e]"
          required
        />

        <input
          type="text"
          ref={Description}
          placeholder="Description"
          className="text-black input input-bordered w-full mb-4 transition-all duration-300 focus:ring-2 focus:ring-[#d32e2e]"
          required
        />

        <input
          type="number"
          ref={Price}
          placeholder="Price"
          className="text-black input input-bordered w-full mb-4 transition-all duration-300 focus:ring-2 focus:ring-[#d32e2e]"
          required
        />

        <input
          type="number"
          ref={mobileNumber}
          placeholder="Mobile Number"
          className="text-black input input-bordered w-full mb-4 transition-all duration-300 focus:ring-2 focus:ring-[#d32e2e]"
          required
        />

        <select
          className="select select-bordered w-full mb-4 transition-all duration-300 focus:ring-2 focus:ring-[#d32e2e]"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="" disabled>Select Category</option>
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>{cat}</option>
          ))}
        </select>

      <input
       type="text"
      value={location}
      onChange={(e) => setLocation(e.target.value)}
      placeholder="Enter full address (e.g., House # 123, Street 4, G-11, Islamabad)"
      className="input input-bordered w-full mb-4 transition-all duration-300 focus:ring-2 focus:ring-[#d32e2e]"
      required
    />

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="file-input file-input-bordered w-full mb-6"
          required
        />

        <div className="text-center">
          <button
            type="submit"
            disabled={loading}
            className={`btn w-full bg-[#d32e2e] text-white hover:bg-[#b42424] transition-all duration-300 ${loading ? "btn-disabled" : ""}`}
          >
            {loading ? <span className="loading loading-spinner"></span> : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Dashboard;
