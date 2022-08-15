import ProductContext from "./ProductContext";
import { useState } from "react";

const ProductState = (props) => {
    const [productData, setProductData] = useState([])
    const getProductData = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/products/getallproducts", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const json = await response.json();
            if (response.status === 200) {
                setProductData(json);
            }
            // console.log(json);
        } catch (error) {
            console.log("getProductData error" + error)
        }
    }

    return (
        <ProductContext.Provider value={{ productData, getProductData }}>
            {props.children}
        </ProductContext.Provider>
    )
}

export default ProductState;