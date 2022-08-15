import { useState } from "react";
import CartContext from "./CartContext";

const CartState = (props) => {
    const [cartProductData, setCartProductData] = useState([])
    const [orderData, setOrderData] = useState([])
    const [billingData, setBillingData] = useState([])
    const [badgeNum, setBadgeNum] = useState(null)
    const [credentials, setCredentials] = useState({ houseNo: "", area: "", city: "", pincode: "", payment: "" });
    const getCartProductsData = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/cart/getallproducts", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                }
            })
            const json = await response.json();
            if (response.status === 200) {
                setCartProductData(json);
                setBillingData(json);
                setBadgeNum({});
                getNumOfProducts();
                localStorage.setItem('cartAmt', json[0].cartamount)
            }
            // console.log(json);
        } catch (error) {
            console.log("getProductData error" + error)
        }
    }

    //Delete product from cart
    const deleteProduct = async (id) => {
        //API call
        const response = await fetch(`http://localhost:5000/api/cart/removeproduct/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            }
        });
        const json = response.json();
        const newCart = cartProductData.filter((element) => { return element._id !== id })
        setCartProductData(newCart);
        setBadgeNum({});
        getNumOfProducts();
        getCartProductsData();
        localStorage.setItem('cartAmt', json[0].cartamount)
    }

    //Get number of products from cart
    const getNumOfProducts = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/cart/getnumofproducts", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                }
            })
            const json = await response.json();
            if (response.status === 200) {
                // console.log(json);
                localStorage.setItem('badgeNum', json);
                setBadgeNum({})
            }
        } catch (error) {
            console.log("getProductData error" + error)
        }
    }

    //Increase quantity of product in cart
    const incrQty = async (id) => {
        //API call
        const response = await fetch(`http://localhost:5000/api/cart/incrQty/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            }
        });
        const json = response.json();
        getCartProductsData();
        localStorage.setItem('cartAmt', json[0].cartamount)
        setBadgeNum({});
    }

    //Decrease quantity of product in cart
    const decrQty = async (id) => {
        //API call
        const response = await fetch(`http://localhost:5000/api/cart/decrQty/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            }
        });
        const json = response.json();
        getCartProductsData();
        localStorage.setItem('cartAmt', json[0].cartamount)
        setBadgeNum({});
    }


    //Add products in order table
    const placeOrder = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/order/placeorder", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("token")
                }
            })
            const jsondata = await res.json()
            if (res.status === 200) {
                console.log("order entery done");
                console.log(jsondata);
                setBadgeNum({});
                getNumOfProducts();
                getCartProductsData();
            }
        } catch (e) {
            console.log(`your order err ${e}`);

        }
    }

    // Get order data
    const getOrderdata = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/order/getorders", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("token")
                }
            })
            const jsondata = await res.json()
            if (res.status === 200) {
                setOrderData(jsondata)
            }
        } catch (e) {

            console.log(`get your order err ${e}`);
        }
    }

    return (
        <CartContext.Provider value={{ cartProductData, getCartProductsData, deleteProduct, billingData, setBillingData, setBadgeNum, badgeNum, getNumOfProducts, incrQty, decrQty, placeOrder, orderData, setOrderData, getOrderdata, credentials, setCredentials }}>
            {props.children}
        </CartContext.Provider>
    )

}

export default CartState;