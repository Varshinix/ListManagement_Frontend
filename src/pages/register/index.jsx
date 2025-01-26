
import { useState } from "react";
import { Link } from 'react-router-dom';
import { uploads } from "../../services";
import React from 'react';
import styles from "./register.module.css";
import toast from "react-hot-toast";
import { register } from "../../services/index";
import logoCuv from "../../assets/logoCuv.png";

export default function Register() {
    const imageUrl_landing = uploads("landing_img.png")

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });

    const [formErrors, setFormErrors] = useState({});

    const [loading, setLoading] = useState(false);


    const handleRegister = async (e) => {
        e.preventDefault();

        const tempErrors = {
            name: !formData.name || formData.name.trim().length < 2 || !isNaN(formData.name.trim())
                ? "Name is required and cannot be numeric" : null,
            email: !formData.email || !formData.email.includes("@") || !formData.email.includes(".")
                ? "Email is invalid" : null,
            phone: !formData.phone || formData.phone.length !== 10
                ? "Phone number is invalid" : null,
            password: !formData.password || formData.password.length < 2
                ? "Password is required" : null,
            confirmPassword: !formData.confirmPassword || formData.confirmPassword !== formData.password
                ? "Passwords do not match" : null,
        };

        setFormErrors(tempErrors);

        if (Object.values(tempErrors).some((err) => err)) {
            return;
        }

        try {
            setLoading(true);
            const response = await register(formData);
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
                <form className={styles.form} onSubmit={handleRegister}>
                    <div className={styles.topRight}>
                        <span>SignUp</span>
                        <button className={styles.regLogin}>Login</button>
                    </div>
                    <header className={styles.header}>
                        <h2>Join us Today!</h2>
                    </header>
                    <input id="name" value={formData.name} type="text" placeholder="Name"
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                    {formErrors.name && <p className={styles.error}>{formErrors.name}</p>}

                    <input id="email" value={formData.email} type="text" placeholder="Email id"
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    {formErrors.email && <p className={styles.error}>{formErrors.email}</p>}

                    <input id="phone" value={formData.phone} type="text" placeholder="Mobile no."
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                    {formErrors.phone && <p className={styles.error}>{formErrors.phone}</p>}

                    <input id="password" value={formData.password} type="password" placeholder="Password" autoComplete="new-password"
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                    {formErrors.password && <p className={styles.error}>{formErrors.password}</p>}

                    <input id="confirmPassword" value={formData.confirmPassword} type="password" placeholder="Confirm Password" autoComplete="new-password"
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    />
                    {formErrors.confirmPassword && <p className={styles.error}>{formErrors.confirmPassword}</p>}

                    <button className={styles.signupBtn} disabled={loading} type="submit">
                        {loading ? "Loading.." : "Register"}
                    </button>
                    <p className={styles.loginLink}>
                        Already have an account?{" "}
                        <Link to="/login" style={{ color: 'blue', textDecoration: 'none'}}> Login </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}