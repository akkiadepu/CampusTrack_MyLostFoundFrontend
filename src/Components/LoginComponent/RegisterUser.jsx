
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from 'react-router-dom';
import { registerNewUser } from "../../Services/LoginService";

const RegisterUser = () => {

    const [lostFoundUser, setLostFoundUser] = useState({
        username: "",
        password: "",
        personalName: "",
        email: "",
        role: "",
    });

    const [confirmPassword, setConfirmPassword] = useState("");
    let navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    const createNewUser = (event) => {
        event.preventDefault();
        if (lostFoundUser.password === confirmPassword) {
            registerNewUser(lostFoundUser).then((response) => {
                alert("User is registered successfully...Go For Login");
                navigate('/');
            });
        }
    };

    const onChangeHandler = (event) => {
        event.persist();
        const name = event.target.name;
        const value = event.target.value;
        setLostFoundUser(values => ({ ...values, [name]: value }));
    };


    const handleValidation = (event) => {
        event.preventDefault();
        let tempErrors = {};
        let isValid = true;

        if (!lostFoundUser.username.trim()) {
            tempErrors.username = "User Name is required";
            isValid = false;
        }

        if (!lostFoundUser.password.trim()) {
            tempErrors.password = "Password is required";
            isValid = false;
        }
        else if (lostFoundUser.password.length < 5 || lostFoundUser.passwordlength > 10) {
            tempErrors.password = "Password must be 5-10 characters long";
            isValid = false;
        }
        else if (lostFoundUser.password !== confirmPassword) {
            tempErrors.password = "Both the passwords are not matched";
            isValid = false;
        }

        if (!lostFoundUser.personalName.trim()) {
            tempErrors.personalName = "Personal Name is required";
            isValid = false;
        }
        if (!lostFoundUser.email.trim()) {
            tempErrors.email = "Email is required";
            isValid = false;
        }
        else if (!emailPattern.test(lostFoundUser.email)) {
            tempErrors.email = "Invalid Email Format";
            isValid = false;
        }
        if (!lostFoundUser.role.trim()) {
            tempErrors.role = "Role is required";
            isValid = false;
        }
        if (!confirmPassword.trim()) {
            tempErrors.confirmPassword = "Confirm Password is required";
            isValid = false;
        }

        setErrors(tempErrors);
        if (isValid) {
            createNewUser(event);
        }
    };

    return (
        <div
            className="w-100 h-100 d-flex justify-content-center align-items-center"
            style={{
                minHeight: "100vh",
                minWidth: "99vw",
                background: "linear-gradient(to right, #fdeff3, #e9f8d8)",
            }}
        >

            <div className="container">
                <div className="row justify-content-center align-items-center">

                    {/* Left Form Section */}
                    <div className="col-12 col-md-5 mb-4">
                        <div className="card p-4 shadow-lg" style={{ borderRadius: "12px" }}>
                            <h4 className="text-center mb-3 fw-bold">Register</h4>

                            <form>
                                <div className="mb-2">
                                    <label className="form-label">User Name</label>
                                    <input placeholder="username" name="username" className="form-control" value={lostFoundUser.username} onChange={(event) => onChangeHandler(event)} />
                                    {errors.username && <p style={{ color: "red" }}>{errors.username}</p>}
                                </div>


                                <div className="mb-2">
                                    <label className="form-label">Password</label>
                                    <input type="password" name="password" className="form-control" value={lostFoundUser.password} onChange={(event) => onChangeHandler(event)} />
                                    {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}

                                </div>

                                <div className="mb-2">
                                    <label>Retype your Password: </label>
                                    <input type="password" name="confirmPassword" className="form-control" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} />
                                    {errors.confirmPassword && <p style={{ color: "red" }}>{errors.confirmPassword}</p>}
                                </div>

                                <div className="mb-2">
                                    <label>User's Personal Name: </label>
                                    <input placeholder="personal name" name="personalName" className="form-control" value={lostFoundUser.personalName} onChange={(event) => onChangeHandler(event)} />
                                    {errors.personalName && <p style={{ color: "red" }}>{errors.personalName}</p>}
                                </div>

                                <div className="mb-2">
                                    <label>User Email: </label>
                                    <input placeholder="email" name="email" className="form-control" value={lostFoundUser.email} onChange={(event) => onChangeHandler(event)} />
                                    {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
                                </div>

                                <div className="form-group">
                                    <label>Select Role : </label>
                                    <input list="types" name="role" className="form-control" value={lostFoundUser.role} onChange={(event) => onChangeHandler(event)} />
                                    <datalist id="types">
                                        <option value="Student" />
                                        <option value="Admin" />
                                    </datalist>
                                    {errors.role && <p style={{ color: "red" }}>{errors.role}</p>}
                                </div>


                                <div className="mb-3">

                                </div>

                                <button className="btn btn-dark w-100" onClick={handleValidation}>Submit</button>

                                <p className="mt-2 text-center">
                                    Already have an account? <a href="/">login in</a>
                                </p>
                            </form>
                        </div>
                    </div>

                    {/* Right Side Image Section */}
                    <div className="col-12 col-md-6">
                        <div className="position-relative shadow-lg"
                            style={{ borderRadius: "15px", overflow: "hidden" }}>

                            <img
                                src="https://images.unsplash.com/photo-1555421689-491a97ff2040"
                                className="img-fluid"
                                alt="register"
                                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            />

                            <div
                                className="position-absolute top-50 start-50 translate-middle text-white p-4"
                                style={{
                                    background: "rgba(0,0,0,0.5)",
                                    borderRadius: "12px",
                                    width: "80%",
                                }}
                            >
                                <h4 className="text-center fw-bold">Welcome to Our Lost & Found Website!</h4>
                                <p className="mt-2" style={{ fontSize: "14px" }}>
                                    We’re excited to help you find and recover lost items.
                                    Easily report lost belongings, search for found items,
                                    and connect with others.
                                </p>
                                <p className="text-center fst-italic mt-2">Happy searching and best of luck!</p>
                            </div>

                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default RegisterUser