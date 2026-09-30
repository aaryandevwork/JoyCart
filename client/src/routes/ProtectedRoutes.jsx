import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

const ProtectedRoutes = () => {

    const {isAuthenticated , isInitialized} = useSelector((store) => store.auth);

    if (!isInitialized) {
        return <div>Checking authentication...</div>;
    }

    if(!isAuthenticated){
        return <Navigate to={"/"} />;
    }

    return (
        <div>
            <Outlet />
        </div>
    )
}

export default ProtectedRoutes;