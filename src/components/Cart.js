import React, { useContext, useEffect } from 'react';
import CartContext from '../context/cart/CartContext';
import CartItem from './CartItem';
import emptyCart from '../images/emptyCart.svg';
import { useNavigate } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars-2';
import ButtonContext from '../context/button/ButtonContext';

function Cart() {
    const context = useContext(CartContext);
    // eslint-disable-next-line
    let { cartProductData, getCartProductsData, badgeNum } = context;
    const buttoncontext = useContext(ButtonContext);
    let { confirmOrderRef } = buttoncontext;
    const navigate = useNavigate();
    useEffect(() => {
        getCartProductsData();
        // eslint-disable-next-line
    }, [])

    return (
        <div className='divCart'>
            {cartProductData.length === 0 ?
                <div style={{ width: '30%' }} className="emptyCart container justify-content-center py-5">
                    <img className='emptyCartImg align-self-baseline d-block' style={{ marginTop: '40px' }} width={500} src={emptyCart} alt="errimg" />
                    <button onClick={() => { navigate("/home"); }} style={{ width: '50%', marginLeft: '140px', marginTop: '50px', fontSize: '19px' }} className='button'>Shop now</button>
                </div>
                :
                <>
                    <div className="container Cart-Container py-4 mb-5">
                        <div className='mt-4' style={{ height: '300px' }}>
                            <Scrollbars>
                                {
                                    cartProductData.map((cartProductData) => {
                                        return <CartItem key={cartProductData._id} cartProductData={cartProductData} />
                                    })
                                }
                            </Scrollbars>
                        </div>

                        <hr />
                        <div className='checkout container-fluid g-0'>
                            <div className='total'>
                                <div>
                                    <div className='Subtotal mb-2'>Total Amount</div>
                                    <div className='items'>{localStorage.getItem('badgeNum')} items</div>
                                </div>
                                <div className='total-amount'>&#8377; {localStorage.getItem('cartAmt')}</div>
                            </div>
                            <button className='button' onClick={() => { confirmOrderRef.current.click() }}>Checkout</button>
                        </div>
                    </div>
                </>}

        </div>
    )
}

export default Cart