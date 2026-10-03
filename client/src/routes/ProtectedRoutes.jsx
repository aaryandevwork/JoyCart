import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";
import FullScreenLoader from "../components/fullScreenLoader";

const ProtectedRoutes = () => {

    const {isAuthenticated , isInitialized, isLoading} = useSelector((store) => store.auth);

    // if (!isInitialized) {
    //     return <div>Checking authentication...</div>;
    // }

    if(isLoading){
        return <FullScreenLoader text="Loading.." />
    }

    if(!isAuthenticated){
        return <Navigate to={"/"} replace />;
    }

    return (
        <div>
            <Outlet />
        </div>
    )
}

export default ProtectedRoutes;