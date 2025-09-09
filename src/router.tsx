import { lazy } from "react";
import { createBrowserRouter } from "react-router";
import Wrapper from "./libs/ui/layouts/Wrapper";

const Home = lazy(() => import("./pages/Home/Home"));
const Login = lazy(() => import("./pages/SignIn/SignIn"));
const Register = lazy(() => import("./pages/SignUp/SignUp"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Wrapper />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/registration",
        element: <Register />,
      },
    ],
  },
]);
