import {createBrowserRouter, RouterProvider} from "react-router"
import Login from "../pages/Login";
import Register from "../pages/Register";
import PublicRoutes from "./PublicRoutes";
import AuthLayout from "../layout/AuthLayout";
import ProtectedRoutes from "./ProtectedRoutes";
import MainLayout from "../layout/MainLayout";
import HomePage from "../pages/HomePage";

const AppRoutes = () => {

    const router = createBrowserRouter([
        {
            path : "/",
            element : <PublicRoutes />,
            children : [
                {
                    path : "",
                    element : <AuthLayout />,
                    children : [
                        {
                            path : "",
                            element : <Login />
                        },
                        {
                            path : "register",
                            element : <Register />
                        }
                    ]
                }
            ]
        },
        {
            path : "/main",
            element : <ProtectedRoutes />,
            children : [
                {
                    path : "",
                    element : <MainLayout />,
                    children : [
                        {
                            path : "",
                            element : <HomePage />
                        }
                    ]
                }
            ]
        }
    ])

    return <RouterProvider router={router} />
}

export default AppRoutes;