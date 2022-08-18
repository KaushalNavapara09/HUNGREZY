import React, { useContext, useRef, useState } from 'react';
import ButtonContext from '../context/button/ButtonContext';
import { useNavigate } from 'react-router-dom';
import auth from '../images/auth.svg';
import UserContext from '../context/user/UserContext';
import { toast } from 'react-toastify';

function Signup() {
  const context = useContext(ButtonContext);
  let { loginRef, signupRef } = context;
  const usercontext = useContext(UserContext);
  let { getUserData, setUname } = usercontext;
  const closeRef = useRef(null);
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ name: "", email: "", phoneNo: "", password: "", cpassword: "" });
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: credentials.name, email: credentials.email, phoneNo: credentials.phoneNo, password: credentials.password, cpassword: credentials.cpassword })
    });

    const json = await response.json();
    if (json.success) {
      setCredentials({ name: "", email: "", phoneNo: "", password: "", cpassword: "" });
      setUname(null);
      //save the auth-token and redirect
      localStorage.setItem('token', json.authtoken);
      getUserData();
      closeRef.current.click();
      navigate("/home");
    } else if (json.pwdnotmatch) {
      toast("Password and confirm password does not match !", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: false,
        // pauseOnHover: true,
        draggable: true,
        progress: undefined,
        closeButton: false
      });
      // alert("Password and confirm password doesn't match...!");
    } else {
      toast("User with this email already exists !", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        closeButton: false
      });
      // alert("User already exists !");
    }
  }

  return (
    <>
      <button ref={signupRef} className="btn btn-primary d-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRightSignup" aria-controls="offcanvasRight">Toggle login offcanvas</button>

      <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRightSignup" aria-labelledby="offcanvasRightLabel">
        <div className="offcanvas-header">
          <button type="button" ref={closeRef} onClick={()=>{setCredentials({ name: "", email: "", phoneNo: "", password: "", cpassword: "" })}} className="btn-close mt-3" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body mx-2">
          <div className='d-flex justify-content-between'>
            <h3 className="offcanvas-title mt-2" id="offcanvasRightLabel">Sign up</h3>
            <img src={auth} className="mx-2" style={{ width: '25%' }} alt="" />
          </div>
          <p className='d-inline-block'>&nbsp;or</p>
          <button className='btn' onClick={() => { loginRef.current.click() }} style={{ border: 'none', fontSize: '15px', color: '#fc8000' }}>login to your account</button>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label mt-4">Name</label>
              <input type="text" className="form-control" id="name" value={credentials.name} required minLength={3} name="name" onChange={onChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="phoneNo" className="form-label">Contact No</label>
              <input type="tel" value={credentials.phoneNo} pattern="^[6-9]\d{9}$" className="form-control" id="phoneNo" required minLength={10} name="phoneNo" onChange={onChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className="form-control" value={credentials.email} id="email" required name="email" aria-describedby="emailHelp" onChange={onChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" value={credentials.password} id="password" required minLength={5} name="password" onChange={onChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="cpassword" className="form-label">Confirm Password</label>
              <input type="password" className="form-control" value={credentials.cpassword} id="cpassword" required minLength={5} name="cpassword" onChange={onChange} />
            </div>
            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-LoginSignup mt-4" style={{ border: 'none' }}>Continue</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Signup