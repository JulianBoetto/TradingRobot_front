import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Input, Spin } from 'antd';
import Auth from "../../repositories/auth";
import jwtController from '../../utils/jwt';


const LoginForm = () => {
    let navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        const login = await Auth.signInWithEmailAndPassword({ email, password });
        console.log(login)
        // jwtController.compare(login.access_token)
    };

    return (
        <>
            <form className="form-signin" onSubmit={onSubmit}>
                <img className="mb-4" src="/logo.png" alt="Logo Trading Robot" style={{ width: "72px", height: "72px" }} />
                <input
                    type="email"
                    id="inputEmail"
                    className="form-control"
                    placeholder="Email address"
                    required=""
                // onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="inputPassword" className="sr-only"></label>
                <input
                    type="password"
                    id="inputPassword"
                    className="form-control"
                    placeholder="Password"
                    required=""
                //    onChange={(e) => setPassword(e.target.value)}
                />
                <div className="checkbox mb-3">
                    {/* <label>
                        <input type="checkbox" value="remember-me" /> Remember me
                    </label> */}
                </div>
                <button
                    className="btn btn-lg btn-primary btn-block"
                    type="submit"
                    onClick={() => navigate("/dashboard")}
                >
                    Sign in
                </button>
            </form>
        </>
    )
}

export default LoginForm;