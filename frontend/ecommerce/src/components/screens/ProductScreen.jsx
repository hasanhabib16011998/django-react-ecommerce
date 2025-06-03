import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById } from '../../app/productDetailsSlice';
import '../css/ProductScreen.css';
import Rating from '../Rating';

function ProductScreen() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { product, loading, error } = useSelector(state => state.productDetails);

    useEffect(() => {
        dispatch(fetchProductById(id));
    }, [dispatch, id]);

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">Error: {error}</div>;
    if (!product) return null;

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
                <p className="product-stock"><strong>Stock:</strong> {product.stockcount > 0 ? "In Stock" : "Out of Stock"}</p>
                <div className="product-rating">
                <strong>Rating:</strong>
                <Rating value={product.rating} color="#ffcc00" text={`${product.rating} out of 5`} />
                </div>
            </div>
        </div>
    );
}

export default ProductScreen;