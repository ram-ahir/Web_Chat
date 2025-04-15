import React, { useState } from 'react'
import './Loginstyle.css'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { app } from '../../../firebase';
const auth = getAuth(app);

import { doc, setDoc } from "firebase/firestore";
import { db } from '../../../firebase';
import UploadBox from './UploadBox';


const Signup = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [imgurl, setImgurl] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(name)
        console.log(email)
        console.log(imgurl)
        console.log(username)
        console.log(password)
        if (password.length < 6) {
            toast.error("password minimum length: 6");
        }
        else if (imgurl == null) {
            toast.error("Please Upload a Profile Picture");

        }
        else {
            await createUserWithEmailAndPassword(auth, email, password)
                .then(() => {
                    toast.success("Sign up Successfuly")
                })
                .then(async () => {
                    await setDoc(doc(db, "Users", email), {
                        profileImg: imgurl,
                        name: name,
                        Email: email,
                        username: username,
                        password: password
                    });
                    })
                    .then(async() => {
                        try {
                            const res = await axios.post('https://webchat-production-e26f.up.railway.app/api/create-users', {
                                profileImg: imgurl,
                                name: name,
                                Email: email,
                                username: username,
                                password: password
                            });
                            console.log('Response:', res.data);
                            alert('User created successfully!');
                        } catch (err) {
                            console.error('Error posting data:', err);
                        }
                }).then(() => {
                    navigate('/')
                })
                .catch((error) => {
                    console.log(error.message)
                    toast.error(error.message)
                });
        }
    }

    const senddata = async () => {
        try {
            const res = await axios.post('https://webchat-production-e26f.up.railway.app/api/create-users', {
                Email : email,
                name : name,
                username : username,
                password : password,
                profileImg : "no"
            });
            console.log('Response:', res.data);
            console.log('User created successfully!');
        } catch (err) {
            console.error('Error posting data:', err);
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
                            <label className="form-label text-white mb-1">Profile Picture</label>
                            <UploadBox setImgurl={setImgurl} />
                            <form onSubmit={handleSubmit}>
                                {/* <!-- Name input --> */}
                                <div data-mdb-input-init className="form-outline mb-3">
                                    <label className="form-label text-white" htmlFor="Name1">Name</label>
                                    <input type="text" id="Name1" className="form-control form-control-lg" required onChange={e => setName(e.target.value)} />
                                </div>

                                {/* <!-- Email input --> */}
                                <div data-mdb-input-init className="form-outline mb-3">
                                    <label className="form-label text-white" htmlFor="email13">Email</label>
                                    <input type="email" id="email13" className="form-control form-control-lg" required onChange={e => setEmail(e.target.value)} />
                                </div>
                                {/* <!-- username input --> */}
                                <div data-mdb-input-init className="form-outline mb-3">
                                    <label className="form-label text-white" htmlFor="form1Example13">Username</label>
                                    <input type="text" id="form1Example13" className="form-control form-control-lg" required onChange={e => setUsername(`@${e.target.value}`)} />
                                </div>

                                {/* <!-- Password input --> */}
                                <div data-mdb-input-init className="form-outline mb-3">
                                    <label className="form-label text-white" htmlFor="form1Example23" >Password</label>
                                    <input type="password" id="form1Example23" className="form-control form-control-lg" required onChange={e => setPassword(e.target.value)} />
                                </div>



                                {/* <!-- Submit button --> */}
                                <div className='d-flex align-items-center justify-content-center flex-column'>
                                    <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg btn-block ">Sign up</button>
                                    <p className="sign_up text-white pt-4">Already have an account?  <span className='text-primary' onClick={() => navigate('/login')}>Login</span></p>

                                </div>

                            </form>
                            {/* <div className='d-flex align-items-center justify-content-center flex-column'>
                                <button onClick={() => senddata()} className="btn btn-primary btn-lg btn-block ">send</button>
                            </div> */}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Signup
