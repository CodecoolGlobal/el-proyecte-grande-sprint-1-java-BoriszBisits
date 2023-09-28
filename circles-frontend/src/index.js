import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ProjectList from "./Pages/ProjectList";
import Project from './Pages/Project';
import Task from "./Pages/Task";
import SubTask from "./Pages/SubTask";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from './Pages/Login';
import Registration from './Pages/Registration';
import { ThemeProvider, createTheme } from '@mui/material/styles';


const router = createBrowserRouter([
    {
        path: "/",
        // element: <Layout />,
        // errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Login />,
            },
            {
                path: "/registration",
                element: <Registration />,
            },
            {
                path: "/project-list",
                element: <ProjectList />,
            },
            {
                path: "/projects",
                element: <ProjectList />,
            },

            {
                path: "/project/:id",
                element: <Project />,
            },
            {
                path: "/project/:id/task/:taskId",
                element: <Task />,
            },
            {
                path: "/project/:id/task/:taskId/subtask/:subTaskId",
                element: <SubTask />,
            },
        ]
    }
]);

const theme = createTheme();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <RouterProvider router={router}/>
        </ThemeProvider>
    </React.StrictMode>

);