import React, { useContext, useRef, useState } from 'react';
import ButtonContext from '../context/button/ButtonContext';
import auth from '../images/auth.svg';
import UserContext from '../context/user/UserContext';
import { toast } from 'react-toastify';

function Changepwd() {
    const context = useContext(ButtonContext);
    const usercontext = useContext(UserContext);
    let { userData } = usercontext;
    let { chandePWDRef } = context;
    const closeRef = useRef(null);
    const [credentials, setCredentials] = useState({ oldpassword: "", newpassword: "", cpassword: "" });
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/changepwd", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ oldpassword: credentials.oldpassword, newpassword: credentials.newpassword, cpassword: credentials.cpassword })
        });

        const json = await response.json();
        if (json.success) {
            // alert("Password changed..!");
            toast("Password has been changed successfully !", {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                closeButton: false
            });
            setCredentials({ oldpassword: "", newpassword: "", cpassword: "" });
            closeRef.current.click();
        } else if (json.pwdnotmatch) {
            toast("Password and confirm password doesn't match !", {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                closeButton: false
            });
            // alert("Password and confirm password doesn't match...!");
        } else {
            toast("Old password is incorrect !", {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                closeButton: false
            });
            // alert("Old password is incorrect....!");
        }
    }

    return (
        <>
            <button ref={chandePWDRef} className="btn btn-primary d-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRightChangePWD" aria-controls="offcanvasRight">Toggle changepwd offcanvas</button>

            <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRightChangePWD" aria-labelledby="offcanvasRightLabel">
                <div className="offcanvas-header">
                    <button type="button" ref={closeRef} className="btn-close mt-3" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body mx-2">
                    <div className='d-flex justify-content-between'>
                        <h3 className="offcanvas-title mt-2 orangeText" id="offcanvasRightLabel">Change password</h3>
                        <img src={auth} className="mx-2" style={{ width: '25%' }} alt="" />
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3 mt-4">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-control" value={`${userData.email}`} readOnly id="email" required name="email" aria-describedby="emailHelp" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="oldpassword" className="form-label">Old Password</label>
                            <input type="password" className="form-control" value={credentials.oldpassword} id="oldpassword" required minLength={5} name="oldpassword" onChange={onChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="newpassword" className="form-label">New Password</label>
                            <input type="password" className="form-control" value={credentials.newpassword} id="newpassword" required minLength={5} name="newpassword" onChange={onChange} />
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

export default Changepwd