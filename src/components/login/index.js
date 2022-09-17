import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../services/auth';
import { Spin } from 'antd';

const LoginForm = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        // setLoading(true);
        const isAuth = await auth(email, password);
        if(isAuth) {
            navigate("/dashboard");
            console.log("/dashboard")
        }
    };

    return (
        <>
            {loading ? (
                <Spin />
            ) : (
                <form className="form-signin" onSubmit={onSubmit}>
                    <div className="col d-flex justify-content-center">
                        <img className="mb-4" src="/logo.png" alt="Logo Trading Robot" style={{ width: "72px", height: "72px" }} />
                    </div>
                    <input
                        type="email"
                        id="inputEmail"
                        className="form-control mb-4"
                        placeholder="Email address"
                        required=""
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        id="inputPassword"
                        className="form-control mb-4"
                        placeholder="Password"
                        required=""
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="checkbox mb-3">
                    </div>
                    <div className="col d-flex justify-content-center">
                        <button
                            className="btn btn-lg btn-success btn-block mb-4"
                            type="submit"
                        >
                            Sign in
                        </button>
                    </div>
                </form>
            )}
        </>
    )
}

export default LoginForm;