import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/HomeScreen.css';
import Rating from '../Rating';
import { Link } from 'react-router-dom';

function HomeScreen() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchProducts() {
            const { data } = await axios.get('http://127.0.0.1:8000/api/products/');
            setProducts(data);
        };
        fetchProducts();
    }, []);

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