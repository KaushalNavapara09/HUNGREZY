import React, { useContext, useRef, useState } from 'react';
import ButtonContext from '../context/button/ButtonContext';
import { useNavigate } from 'react-router-dom';
import auth from '../images/auth.svg';
import UserContext from '../context/user/UserContext';
import { toast } from 'react-toastify';
import CartContext from '../context/cart/CartContext';

function Login() {
    const context = useContext(ButtonContext);
    let { loginRef, signupRef } = context;
    const usercontext = useContext(UserContext);
    let { getUserData, setUname } = usercontext;
    const cartContext = useContext(CartContext);
    let { getNumOfProducts, setBadgeNum } = cartContext;
    const navigate = useNavigate();
    const closeRef = useRef(null);
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        if (json.success) {
            setCredentials({ email: "", password: "" });
            setUname(null);
            setBadgeNum({});
            //save the auth-token and redirect
            localStorage.setItem('token', json.authtoken);
            closeRef.current.click();
            getUserData();
            getNumOfProducts();
            navigate("/home");
        } else {
            toast('Invalid credentials !', {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                closeButton: false
            });
        }
    }
    return (
        <>
            <button ref={loginRef} className="btn btn-primary d-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRightLogin" aria-controls="offcanvasRight">Toggle login offcanvas</button>

            <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRightLogin" aria-labelledby="offcanvasRightLabel">
                <div className="offcanvas-header">
                    <button type="button" ref={closeRef} onClick={()=>{setCredentials({ email: "", password: "" })}} className="btn-close mt-3" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body mx-2">
                    <div className='d-flex justify-content-between'>
                        <h3 className="offcanvas-title mt-2" id="offcanvasRightLabel">Login</h3>
                        <img src={auth} className="mx-2" style={{ width: '25%' }} alt="" />
                    </div>
                    <p className='d-inline-block'>&nbsp;or</p>
                    <button className='btn' onClick={() => { signupRef.current.click() }} style={{ border: 'none', fontSize: '16px', color: '#fc8000' }}>create an account</button>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label mt-5">Email</label>
                            <input type="email" className="form-control" value={credentials.email} id="email" required name="email" aria-describedby="emailHelp" onChange={onChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" value={credentials.password} id="password" required minLength={5} name="password" onChange={onChange} />
                        </div>
                        <div className="d-flex justify-content-center">
                            <button type="submit" className="btn btn-LoginSignup mt-4" style={{ border: 'none', backgroundColor: "#fc8000" }}>Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login