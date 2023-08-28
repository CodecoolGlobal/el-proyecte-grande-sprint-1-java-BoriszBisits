import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

import Hello from "./Hello";

const router = createBrowserRouter([
    {
        path: "/",

        children: [

            {
                path: "/hello",
                element: <Hello />,
            },

        ],
    },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
reportWebVitals();