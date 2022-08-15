import React, { useContext, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import logo from '../images/HUNGREZY.png';
import UserContext from '../context/user/UserContext';
import ButtonContext from '../context/button/ButtonContext';
import CartContext from '../context/cart/CartContext';

function Navbar() {
    const context = useContext(ButtonContext);
    let { chandePWDRef } = context;
    // eslint-disable-next-line
    let { uname } = useContext(UserContext);
    const cartContext = useContext(CartContext);
    // eslint-disable-next-line
    let { badgeNum, setBadgeNum, setCredentials } = cartContext
    let location = useLocation();
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('uname');
        setBadgeNum({});
        setCredentials({ houseNo: "", area: "", city: "", pincode: "", payment: "" });
    }
    useEffect(() => {
        setBadgeNum({});
        // eslint-disable-next-line
    }, [])



    return (
        <div className={`${location.pathname === "/" ? "d-none" : ""}`}>
            <nav className="navbar fixed-top navbar-expand-lg bg-white bg-gradient fs-5">
                <div className="container-fluid d-flex justify-content-between">
                    <Link className="navbar-brand mx-5" to="/home">
                        <img src={logo} alt="" width="" height="60px" />
                    </Link>
                    <div className="d-flex mx-5 px-4" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item mt-2 mx-4">
                                <Link className={`nav-link ${location.pathname === "/home" ? "act" : ""}`} aria-current="page" to="/home">Home</Link>
                            </li>
                            <li className="nav-item mt-2 mx-4">
                                <Link className={`nav-link ${location.pathname === "/about" ? "act" : ""}`} to="/about">About Us</Link>
                            </li>

                        {/* </ul>
                    </div>
                    <div className="d-flex mx-5 px-4" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0"> */}
                            <li className="nav-item mx-4 mt-2">
                                <Link className="nav-link f5" to="/cart">
                                    <i className={`fa-solid fa-cart-shopping ${location.pathname === "/cart" ? "act" : ""}`}>
                                        <span className="position-absolute translate-middle badge rounded-pill">
                                            {localStorage.getItem('badgeNum')}
                                        </span>
                                    </i>
                                </Link>
                            </li>
                            <li className="nav-item dropdown mx-4 mt-2">
                                <Link className="nav-link dropdown-toggle f5" to="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i className="fa-solid fa-user mx-1"></i> {localStorage.getItem('uname')}
                                </Link>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item my-2" to="/orders"><i class="fa-solid fa-bag-shopping px-1"></i> &nbsp;My Orders</Link></li>
                                    <li><Link className="dropdown-item my-2" to="#" onClick={() => { chandePWDRef.current.click() }}><i className="fa-solid fa-key px-1"></i> Change password &nbsp;</Link></li>
                                    <li><Link className="dropdown-item my-2" to="/" onClick={handleLogout}><i className="fa-solid fa-right-from-bracket px-1"></i> Logout</Link></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar