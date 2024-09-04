import { createBrowserRouter } from 'react-router-dom';
import App from './../App';
import Home from './../pages/Home';
import Login from './../pages/Login';
import ForgotPassword from './../pages/ForgotPassword';
import Signup from './../pages/SignUp';
import AdminPanel from './../pages/AdminPanel';
import AllUsers from './../pages/AllUsers';
import Product from '../pages/AllProduct';
import ChangeUserRole from './../components/ChangeUserRole';
import CatagoryProduct from '../components/catagoryProduct';
import ProductPage from './../pages/ProductPage';
import Cart from './../pages/cart';
import SearchPage from './../pages/searchProductPage';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'forgot-password',
        element: <ForgotPassword />,
      },
      {
        path: 'register',
        element: <Signup />,
      },
      {
        path:'product-catagory/:catagory',
        element: <CatagoryProduct />,
      },
      {
        path:'product/:id',
        element: <ProductPage />,
      },
      {
        path: 'cart',
        element: <Cart />,
      },
      {
        path:'search',
        element: <SearchPage />,
      },
      {
        path: 'admin-panel',
        element: <AdminPanel />,
        children: [
          {
            path: 'all-users',
            element: <AllUsers />,
          },
          {
            path: 'product',
            element: <Product />,
          }
        ],
      },
    ],
  },
]);

export default router;
