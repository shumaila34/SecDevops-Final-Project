import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { BsThreeDotsVertical } from "react-icons/bs";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { addToCart } from "../Config/redux/reducers/cartSlice";


const SingleProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const [editData, setEditData] = useState({
    name: "",
    description: "",
    price: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `https://ecommerce-web-app-server.vercel.app/api/v1/singleProduct/${id}`,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );

        setProduct(res.data);
        setEditData({
          name: res.data.name || res.data.title,
          description: res.data.description,
          price: res.data.price,
        });
      } catch (err) {
        console.log(err);
      }
    };

    fetchProduct();
  }, [id]);

  // 🛒 ADD TO CART
  const handleAddToCart = () => {
    dispatch(addToCart(product));

    Swal.fire({
      icon: "success",
      title: "Added to Cart",
      text: "Product added successfully!",
      timer: 1200,
      showConfirmButton: false,
    });
  };

  // 🗑️ Delete handler
  const handleDelete = async (id) => {
    const token = localStorage.getItem("accessToken");

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const response = await axios.delete(
          `https://ecommerce-web-app-server.vercel.app/api/v1/deleteProduct/${id}`,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          Swal.fire("Deleted!", response.data.message, "success");
          navigate("/profile");
        }
      } catch (error) {
        Swal.fire("Error!", "Something went wrong while deleting.", "error");
      }
    }
  };

  // ✏️ Update handler
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `https://ecommerce-web-app-server.vercel.app/api/v1/updateProduct/${id}`,
        editData,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      setProduct(res.data.product);
      setEditModal(false);

      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Product updated successfully!",
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Something went wrong while updating the product.",
      });
    }
  };

  if (!product) return <div className="p-6">Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto bg-white shadow p-6 mt-10 rounded relative">
      {/* 3 Dot Menu */}
      <div className="absolute right-4 top-4">
        <BsThreeDotsVertical
          className="text-2xl cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        />

        {menuOpen && (
          <div className="absolute right-0 mt-2 bg-white border rounded-xl shadow p-3 space-y-2 z-10 w-32">
            <button
              onClick={() => {
                setEditModal(true);
                setMenuOpen(false);
              }}
              className="block w-full text-left text-blue-700"
            >
              ✏️ Edit
            </button>
            <button
              onClick={() => {
                handleDelete(id);
                setMenuOpen(false);
              }}
              className="block w-full text-left text-red-600"
            >
              🗑️ Delete
            </button>
          </div>
        )}
      </div>

      {/* Product Detail */}
      <div className="w-full h-[300px] flex justify-center items-center bg-gray-100 rounded overflow-hidden">
        <img
          src={product.postImage}
          alt={product.title}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      <h2 className="text-2xl font-bold mt-4">
        {product.title || product.name}
      </h2>
      <p className="text-gray-700 my-2">{product.description}</p>
      <p className="text-green-600 font-bold">Rs. {product.price}</p>

      {/* 🛒 ADD TO CART BUTTON */}
      <button
        onClick={handleAddToCart}
        className="mt-4 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
      >
        🛒 Add to Cart
      </button>

      {/* ✨ Edit Modal */}
      {editModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Edit Product</h2>
            <form onSubmit={handleUpdate} className="space-y-4">
              <input
                type="text"
                value={editData.name}
                onChange={(e) =>
                  setEditData({ ...editData, name: e.target.value })
                }
                className="w-full border p-2 rounded"
              />
              <textarea
                value={editData.description}
                onChange={(e) =>
                  setEditData({ ...editData, description: e.target.value })
                }
                className="w-full border p-2 rounded"
              />
              <input
                type="number"
                value={editData.price}
                onChange={(e) =>
                  setEditData({ ...editData, price: e.target.value })
                }
                className="w-full border p-2 rounded"
              />
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditModal(false)}
                  className="border px-4 py-1 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-1 rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleProduct;
