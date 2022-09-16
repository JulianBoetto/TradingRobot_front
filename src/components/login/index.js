import React, { useState, useContext } from 'react';
import { auth } from '../../services/auth';

const LoginForm = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        auth(email, password);
    };

    return (
        <>
            <div>
            </div>
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
                    {/* <label>
                        <input type="checkbox" value="remember-me" /> Remember me
                    </label> */}
                </div>
                <div className="col d-flex justify-content-center">
                    <button
                        className="btn btn-lg btn-success btn-block mb-4"
                        type="submit"
                    // onClick={() => navigate("/dashboard")}
                    >
                        Sign in
                    </button>
                </div>
            </form>
            {/* <form>
                

                <div className="form-outline mb-4">
                    <input type="password" id="form2Example2" className="form-control" />
                    <label className="form-label" for="form2Example2">Password</label>
                </div>

                <div className="row mb-4">
                    <div className="col d-flex justify-content-center">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="form2Example31" checked />
                            <label className="form-check-label" for="form2Example31"> Remember me </label>
                        </div>
                    </div>

                    <div className="col">
                        <a href="#!">Forgot password?</a>
                    </div>
                </div>

                <button type="button" className="btn btn-primary btn-block mb-4">Sign in</button>

                <div className="text-center">
                    <p>Not a member? <a href="#!">Register</a></p>
                    <p>or sign up with:</p>
                    <button type="button" className="btn btn-link btn-floating mx-1">
                        <i className="fab fa-facebook-f"></i>
                    </button>

                    <button type="button" className="btn btn-link btn-floating mx-1">
                        <i className="fab fa-google"></i>
                    </button>

                    <button type="button" className="btn btn-link btn-floating mx-1">
                        <i className="fab fa-twitter"></i>
                    </button>

                    <button type="button" className="btn btn-link btn-floating mx-1">
                        <i className="fab fa-github"></i>
                    </button>
                </div>
            </form> */}
        </>
    )
}

export default LoginForm;