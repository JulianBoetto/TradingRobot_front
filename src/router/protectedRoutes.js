import { Navigate, Outlet, Route } from "react-router-dom";
import Login from "../pages/public/auth/login/index";
import { verify } from "../services/auth"

const ProtectedRoutes = (props) => {
    const isAuth = verify();
    return (
        isAuth
            ?
            <Outlet />
            :
            <Navigate to={"/"} />
    )
}

export default ProtectedRoutes;