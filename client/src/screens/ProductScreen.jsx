import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Rating from '../components/Rating';
import { detailsProduct } from '../actions/productAction';
//import data from '../data/products';

function ProductScreen (props) {
     

    const dispatch = useDispatch();
     
    const productId = props.match.params.id;

    const [ qty, setQty ] = useState(1);

     
    const productDetails = useSelector(state => state.productDetails);
     
    const { product, loading, error } = productDetails;

    

    useEffect(() => {
        dispatch(detailsProduct(productId));
    
    }, [dispatch, productId]); 
   
     
    const addToCartHandler = () => {
        props.history.push(`/cart/${productId}?qty=${qty}`);
    };


    return (
        <div>
            {
                loading ? <LoadingBox />
                    : error ? <MessageBox variant="danger"> { error } </MessageBox>
                        : (
                            <div>
                                 
                                <Link to='/'> Back To Result</Link>

                                <div className='row top'>
                                    
                                    <div className='col-2'>
                                        <img className='large' src={product.image} alt={product.name} />
                                    </div>

                                    {/* description */}
                                    <div className='col-1'>
                                        <ul>
                                            <li>
                                                <h1>{product.name}</h1>
                                            </li>
                                            <li>
                                                <Rating rating={product.rating} numReviews={product.numReviews} />
                                            </li>
                                            <li>Price: RS{product.price}</li>
                                            <li>
                                                Description:
                                                <p>{product.description} </p>
                                            </li>
                                        </ul>
                                    </div>

                                    {/* action */}
                                    <div className='col-1'>
                                        <div className='card car-body'>
                                            <ul>
                                                <li>
                                                    <div className='row'>
                                                        <div>Price </div>
                                                        <div className='price'>${product.price}</div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className='row'>
                                                        <div>Status </div>
                                                        <div>
                                                            {
                                                                product.countInStock > 0 ? <span className='success'> In Stock</span> :
                                                                    <span variant='danger'> Unavailable</span>
                                                            }
                                                        </div>
                                                    </div>
                                                </li>
                                               
                                                {
                                                    product.countInStock > 0 && (
                                                        <>
                                                            <li>
                                                                <div className='row'>
                                                                    <div>Qty</div>
                                                                    <div>
                                                                        <select 
                                                                            value={qty} 
                                                                            onChange={(e) => setQty(e.target.value)}
                                                                        >
                                                                            {
                                                                                [...Array(product.countInStock)].map((x, i) => (
                                                                                    <option key={i+1} value={i+1}>{i+1}</option>
                                                                                ))
                                                                            }
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <button className='primary block'
                                                                    onClick={addToCartHandler}
                                                                >
                                                                    Add to Cart
                                                                </button>
                                                            </li>
                                                        </>
                                                    )
                                                }
                                                
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
        </div>
    );
}

export default ProductScreen;