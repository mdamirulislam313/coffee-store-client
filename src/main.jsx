import { Children, Component, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayOuts from "./LayOuts/MainLayOuts.jsx";
import Home from "./Components/Home.jsx";
import AddCoffee from "./Components/AddCoffee.jsx";
import UpdateCoffee from "./Components/UpdateCoffee.jsx";
import CoffeeDetails from "./Components/CoffeeDetails.jsx";
import Signin from "./Components/Signin.jsx";
import SignUp from "./Components/SignUp.jsx";
import AuthProvider from "./Context/AuthProvider.jsx";
import Users from "./Components/Users.jsx";
const BASE_URL = "https://v1-coffee-store-server-gamma.vercel.app";
const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayOuts,
    children: [
      {
        index: true,
        loader: () => fetch("https://v1-coffee-store-server-gamma.vercel.app/coffees"),
        Component: Home,
      },
      {
        path: "addCoffee",
        Component: AddCoffee,
      },
      {
        path: "coffee/:id",
        loader: ({ params }) =>
          fetch(`https://v1-coffee-store-server-gamma.vercel.app/coffees/${params.id}`),
        Component: CoffeeDetails,
      },
      {
        path: "updateCoffee/:id",
        loader: ({ params }) =>
          fetch(`https://v1-coffee-store-server-gamma.vercel.app/coffees/${params.id}`),
        Component: UpdateCoffee,
      },
      {
        path: "signin",
        Component: Signin,
      },
      {
        path: "signUp",
        Component: SignUp,
      },
      {
        path: 'users',
        loader: ()=> fetch('https://v1-coffee-store-server-gamma.vercel.app/users'),
        Component: Users
      }
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
