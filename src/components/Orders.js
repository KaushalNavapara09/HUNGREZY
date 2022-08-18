import React, { useContext, useEffect } from 'react'
import OrderItem from './OrderItem'
import CartContext from '../context/cart/CartContext';
import { Scrollbars } from 'react-custom-scrollbars-2';
import noOrders from '../images/noOrder.svg';

function Orders() {
    const context = useContext(CartContext);
    let { getOrderdata, orderData } = context;
    useEffect(() => {
        getOrderdata();
        // eslint-disable-next-line
    }, [orderData])
    document.title = "Hungrezy - Your Orders"
    return (
        <>
            <div className='divOrders'>
                {orderData.length === 0 ?
                    <div style={{ width: '30%' }} className="noOrder container justify-content-center py-5">
                        <img className='emptyCartImg align-self-baseline d-block' style={{ marginTop: '60px' }} width={500} src={noOrders} alt="errimg" />
                        <h2 className='orangeText' style={{ marginLeft: '130px', marginTop: '50px' }}>There is no order yet</h2>
                    </div>
                    :
                    <div className="container-fluid orders h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-lg-9 g-0" >
                                <div className="Order-Container">
                                    <div className="crdHeader border-none px-4 py-4">
                                        <h5 className="h3 mb-0 text-light mt-2 mx-4">Thanks for your Order, <span className=''>{localStorage.getItem('uname')}</span></h5>
                                    </div>
                                    <div className="p-5" style={{ overflowX: "hidden" }}>
                                        <div className="d-flex container justify-content-between align-items-center mb-4">
                                            <p className=" mb-0 orangeText h4" >Receipt</p>
                                        </div>
                                        <div className="mb-3 mt-5" style={{ height: '155px' }}>
                                            <Scrollbars renderTrackHorizontal={props => <div {...props} style={{ display: 'none' }} className="track-horizontal" />}>
                                                {
                                                    orderData.map((orderData) => {
                                                        return <OrderItem key={orderData._id} orderData={orderData} />
                                                    })
                                                }
                                            </Scrollbars>
                                        </div>
                                        <hr className='mt-4 mb-4' style={{ width: "90%", margin: "auto" }} />
                                        <div className="d-flex justify-content-between container pt-3">
                                            <p className="mb-0 orangeText h5">Order Details</p>
                                            <p className="mb-0 h5"><span className="me-4 orangeText h5">Delivery Charges :</span> Free</p>
                                        </div>

                                        <div className="d-flex container justify-content-between pt-2">
                                            <p className="text-dark mt-2 mb-0" style={{ fontSize: '19px' }}>Payment Mode : Cash on delivary</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

export default Orders