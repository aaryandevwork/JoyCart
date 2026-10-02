import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

const ProtectedRoutes = () => {

    const {isAuthenticated , isInitialized, isLoading} = useSelector((store) => store.auth);

    // if (!isInitialized) {
    //     return <div>Checking authentication...</div>;
    // }

    if(isLoading){
        return <h1 className="text-4xl">User Loading ...</h1>
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