import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './components/layouts/Layout';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import Product from './pages/Product';
import Cart from './pages/Cart';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SignUp from './pages/auth/SignUp';
import Login from './pages/auth/Login';
import AdminDashboard from './pages/admin/AdminDashboard';
import ProtectedRoutes from './components/commons/ProtectedRoutes';
import Users from './pages/admin/Users';
import EditUserForm from './pages/admin/EditUserForm';
import AdminProducts from './pages/admin/AdminProducts';
import AddProductForm from './pages/admin/AddProductForm';
import EditProductForm from './pages/admin/EditProductForm';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import OrderFailure from './pages/OrderFailure';
import OrderLists from './pages/admin/OrderLists';
import EditOrderStatus from './pages/admin/EditOrderStatus';


function App() {
  const routes = createBrowserRouter([{
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Index />
      },
      {
        path: 'product/:slug',
        element: <Product />
      },
      {
        path: 'cart',
        element: <Cart />
      },
      {
        path: 'signUp',
        element: <SignUp />
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'checkout',
        element: <ProtectedRoutes><Checkout /></ProtectedRoutes>
      },
      {
        path: 'orderSuccess',
        element: <ProtectedRoutes><OrderSuccess /></ProtectedRoutes>
      },
      {
        path: 'orderFailure',
        element: <ProtectedRoutes><OrderFailure /></ProtectedRoutes>
      },
      {
        path: 'admin',
        element: <ProtectedRoutes><AdminDashboard /></ProtectedRoutes>,
        children: [
          {
            path: 'users',
            element: <ProtectedRoutes><Users /></ProtectedRoutes>
          },
          {
            path: 'editUsrForm/:id',
            element: <ProtectedRoutes><EditUserForm /></ProtectedRoutes>
          },
          {
            path: 'products',
            element: <ProtectedRoutes><AdminProducts /></ProtectedRoutes>
          },
          {
            path: 'addNewProduct',
            element: <ProtectedRoutes><AddProductForm /></ProtectedRoutes>
          },
          {
            path: 'editProductForm/:slug',
            element: <ProtectedRoutes><EditProductForm /></ProtectedRoutes>
          },
          {
            path: 'orders',
            element: <ProtectedRoutes><OrderLists /></ProtectedRoutes>
          },
          {
            path: 'orders/editOrderStatus/:order_id',
            element: <ProtectedRoutes><EditOrderStatus /></ProtectedRoutes>
          },
        ]
      },
      {
        path: '*',
        element: <NotFound />
      },
    ]
  }]);
  return (
    <>
      <ToastContainer />
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
