import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../actions/productActions';
import SpinningBar from '../partials/spinningBar';

function HomeScreen(props) {
    const productList = useSelector(state => state.productList);
    const { products, loading, error } = productList;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listProducts());

        return () => {
            //
        };
    }, [])

    const handleBuy = (id) => {
        props.history.push(`/product/${id}`);
    }
    return loading ? <SpinningBar></SpinningBar> :
        error ? <div>{error}</div> :
            <ul className="products">
                {
                    products.map(product =>
                        <li key={product._id}>
                            <div className="product">
                                <Link to={'/product/' + product._id}>
                                    <div className="product-image-container">
                                        <img className="product-image" src={product.image} alt="product" />
                                    </div>
                                </Link>
                                <div className="product-name">
                                    <Link to={'/product/' + product._id}>{product.name}</Link>
                                </div>
                                <div className="product-brand">{product.brand}</div>
                                <div className="product-price">${product.price}</div>
                                <div className="product-rating">{product.rating} Stars ({product.numReviews} Reviews)</div>
                                <div className="product-buy-button-container">
                                    <button className="buy-button" onClick={() => handleBuy(product._id)}>Buy</button>
                                </div>
                            </div>
                        </li>)
                }
            </ul>
}
export default HomeScreen;