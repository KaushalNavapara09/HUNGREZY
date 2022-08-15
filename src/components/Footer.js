import React from 'react';
import blacklogo from '../images/blacklogo.png';

function Footer() {
    return (
        <div className='container-fluid text-light text-center d-flex justify-content-between ftr '>
            <div className="container d-flex justify-content-between py-2">
                <img src={blacklogo} className="" style={{width: "20%" }} alt="" />
                <p className='text-light text-center font-weight-bold ml-4 mt-4 '>&#169; HUNGREZY</p>
                <div className='mt-4 mx-4 text-center' >
                    <i className="fa-brands fa-facebook-f mx-3"></i>
                    <i className="fa-brands fa-instagram mx-3"></i>
                    <i className="fa-brands fa-twitter mx-3"></i>
                </div>
            </div>
        </div>
    )
}

export default Footer