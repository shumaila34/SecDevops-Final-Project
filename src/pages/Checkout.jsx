import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { clearCart } from "../Config/redux/reducers/cartSlice";
import Swal from "sweetalert2";

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    address: "",
    phone: "",
  });

  const handlePayment = () => {
    if (!shippingInfo.name || !shippingInfo.address || !shippingInfo.phone) {
      Swal.fire("Missing Info", "Please fill all shipping details.", "warning");
      return;
    }

    Swal.fire({
      icon: "success",
      title: "Order Placed! ✅",
      text: `Your order of Rs ${totalPrice} will be delivered via COD.`,
      timer: 2000,
      showConfirmButton: false,
    }).then(() => {
      dispatch(clearCart());
      navigate("/order-confirmation", {
        state: { shippingInfo, cartItems, totalPrice },
      });
    });
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-xl mx-auto mt-10 p-6 text-center bg-white shadow rounded">
        <h2 className="text-2xl font-bold">Your Cart is Empty 😢</h2>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow space-y-6">
      <h2 className="text-3xl font-bold text-center text-green-600">Checkout 🏷️</h2>

      {/* Shipping Info */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Shipping Info</h3>
        <input
          type="text"
          placeholder="Name"
          className="w-full border p-3 rounded focus:ring-2 focus:ring-blue-400 outline-none"
          value={shippingInfo.name}
          onChange={(e) => setShippingInfo({ ...shippingInfo, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Address"
          className="w-full border p-3 rounded focus:ring-2 focus:ring-blue-400 outline-none"
          value={shippingInfo.address}
          onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
        />
        <input
          type="text"
          placeholder="Phone"
          className="w-full border p-3 rounded focus:ring-2 focus:ring-blue-400 outline-none"
          value={shippingInfo.phone}
          onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
        />
      </div>

      {/* Order Summary */}
      <div className="space-y-3">
        <h3 className="text-xl font-semibold">Order Summary</h3>
        {cartItems.map((item) => (
          <div key={item._id || item.id} className="flex justify-between">
            <span>{item.name || item.title} x {item.quantity}</span>
            <span>Rs {item.price * (item.quantity || 1)}</span>
          </div>
        ))}
        <p className="font-bold mt-2 text-lg">Total: Rs {totalPrice}</p>
      </div>

      <button
        onClick={handlePayment}
        className="w-full bg-green-600 text-white py-3 rounded-lg text-lg hover:bg-green-700 transition"
      >
        💵 Place Order (COD)
      </button>
    </div>
  );
};

export default Checkout;
