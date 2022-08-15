import React from 'react'

function OrderItem(props) {
    const { orderData } = props;
    return (
        <div className="border-none g-0 order-item mb-3">
            <div className="row g-0 order-detail container d-flex justify-content-between align-items-center">
                <div className="col-md-3 order-img">
                    <img src={orderData.img}
                        className="img-fluid" alt="Phone" />
                </div>
                <div className="col-md-3 text-center d-flex justify-content-center align-items-center">
                    <p className="h4 orangeText mb-0 order-name">{orderData.name}</p>
                </div>
                <div className="col-md-3 text-center d-flex justify-content-center align-items-center">
                    <p className="h5 mb-0 ">Qty: {orderData.quantity}</p>
                </div>
                <div className="col-md-3 order-price text-center d-flex justify-content-center align-items-center">
                    <p className="h5 mb-0">&#8377; {orderData.price}</p>
                </div>
            </div>
        </div>
    )
}

export default OrderItem