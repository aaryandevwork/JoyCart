import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

const PublicRoutes = () => {
    const {isAuthenticated} = useSelector((store) => store.auth);

    if(isAuthenticated){
        return <Navigate to={"/main"} />;
    }

    return (
        <div>
            <Outlet />
        </div>
    )
}

export default PublicRoutes;