import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listOrderMine } from '../actions/orderAction';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

function OrderHisotyScreen(props) {
    
    const orderMineList = useSelector((state) => state.orderMineList);
    const { loading, error, orders } = orderMineList;

   
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listOrderMine());
    }, [dispatch]);

    return (
        <div>
            <h1>Order History</h1>
            {
                loading ? <LoadingBox /> 
                    : error ? <MessageBox variant='danger'> {error} </MessageBox>
                        : (
                     <table className='table'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>DATE</th>
                                        <th>TOTAL</th>
                                         
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        orders.length > 0 && orders.map((order) => (
                                            <tr key={order._id}>
                                                <td>{order._id}</td>
                                                <td>{order.createdAt.slice(0,10)}</td>
                                                <td>RS{order.totalPrice}</td>
                                                 
                                                <td>
                                                    <button type='button' className='small'
                                                        onClick={() => {props.history.push(`/order/${order._id}`);}}
                                                    >
                                                      Details
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        )
            }
        </div>
    );
}

export default OrderHisotyScreen;