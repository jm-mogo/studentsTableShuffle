import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import Login from "./Login.jsx";
import "./index.css";
import "./studentList/studentList.css";
import Register from "./Register.jsx";
import { AuthProvider } from "./context/authContext.jsx";
import ProtectedRoute from "./PotectedRoute.jsx";

const router = createBrowserRouter(
    [
        {
            element: <ProtectedRoute />,
            children: [
                {
                    path: "/",
                    element: <App />,
                },
            ],
        },
        {
            path: "/login",
            element: <Login />,
        },
        {
            path: "/register",
            element: <Register />,
        },
    ],
    {
        // basename: "/studentsTableShuffle",
    }
);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    </React.StrictMode>
);
