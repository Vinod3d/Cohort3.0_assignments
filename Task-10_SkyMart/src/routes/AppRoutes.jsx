import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "../pages/Home";
import About from "../pages/About";
import Products from "../pages/Products";
import ProductDetail from "../pages/ProductDetail";
import MainLayout from "../layout/MainLayout";
import AuthLayout from "../layout/AuthLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  let route = createBrowserRouter([
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          element: <MainLayout />,
          children: [
            {
              index: true,
              element: <Home />,
            },
            {
              path: "products",
              element: <Products />,
            },
            {
              path: "products/:id",
              element: <ProductDetail />,
            },
            {
              path: "about",
              element: <About />,
            },

          ],
        },
      ],
    },
    {
      path: "/auth",
      element: <AuthLayout />,
      children: [
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },
      ],
    },
  ]);
  return <RouterProvider router={route} />;
};

export default AppRoutes;
