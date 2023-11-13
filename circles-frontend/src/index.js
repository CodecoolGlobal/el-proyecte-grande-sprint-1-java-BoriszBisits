import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import MainPage from "./Pages/MainPage";
import Project from './Pages/Project';
import Task from "./Pages/Task";
import SubTask from "./Pages/SubTask";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from './Pages/Login';
import Profile from './Pages/Profile';
import NotesListOfProfile from './Pages/NotesListOfProfile';
import Registration from './Pages/Registration';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const router = createBrowserRouter([
    {
        path: "/",
        children: [
            {
                path: "/profile",
                element: <Profile />,
            },
            {
                path: "/messages",
                element: <NotesListOfProfile />,
            },
            {
                path: "/",
                element: <Login />,
            },
            {
                path: "/registration",
                element: <Registration />,
            },
            {
                path: "/profile",
                element: <Profile />,
            },
            {
                path: "/mainpage",
                element: <MainPage />,
            },
            {
                path: "/maingpage",
                element: <MainPage />,
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
