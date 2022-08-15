import React, { useRef, useContext, useState } from 'react';
import ButtonContext from '../context/button/ButtonContext';
import CartContext from '../context/cart/CartContext';
import order from '../images/order.svg';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

function ConfirmOrder() {
    const context = useContext(ButtonContext);
    let { confirmOrderRef } = context;
    const cartContext = useContext(CartContext);
    // eslint-disable-next-line
    let { placeOrder, setBadgeNum, getNumOfProducts, getCartProductsData, badgeNum } = cartContext
    const closeRef = useRef(null);
    let navigate = useNavigate();
    const [credentials, setCredentials] = useState({ houseNo: "", area: "", city: "", pincode: "", payment: "" });
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(localStorage.getItem('token'));
        const response = await fetch("http://localhost:5000/api/cart/address", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ houseNo: credentials.houseNo, area: credentials.area, city: credentials.city, pincode: credentials.pincode })
        });
        // eslint-disable-next-line
        const json = await response.json();
        if (response.status === 200) {
            placeOrder();
            closeRef.current.click();
            setBadgeNum({});
            getNumOfProducts();
            getCartProductsData();
            Swal.fire({
                title: 'Order placed successfully!',
                text: 'Your order will be delivered in next 30 minutes',
                type: 'success',
                confirmButtonColor: "#2ec780",
            });
            navigate('/orders');
        }
    }
    return (
        <>
            <button ref={confirmOrderRef} className="btn btn-primary d-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRightconfirmOrder" aria-controls="offcanvasRight">Toggle confirm order offcanvas</button>

            <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRightconfirmOrder" aria-labelledby="offcanvasRightLabel">
                <div className="offcanvas-header">
                    <button type="button" ref={closeRef} className="btn-close mt-3" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body mx-2">
                    <div className='d-flex justify-content-between'>
                        <h3 className="offcanvas-title mt-2 orangeText" id="offcanvasRightLabel">Confirm Order</h3>
                        <img src={order} className="mx-2" style={{ width: '25%' }} alt="" />
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3 mt-4">
                            <label htmlFor="houseNo" className="form-label">House No, Building Name</label>
                            <input type="text" className="form-control" value={credentials.houseNo} id="houseNo" required minLength={1} name="houseNo" onChange={onChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="area" className="form-label">Area, Colony</label>
                            <input type="text" className="form-control" value={credentials.area} id="area" required minLength={5} name="area" onChange={onChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="city" className="form-label">City</label>
                            <input type="text" className="form-control" value={credentials.city} id="city" required minLength={3} name="city" onChange={onChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="pincode" className="form-label">Pincode</label>
                            <input type="text" className="form-control" value={credentials.pincode} id="pincode" required minLength={6} name="pincode" onChange={onChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="payment" className="form-label">Payment Mode</label>
                            <select required className="form-select" aria-label="Default select example" selected={credentials.payment} name='payment' id='payment' onChange={onChange}>
                                <option value="" >Select Payment Mode</option>
                                <option value="Cash on delivery">Cash On Delivery</option>
                            </select>
                        </div>
                        <div className="d-flex justify-content-center">
                            <button type="submit" className="btn btn-LoginSignup mt-4" style={{ border: 'none' }}>Place Order</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ConfirmOrder