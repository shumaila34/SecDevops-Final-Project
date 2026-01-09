import { useLocation, useNavigate } from "react-router-dom";

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { shippingInfo, cartItems, totalPrice } = location.state || {};

  if (!shippingInfo) {
    // If user refreshes, redirect home
    navigate("/");
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md">
        <h1 className="text-3xl font-bold text-green-600 mb-4">✅ Order Placed!</h1>
        <p className="text-gray-700 mb-4">
          Thank you for your order. Your items will be delivered via <strong>Cash on Delivery</strong>.
        </p>

        <div className="text-left mb-4">
          <h2 className="font-semibold mb-1">Shipping Info:</h2>
          <p>Name: {shippingInfo.name}</p>
          <p>Address: {shippingInfo.address}</p>
          <p>Phone: {shippingInfo.phone}</p>
        </div>

        <div className="text-left mb-4">
          <h2 className="font-semibold mb-1">Order Summary:</h2>
          {cartItems.map((item) => (
            <p key={item._id || item.id}>
              {item.name || item.title} x {item.quantity} → Rs {item.price * item.quantity}
            </p>
          ))}
          <p className="font-bold mt-2">Total: Rs {totalPrice}</p>
        </div>

        <button
          onClick={() => navigate("/")}
          className="mt-6 bg-black text-white px-6 py-2 rounded-lg"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmation;
