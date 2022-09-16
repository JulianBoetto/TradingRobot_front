import { Navigate, Outlet, Route } from "react-router-dom";
import Login from "../pages/public/auth/login/index";
import auth from "../services/auth";

const ProtectedRoutes = (props) => {
    console.log(props, "ok")
    const isAuth = { token: false};
    return (
        isAuth.token
            ?
            <Outlet />
            :
            <Navigate to={"/"} />
    )
}

export default ProtectedRoutes;