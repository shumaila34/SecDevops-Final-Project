import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";
import { Phone } from "lucide-react";
import { BsChatDots } from "react-icons/bs";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { addToCart } from "../Config/redux/reducers/cartSlice";

const Singlecart = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [likes, setLikes] = useState([]);
  const [liked, setLiked] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [allComments, setAllComments] = useState([]);

  const user = useSelector((state) => state.user.user);
  const accessToken = useSelector((state) => state.user.accessToken);

  // Fetch product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `https://ecommerce-web-app-server.vercel.app/api/v1/publicsingleProduct/${id}`
        );
        setProduct(res.data);
        setLikes(res.data.likes || []);
        setLiked(res.data.likes?.includes(user?.user?._id));
      } catch (err) {
        console.error("Product fetch error:", err);
      }
    };

    fetchProduct();
  }, [id, user]);

  // Fetch comments
  useEffect(() => {
    const fetchComments = async () => {
      try {
        if (product?._id) {
          const res = await axios.get(
            `https://ecommerce-web-app-server.vercel.app/api/v1/comments/${product._id}`
          );
          setAllComments(res.data.comments);
        }
      } catch (err) {
        console.error("Error fetching comments:", err);
      }
    };

    fetchComments();
  }, [product]);

  // Like product
  const handleLike = async () => {
    if (!accessToken) {
      navigate("/login");
      return;
    }

    try {
      const res = await axios.put(
        `https://ecommerce-web-app-server.vercel.app/api/v1/likeProduct/${id}`,
        null,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      setLikes(res.data.likes);
      setLiked(res.data.likes.includes(user?.user?._id));
    } catch (err) {
      console.error("Like error:", err);
    }
  };

  // Add to cart
  const handleAddToCart = () => {
    if (!accessToken) {
      navigate("/login");
      return;
    }

    dispatch(
      addToCart({
        _id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
      })
    );

    Swal.fire({
      icon: "success",
      title: "Added to Cart 🛒",
      showConfirmButton: false,
      timer: 1200,
    }).then(() => {
    navigate("/cart"); // ✅ REDIRECT AFTER ADD
  });
  };

  // Comment submit
  const handleCommentSubmit = async () => {
    if (!accessToken) {
      navigate("/login");
      return;
    }

    if (!commentText.trim()) return;

    try {
      const res = await axios.post(
        `https://ecommerce-web-app-server.vercel.app/api/v1/commentProduct/${id}`,
        { text: commentText },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      setAllComments(res.data.comments);
      setCommentText("");
      Swal.fire("Comment added!", "", "success");
    } catch (err) {
      console.error("Comment error:", err);
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  if (!product) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow duration-300">
        <div className="flex gap-6">
          <img
            src={product.image}
            alt={product.name}
            className="w-1/2 h-[300px] object-cover rounded-lg"
          />

          <div className="w-1/2 space-y-4">
            <h2 className="text-2xl font-bold">{product.name}</h2>
            <p className="text-md text-gray-600">{product.description}</p>
            <p className="text-lg font-semibold">Rs {product.price}</p>

            <button
              onClick={handleAddToCart}
              className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              Add to Cart
            </button>

            <div className="flex items-center gap-2 text-gray-700">
              <Phone className="w-5 h-5" />
              <span>{product.mobileNumber}</span>
            </div>

            <div className="flex items-center gap-6 mt-3">
              <button
                onClick={handleLike}
                className="flex items-center text-red-600 text-lg hover:scale-110 transition"
              >
                {liked ? <FaHeart /> : <FaRegHeart />}
                <span className="ml-1 text-sm text-gray-600">
                  {likes.length}
                </span>
              </button>

              <div className="flex items-center text-blue-600 text-lg">
                <BsChatDots className="h-5 w-5" />
                <span className="ml-1 text-sm text-gray-600">
                  {allComments.length}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 border-t pt-4">
          <h3 className="text-md font-semibold mb-3">Comments</h3>

          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write a comment..."
              className="flex-1 border rounded-full px-4 py-2 text-sm"
            />
            <button
              onClick={handleCommentSubmit}
              className="bg-blue-500 text-white rounded-full px-4 py-2 text-sm"
            >
              Post
            </button>
          </div>

          <div className="space-y-3 max-h-60 overflow-y-auto">
            {allComments.length ? (
              allComments.map((c, i) => (
                <div key={i} className="flex gap-3 p-2 rounded-lg">
                  {c.user?.image ? (
                    <img
                      src={c.user.image}
                      className="w-9 h-9 rounded-full"
                      alt="user"
                    />
                  ) : (
                    <div className="w-9 h-9 bg-gray-300 rounded-full flex items-center justify-center text-white">
                      {c.user?.userName?.[0]?.toUpperCase() || "U"}
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-semibold">
                      {c.user?.userName || "User"}
                    </p>
                    <p className="text-sm text-gray-600">{c.text}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No comments yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Singlecart;
