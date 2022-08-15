import React, { useContext, useEffect } from 'react';
import ProductContext from '../context/product/ProductContext';
import ProductItem from './ProductItem';

function Products() {
    const context = useContext(ProductContext);
    let { productData, getProductData } = context;
    useEffect(() => {
        getProductData();
        // eslint-disable-next-line
    }, [])

    return (
        <div className="row container-fluid" style={{marginLeft:'0px', marginRight: '0px'}}>
            {productData.map((productData) => {
                return <ProductItem key={productData._id} productData={productData} />
            })}
        </div>
    )
}

export default Products