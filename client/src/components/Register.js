import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [registrationMessage, setRegistrationMessage] = useState("");
    const [validationError, setValidationError] = useState("");

    const handleRegistration = async (event) => {
        event.preventDefault();

        // Client-side form validation
        if (!username || !email || !password) {
            setValidationError("Please fill in all required fields.");
            return;
        }

        try {
            const response = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, email, password }),
            });

            if (response.ok) {
                setRegistrationMessage("Registration successful. You can now log in.");
            } else {
                setRegistrationMessage("Registration failed. Please try again.");
            }
        } catch (error) {
            console.error("An error occurred during registration:", error);
            setRegistrationMessage("An error occurred during registration.");
        }
    };

    return (
        <main className="register">
            <h1 className="registerTitle">Create an account</h1>
            <form className="registerForm">
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    name="username"
                    id="username"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label htmlFor="email">Email Address</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {validationError && <p className="text-danger">{validationError}</p>}
                <button className="registerBtn" type="submit" onClick={handleRegistration}>
                    REGISTER
                </button>
                <p>{registrationMessage}</p>
            </form>
        </main>
    );
};

export default Register;
