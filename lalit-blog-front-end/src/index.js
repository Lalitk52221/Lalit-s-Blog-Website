import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Components/Pages/Login";
import Writing from "./Components/UI/Writing";
import ProtectedRoute from "./Components/UI/ProtectedRoute";
import Signup from "./Components/Pages/Signup";
import AllBlog from "./Components/UI/AllBlog";
import { Provider } from "react-redux";
import { Store } from "./Components/Redux/Store";
const createRoutes = createBrowserRouter([
  {
    path: "/",
    element:(
      <Provider store={Store}>
      <App />,
      </Provider>
    ) ,
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <AllBlog />,
          </ProtectedRoute>
        ),
        // element:<Home/>
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/write-blog",
        element: (
          <ProtectedRoute>
            <Writing />,
          </ProtectedRoute>
        ),
      },
      {
        path: "/myblog",
        element: (
          <ProtectedRoute>
            <AllBlog/>
          </ProtectedRoute>
        ),
      },
      {
        path: "*",
        element: (
          <div>
            {" "}
            <h1> Page not Found</h1>
          </div>
        ),
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={createRoutes}></RouterProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
