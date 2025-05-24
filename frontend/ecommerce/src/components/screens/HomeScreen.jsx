import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/HomeScreen.css';
import Rating from '../Rating';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../../app/productlistSlice';

function HomeScreen() {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector(state=>state.products);

    useEffect(() => {
        dispatch(fetchProducts());
    },[dispatch]);
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="product-container">
            <h1 className="title">Products</h1>
            <div className="card-grid">
                {products.map((product) => (
                  <Link to={`/product/${product._id}`} key={product._id} className="card-link">
                    <div key={product._id} className="card">
                        <img src={product.image} alt={product.productname} className="card-image" />
                        <div className="card-body">
                            <h2 className="card-title">{product.productname}</h2>
                            <p className="card-category">{product.productcategory}</p>
                            <p className="card-info">{product.productinfo}</p>
                            <div className="card-footer">
                                <span className="card-price">${product.price}</span>
                                <span className="card-rating">
                                <Rating value={product.rating} color="#ffcc00" text={`${product.rating} out of 5`} />
                                </span>
                            </div>
                        </div>
                    </div>
                  </Link>
                ))}
            </div>
        </div>
    );
}

export default HomeScreen;