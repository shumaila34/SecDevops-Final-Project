import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../Config/redux/reducers/cartSlice";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-4xl font-extrabold mb-8 text-center text-gradient bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-bounce">
        🛒 Your Shopping Cart
      </h2>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500 text-lg mt-10 italic">
          Your cart is empty 😢
        </p>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {cartItems.map((item) => (
            <motion.div
              key={item._id}
              whileHover={{ scale: 1.02 }}
              className="flex flex-col md:flex-row justify-between items-center p-5 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-100"
            >
              {/* Product Image */}
              <img
                src={item.postImage || item.image}
                alt={item.name || item.title}
                className="w-40 h-40 object-cover rounded-xl shadow-sm"
              />

              {/* Product Details */}
              <div className="flex-1 md:ml-6 mt-4 md:mt-0 space-y-2 text-center md:text-left">
                <h3 className="text-2xl font-bold text-gray-800">{item.name || item.title}</h3>
                <p className="text-gray-600 text-lg">Rs {item.price}</p>

                {/* Quantity Controls */}
                <div className="flex items-center justify-center md:justify-start gap-3 mt-2">
                  <button
                    onClick={() =>
                      dispatch(updateQuantity({ id: item._id, quantity: item.quantity - 1 }))
                    }
                    disabled={item.quantity <= 1}
                    className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                  >
                    -
                  </button>
                  <span className="font-semibold text-lg">{item.quantity}</span>
                  <button
                    onClick={() =>
                      dispatch(updateQuantity({ id: item._id, quantity: item.quantity + 1 }))
                    }
                    className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Remove Button */}
              <button
                onClick={() => dispatch(removeFromCart(item._id))}
                className="mt-4 md:mt-0 bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition transform hover:scale-105"
              >
                Remove
              </button>
            </motion.div>
          ))}

          {/* Total & Checkout */}
          <div className="mt-8 flex flex-col md:flex-row justify-between items-center bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl shadow-xl border border-gray-100">
            <h3 className="text-3xl font-extrabold text-gray-800">
              Total: <span className="text-blue-600">Rs {totalPrice}</span>
            </h3>
            <button
              onClick={() => navigate("/checkout")}
              className="mt-4 md:mt-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-8 py-3 rounded-xl font-semibold text-lg hover:scale-105 transition-transform shadow-lg"
            >
              Proceed to Checkout
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Cart;
