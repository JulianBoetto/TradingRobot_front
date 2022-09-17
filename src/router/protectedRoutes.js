
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
    const isAuth = sessionStorage.getItem("ACCESS_TOKEN") !== null;

    return (
        isAuth
            ?
            <Outlet />
            :
            <Navigate to={"/"} />
    )
}

export default ProtectedRoutes;