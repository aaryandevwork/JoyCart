import { Outlet } from "react-router";

const ProtectedRoutes = () => {
    return (
        <div>
            ProtectedRoutes 
            <Outlet />
        </div>
    )
}

export default ProtectedRoutes;