import React, { useContext } from 'react';
import logo from '../images/HUNGREZY.png';
import food from '../images/foodLanding.jpg';
import ButtonContext from '../context/button/ButtonContext';
import Services from './Services';

function Landing() {
    const context = useContext(ButtonContext);
    let { loginRef, signupRef } = context;
    return (
        <>
            <div className="container-fluid h-40 g-0 mx-auto row lanContainer">
                <div className='col-md-7 mt-5 px-5' style={{ height: '660px' }}>
                    <div className='container d-flex justify-content-between' >
                        <img style={{ height: '70px' }} src={logo} alt="logo" />
                        <div className='text-center'>
                            <button className="btn btn-auth" onClick={() => { loginRef.current.click() }} style={{ border: 'none' }}>Login</button>
                            <button className="btn btn-auth" onClick={() => { signupRef.current.click() }} style={{ border: 'none' }}>Sign up</button>
                        </div>
                    </div>
                    <div className='mx-5 ' style={{ marginTop: '75px' }} >
                        <h1 style={{ fontWeight: '700', color: '#282C3F' }}>Cooking gone wrong ?</h1>
                        <h3 className='w-70 my-3' style={{ color: '#686b78' }}>Order food from favourite restaurants near you and get your meal at your door step.</h3>
                        <h5 className='my-5' style={{ color: 'grey' }}>We provide delivery  service in 50+ cities of India.</h5>
                    </div>
                </div>
                <div className="col-md-5" >
                    <img src={food} alt="Not found" style={{ width: '100%', height: '500px' }} />
                </div>
            </div>
            <Services />
        </>
    )
}

export default Landing;
