import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import cartContext from '../context/cart/CartContext';
import { toast } from 'react-toastify';

function ProductItem(props) {
  const { productData } = props;
  const CartContext = useContext(cartContext);
  let { getNumOfProducts, setBadgeNum, cartProductData, getCartProductsData } = CartContext;
  const addToCart = async (id) => {
    try {
      const response = await fetch("http://localhost:5000/api/cart/addProduct", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({ id })
      })
      // eslint-disable-next-line
      const json = await response.json();
      if (response.status === 200) {
        toast('Product added to cart !', {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          closeButton: false
        });
        setBadgeNum({});
        getNumOfProducts();
        getCartProductsData();
        localStorage.setItem('cartAmt', cartProductData[0].cartamount)
      }
    } catch (error) {
      console.log("getProductData error" + error)
    }
  }
  return (
    <div className='col-md-3 my-3'>
      <div className="card">
        <img height={200} src={productData.img} className="card-img-top" alt="..." />
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <h5 className="card-title font-weight-bolder orangeText">{productData.name}</h5>
            <p className='text-muted'>&#8377;{productData.price}</p>
          </div>
          <p className='text-secondary'>By {productData.seller}</p>
          <p className="card-text">{productData.description}</p>
          <div className="container-fluid d-flex justify-content-center mt-4 mb-2">
            <Link to="#" style={{ border: 'none' }} className="btn btn-addToCart text-light" onClick={() => { addToCart(productData._id) }}>Add to cart</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductItem