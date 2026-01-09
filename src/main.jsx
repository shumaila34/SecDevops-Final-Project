import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from './layout.jsx'
import './index.css';  // Yeh ensure karo
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import Singlecart from "./pages/Singlecart.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import SingleProduct from "./pages/SingleProduct.jsx";
import Profile from "./pages/Profile.jsx";
import Cart from "./pages/Cart.jsx";
import { store } from "./Config/redux/store/stgore.js";
import { Provider } from "react-redux";
import { Check } from "lucide-react";
import Checkout from "./pages/Checkout.jsx";
import OrderConfirmation from "./pages/OrderConfirmation.jsx";




const router = createBrowserRouter([
{
  path : '',
  element : <Layout />,
  children :[
    {
      path: '',
      element: <Home />
    },
    {
      path: 'login',
      element: <Login />
    },
    {
      path: 'register',
      element: <Register />
    },
    {
      path: 'profile',
      element: <Profile /> 
    },
  {
      path: 'dashboard',
      element: <Dashboard /> 
    },
    {
      path: 'singleProduct/:id',
      element: <SingleProduct /> 
    },
    {
      path: 'singlecart/:id',
      element: <Singlecart /> 
    },
    {
      path: 'cart',
      element: <Cart />
    },
    {
      path: 'checkout',
      element: <Checkout />
    },
    {
      path: 'order-confirmation',
      element: <OrderConfirmation />
    }

    
  ]
}

]
)

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
        <RouterProvider router={router}>
        </RouterProvider>
          </Provider>
)
