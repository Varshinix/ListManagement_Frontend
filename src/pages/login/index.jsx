
import { useState } from "react";
import { Link } from 'react-router-dom';
import { uploads } from "../../services";
import React from 'react';
import styles from "./login.module.css";
import toast from "react-hot-toast";
import { login } from "../../services/index";
import logoCuv from "../../assets/logoCuv.png";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const imageUrl_landing = uploads("landing_img.png")

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();
    
    const [formErrors, setFormErrors] = useState({});
    const [loading, setLoading] = useState(false);


    const handleRegister = async (e) => {
        e.preventDefault();

        const tempErrors = {
            email: !formData.email || !formData.email.includes("@") || !formData.email.includes(".")
                ? "Email is invalid" : null,
            password: !formData.password || formData.password.length < 2
                ? "Password is required" : null,
        };

        setFormErrors(tempErrors);

        if (Object.values(tempErrors).some((err) => err)) {
            return;
        }

        try {
            setLoading(true);
            const response = await login(formData);
            console.log("User registered successfully:", response);
            toast.success(response.message);
        } catch (error) {
            toast.error(error.message || "Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };



    {/*const imageUrl = uploads("login_image.png"); */ }

    return (
        <div className={styles.registerContainer}>
            <div className={styles.registerLeft}>
                <img className={styles.registerImg} src={imageUrl_landing} alt="landing img" />
                <div className={styles.registerLogo}>
                    <img src={logoCuv} alt="logo" />
                </div>
            </div>
            <div className={styles.registerRight} >
                <div className={styles.topRight}>
                    <span>SignUp</span>
                    <button
                        className={styles.regLogin}
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </button>
                </div>
                <form className={styles.form} onSubmit={handleRegister}>

                    <header className={styles.header}>
                        <h2>Login</h2>
                    </header>

                    <input id="email" value={formData.email} type="text" placeholder="Email id"
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    {formErrors.email && <p className={styles.error}>{formErrors.email}</p>}

                    <input id="password" value={formData.password} type="password" placeholder="Password" autoComplete="new-password"
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                    {formErrors.password && <p className={styles.error}>{formErrors.password}</p>}

                    <button className={styles.signupBtn} disabled={loading} type="submit" onClick={() => navigate("/home")}>
                        {loading ? "Loading.." : "Register"}
                    </button>
                    <p className={styles.loginLink}>
                        Already have an account?{" "}
                        <Link to="/" style={{ color: 'blue', textDecoration: 'none' }} onClick={() => navigate("/")}>
                             SignUp 
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}