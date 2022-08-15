import React from 'react';
import deliverySrv from '../images/deliverySrv.svg';
import foodSrv from '../images/foodSrv.svg';
import orderSrv from '../images/orderSrv.svg';
import darklogo from '../images/darklogo.png';

function Services() {
    return (
        <div className='container-fluid srvContainer'>
            <div className="services">
                <div className="row justify-content-center pt-4">
                    <img className="col-lg-4 srvimg imgleft" style={{ marginTop: "60px" }} src={foodSrv} alt="" />
                    <img className="col-lg-4 srvimg imgmid mt-5" style={{ width: "11%", height: "11%" }} src={orderSrv} alt="" />
                    <img className="col-lg-4 srvimg imdright" style={{ marginTop: "86px" }} src={deliverySrv} alt="" />
                    <h5 className="left col-lg-4 text-center">Best Quality Food</h5>
                    <h5 className="mid col-lg-4 text-center mt-4">No Minimum Order</h5>
                    <h5 className="right col-lg-4 text-center">Lightning-Fast Delivery</h5>
                    <p className="col-3 scontent text-center">We aim to provide customers with supreme quality food</p>
                    <p className="col-3 scontent text-center">Order in for yourself or for the group, with no restrictions on order value</p>
                    <p className="col-3 scontent text-center">Experience our superfast delivery for food delivered fresh & on time</p>
                    <hr style={{ height: '3px', width: '90%' }} />
                    <div className='container-fluid text-center d-flex justify-content-between pb-2'>
                        <div className="container d-flex justify-content-between pb-2">
                            <img src={darklogo} className="" style={{ width: "20%" }} alt="" />
                            <p className='text-light text-center font-weight-bold mt-4 '>&#169; HUNGREZY</p>
                            <div className='mt-4 mx-5 text-center' >
                                <i className="fa-brands fa-facebook-f mx-3"></i>
                                <i className="fa-brands fa-instagram mx-3"></i>
                                <i className="fa-brands fa-twitter mx-3"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Services