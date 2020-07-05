import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveProduct } from '../actions/productActions';

function ProductsScreen(props) {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState('');
    const [description, setDescription] = useState('');
    const [rating, setRating] = useState('');
    const [numReviews, setNumReviews] = useState('');
    const productSave = useSelector(state => state.productSave);
    const { loading: loadingSave, success: successSave, error: errorSave, product } = productSave;
    const dispatch = useDispatch();

    useEffect(() => {
        if (successSave) {
            props.history.push(`/product/${product}`)
        }
        return () => {
            //
        };
    }, [productSave]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveProduct({ name, price, image, brand, category, countInStock, description, rating, numReviews}));
    }


    return <div className="form">
        <form onSubmit={submitHandler}>
            <ul className="form-container">
                <li>
                    <h2>
                        Create Product
                  </h2>
                </li>
                <li>
                    {loadingSave && <div>Loading...</div>}
                    {errorSave && <div>{errorSave.message}</div>}
                </li>
                <li>
                    <label htmlFor="name">
                        Name
                  </label>
                    <input type="text" name="name" id="name" onChange={(e) => setName(e.target.value)}></input>
                </li>
                <li>
                    <label htmlFor="price">
                        Price
                  </label>
                    <input type="text" name="price" id="price" onChange={(e) => setPrice(e.target.value)}></input>
                </li>
                <li>
                    <label htmlFor="brand">
                        Brand
                  </label>
                    <input type="text" name="brand" id="brand" onChange={(e) => setBrand(e.target.value)}></input>
                </li>
                <li>
                    <label htmlFor="description">
                        Description
                  </label>
                    <input type="text" name="description" id="description" onChange={(e) => setDescription(e.target.value)}></input>
                </li>
                <li>
                    <label htmlFor="category">
                        Category
                  </label>
                    <input type="text" name="category" id="category" onChange={(e) => setCategory(e.target.value)}></input>
                </li>
                <li>
                    <label htmlFor="countInStock">
                        CountInStock
                  </label>
                    <input type="text" name="countInStock" id="countInStock" onChange={(e) => setCountInStock(e.target.value)}></input>
                </li>
                <li>
                    <label htmlFor="rating">
                        Rating
                  </label>
                    <input type="text" name="rating" id="rating" onChange={(e) => setRating(e.target.value)}></input>
                </li>
                <li>
                    <label htmlFor="numReviews">
                        NumReviews
                  </label>
                    <input type="text" name="numReviews" id="numReviews" onChange={(e) => setNumReviews(e.target.value)}></input>
                </li>
                <li>
                    <label htmlFor="image">
                        Image
                  </label>
                    <input type="text" name="image" id="image" onChange={(e) => setImage(e.target.value)}></input>
                </li>
                <li>
                    <button type="submit" className="button primary">Create</button>
                </li>
            </ul>
        </form>
    </div>
}
export default ProductsScreen;