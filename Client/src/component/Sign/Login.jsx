import React, { useState } from 'react'
import './Loginstyle.css'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { app } from '../../../firebase';
const auth = getAuth(app);

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(email)
        console.log(password)
        if (password.length < 6) {
            toast.error("password minimum length: 6");
        }
        else {
            await signInWithEmailAndPassword(auth, email, password)
                .then(() => {
                    toast.success("Login Successfuly")

                })
                .then(() => {
                    console.log(".then2")
                })
                .then(() => {
                    navigate('/')
                })
                .catch((error) => {
                    console.log(error.message)
                    toast.error(error.message)
                });
        }
    }



    return (
        <div>
            <section className="vh-100">
                <div className="container py-5 h-100">
                    <div className="row d-flex align-items-center justify-content-center h-100">
                        <div className="col-md-8 col-lg-7 col-xl-6 d-none d-lg-block">
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                                className="img-fluid" alt="Phone image" />
                        </div>
                        <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                            <form onSubmit={handleSubmit}>
                                {/* <!-- Email input --> */}
                                <div data-mdb-input-init className="form-outline mb-4">
                                    <label className="form-label text-white" htmlFor="form1Example13">Email</label>
                                    <input type="email" id="form1Example13" className="form-control form-control-lg" required onChange={e => setEmail(e.target.value)} />
                                </div>

                                {/* <!-- Password input --> */}
                                <div data-mdb-input-init className="form-outline mb-4">
                                    <label className="form-label text-white" htmlFor="form1Example23">Password</label>
                                    <input type="password" id="form1Example23" className="form-control form-control-lg" required onChange={e => setPassword(e.target.value)} />
                                </div>



                                {/* <!-- Submit button --> */}
                                <div className='d-flex align-items-center justify-content-center flex-column'>
                                    <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg btn-block ">Login</button>
                                    <p className="sign_up text-white pt-4">Don't have an account? <span className='text-primary' onClick={() => navigate('/signup')}>Sign up</span></p>

                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Login
