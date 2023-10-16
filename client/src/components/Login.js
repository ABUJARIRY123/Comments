import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginMessage, setLoginMessage] = useState("");
    const [validationError, setValidationError] = useState("");

    const handleLogin = async (event) => {
        event.preventDefault();

        // Client-side form validation
        if (!email || !password) {
            setValidationError("Please fill in all required fields.");
            return;
        }

        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                setLoginMessage("Login successful. Redirecting...");
                // Redirect to the user's dashboard or protected page
            } else {
                setLoginMessage("Login failed. Please check your email and password.");
            }
        } catch (error) {
            console.error("An error occurred during login:", error);
            setLoginMessage("An error occurred during login.");
        }
    };

    return (
        <section className="vh-100 gradient-custom">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card bg-dark text-white" style={{ borderRadius: "1rem" }}>
                            <div className="card-body p-5 text-center">
                                <div className="mb-md5 mt-md-4 pb-5">
                                    <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                                    <p className="text-white-50 mb-5">Please enter your email and password!</p>
                                    <div className="form-outline form-white mb-4">
                                        <input
                                            type="email"
                                            id="typeEmailX"
                                            className="form-control form-control-lg"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                        <label className="form-label" htmlFor="typeEmailX">Email</label>
                                    </div>
                                    <div className="form-outline form-white mb-4">
                                        <input
                                            type="password"
                                            id="typePasswordX"
                                            className="form-control form-control-lg"
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <label className="form-label" htmlFor="typePasswordX">Password</label>
                                    </div>
                                    {validationError && <p className="text-danger">{validationError}</p>}
                                    <p className="small mb-5 pb-lg-2">
                                        <Link to="/reset-password" className="text-white-50">Forgot password?</Link>
                                    </p>
                                    <button className="btn btn-outline-light btn-lg px-5" type="button" onClick={handleLogin}>
                                        Login
                                    </button>
                                    <p>{loginMessage}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
