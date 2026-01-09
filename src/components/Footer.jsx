
import React, { useState } from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert(`Subscribed with: ${email}`);
    setEmail("");
  };

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white mt-12">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Company Info */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-red-500">KHARIDAAR</h2>
            <p className="text-gray-300 leading-relaxed text-sm">
              Your trusted eCommerce destination for quality products at competitive prices. We deliver excellence with every order.
            </p>
            <div className="flex gap-3 pt-2">
              <a href="#" className="bg-blue-600 hover:bg-red-600 p-2 rounded-full transition-all duration-300 transform hover:scale-110">
                <FaFacebookF className="w-4 h-4" />
              </a>
              <a href="#" className="bg-blue-600 hover:bg-red-600 p-2 rounded-full transition-all duration-300 transform hover:scale-110">
                <FaTwitter className="w-4 h-4" />
              </a>
              <a href="#" className="bg-blue-600 hover:bg-red-600 p-2 rounded-full transition-all duration-300 transform hover:scale-110">
                <FaInstagram className="w-4 h-4" />
              </a>
              <a href="#" className="bg-blue-600 hover:bg-red-600 p-2 rounded-full transition-all duration-300 transform hover:scale-110">
                <FaLinkedinIn className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-red-500">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-red-500 hover:pl-2 transition-all duration-200">Home</a></li>
              <li><a href="#" className="text-gray-300 hover:text-red-500 hover:pl-2 transition-all duration-200">Shop</a></li>
              <li><a href="#" className="text-gray-300 hover:text-red-500 hover:pl-2 transition-all duration-200">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-red-500 hover:pl-2 transition-all duration-200">Contact</a></li>
              <li><a href="#" className="text-gray-300 hover:text-red-500 hover:pl-2 transition-all duration-200">Track Order</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-red-500">Customer Service</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-red-500 hover:pl-2 transition-all duration-200">Help & FAQ</a></li>
              <li><a href="#" className="text-gray-300 hover:text-red-500 hover:pl-2 transition-all duration-200">Shipping Info</a></li>
              <li><a href="#" className="text-gray-300 hover:text-red-500 hover:pl-2 transition-all duration-200">Returns & Exchange</a></li>
              <li><a href="#" className="text-gray-300 hover:text-red-500 hover:pl-2 transition-all duration-200">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-red-500 hover:pl-2 transition-all duration-200">Terms & Conditions</a></li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-red-500">Get In Touch</h3>
            <div className="space-y-3 mb-5">
              <div className="flex items-start gap-2 text-gray-300 text-sm">
                <FaMapMarkerAlt className="text-red-500 mt-1 flex-shrink-0" />
                <span>123 Shopping Street, Karachi, Pakistan</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300 text-sm">
                <FaPhone className="text-red-500 flex-shrink-0" />
                <span>+92 300 1234567</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300 text-sm">
                <FaEnvelope className="text-red-500 flex-shrink-0" />
                <span>support@kharidaar.com</span>
              </div>
            </div>
            
            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-3">Newsletter</h4>
              <div className="flex flex-col gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="p-2.5 rounded-lg text-black border-2 border-transparent focus:border-red-500 outline-none transition-all duration-300"
                />
                <button
                  onClick={handleSubscribe}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                >
                  Subscribe Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mt-10 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-sm text-gray-400">
                © {new Date().getFullYear()} <span className="text-red-500 font-semibold">KHARIDAAR</span>. All rights reserved.
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>We Accept:</span>
              <div className="flex gap-2">
                <div className="bg-white px-3 py-1 rounded text-blue-600 font-bold text-xs">VISA</div>
                <div className="bg-white px-3 py-1 rounded text-red-600 font-bold text-xs">MC</div>
                <div className="bg-white px-3 py-1 rounded text-blue-900 font-bold text-xs">AMEX</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;





















// import react from "react"

// const Footer = () => {
//   return (
//     <footer className="bg-black text-white text-sm mt-6">
//       <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">

//         {/* About */}
//         <div className="col-span-2 md:col-span-2">
//           <h2 className="text-lg font-semibold mb-3">About Us</h2>
//           <p className="leading-relaxed">
//             We are a leading eCommerce platform offering quality products at unbeatable prices.
//           </p>
//         </div>

//         {/* Quick Links */}
//         <div>
//           <h2 className="text-lg font-semibold mb-3">Quick Links</h2>
//           <ul className="space-y-2">
//             <li><a href="#" className="hover:underline">Home</a></li>
//             <li><a href="#" className="hover:underline">Shop</a></li>
//             <li><a href="#" className="hover:underline">Contact</a></li>
//             <li><a href="#" className="hover:underline">FAQ</a></li>
//           </ul>
//         </div>

//         {/* Categories */}
//         <div>
//           <h2 className="text-lg font-semibold mb-3">Categories</h2>
//           <ul className="space-y-2">
//             <li><a href="#" className="hover:underline">Men</a></li>
//             <li><a href="#" className="hover:underline">Women</a></li>
//             <li><a href="#" className="hover:underline">Electronics</a></li>
//             <li><a href="#" className="hover:underline">Accessories</a></li>
//           </ul>
//         </div>

//         {/* Newsletter */}
//         <div className="col-span-2 sm:col-span-1">
//           <h2 className="text-lg font-semibold mb-3">Subscribe</h2>
//           <p className="mb-3">Get the latest updates and offers.</p>
//           <form className="flex flex-col sm:flex-row gap-2">
//             <input
//               type="email"
//               placeholder="Your email"
//               className="p-2 rounded text-black flex-1"
//             />
//             <button
//               type="submit"
//               className="bg-white text-red-600 px-4 py-2 rounded font-semibold hover:bg-red-100 transition"
//             >
//               Subscribe
//             </button>
//           </form>
//         </div>
//       </div>

//       {/* Bottom Line */}
//       <div className="bg-red-700 text-center py-3 mt-4">
//         © {new Date().getFullYear()} KHARIDAAR. All rights reserved.
//       </div>
//     </footer>
//   );
// };

// export default Footer;


