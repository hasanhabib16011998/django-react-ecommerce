import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../css/ProductScreen.css'; // Import the CSS file for styles
import Rating from '../Rating';


function ProductScreen() {
    const { id } = useParams(); // Get the product ID from the route
    const [product, setProduct] = useState(null);

    useEffect(() => {
        async function fetchProduct() {
            const { data } = await axios.get(`http://127.0.0.1:8000/api/products/${id}`);
            setProduct(data);
        };
        fetchProduct();
    }, [id]);

    if (!product) {
        return <div className="loading">Loading...</div>; // Show a loading state while fetching data
    }

    return (
        <div className="product-details">
            <div className="product-image-container">
                <img src={product.image} alt={product.productname} className="product-image" />
            </div>
            <div className="product-info">
                <h1 className="product-title">{product.productname}</h1>
                <p className="product-description">{product.productinfo}</p>
                <p className="product-category"><strong>Category:</strong> {product.productcategory}</p>
                <p className="product-brand"><strong>Brand:</strong> {product.productbrand}</p>
                <p className="product-price"><strong>Price:</strong> ${product.price}</p>
                <p className="product-stock"><strong>Stock:</strong> {product.stockcount>0 ? "In Stock":"Out of Stock"}</p>
                <p className="product-rating"><strong>Rating:</strong>
                <Rating value={product.rating} color="#ffcc00" text={`${product.rating} out of 5`} />
                </p>
            </div>
        </div>
    );
}

export default ProductScreen;