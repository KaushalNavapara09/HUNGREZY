import React, { useContext } from 'react';
import cartContext from '../context/cart/CartContext';

function CartItem(props) {
    const { cartProductData } = props;
    const CartContext = useContext(cartContext);
    let { deleteProduct, incrQty, decrQty } = CartContext;
    return (
        <div className='Cart-Items container row g-0' style={{ marginBottom: '60px',marginLeft: '0px', marginRight: '0px' }}>
            <div className='image-box col-md-3'>
                <img src={cartProductData.img} alt="..." style={{ height: '120px' }} />
            </div>
            <div className='about col-md-3'>
                <h1 className='title'>{cartProductData.name}</h1>
                <h3 className='subtitle'>By {cartProductData.seller}</h3>
            </div>
            <div className='counter col-md-3'>
                <div><button className='btnCart' onClick={() => { decrQty(cartProductData._id) }} disabled={cartProductData.quantity === 1 ? true : false} id='btnMinus'>-</button></div>
                <div className='count'>{cartProductData.quantity}</div>
                <div><button className='btnCart' onClick={() => { incrQty(cartProductData._id) }}>+</button></div>
            </div>
            <div className='prices d-flex col-md-3'>
                <div className='amount col-md-6 ml-5'>&#8377; {cartProductData.price}</div>
                <i className="fa-solid fa-trash-can deleteIcon col-md-6" onClick={() => { deleteProduct(cartProductData._id) }}></i>
            </div>
        </div>
    )
}

export default CartItem