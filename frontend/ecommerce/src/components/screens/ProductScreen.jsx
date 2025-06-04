import React, { useEffect,useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById } from '../../app/productDetailsSlice';
import '../css/ProductScreen.css';
import { addToCart } from '../../app/cartSlice';
import Rating from '../Rating';

function ProductScreen() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { product, loading, error } = useSelector(state => state.productDetails);
    const [qty, setQty] = useState(1);

    useEffect(() => {
        dispatch(fetchProductById(id));
    }, [dispatch, id]);

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">Error: {error}</div>;
    if (!product) return null;
    const handleAddToCart = () => {
        dispatch(addToCart({ product, qty }));
        // Optionally show a message or redirect to cart
        alert(`Added ${qty} item(s) to cart!`);
    };

    return (
        <div className="product-details">
            {/* 1/3rd: Image */}
            <div className="product-image-container">
                <img src={product.image} alt={product.productname} className="product-image" />
            </div>
            {/* 1/3rd: Info */}
            <div className="product-info">
                <h1 className="product-title">{product.productname}</h1>
                <p className="product-description">{product.productinfo}</p>
                <p className="product-category"><strong>Category:</strong> {product.productcategory}</p>
                <p className="product-brand"><strong>Brand:</strong> {product.productbrand}</p>
                <div className="product-rating">
                    <strong>Rating:</strong>{" "}
                    <Rating value={product.rating} color="#ffcc00" text={`${product.rating} out of 5`} />
                </div>
            </div>
            {/* 1/3rd: Price, Stock, Add to Cart */}
            <div className="product-price-box">
                <div className="product-price"><strong>Price:</strong> ${product.price}</div>
                <div className="product-stock"><strong>Stock:</strong> {product.stockcount > 0 ? "In Stock" : "Out of Stock"}</div>
                {product.stockcount > 0 && (
                    <div className="product-qty-section">
                        <label htmlFor="quantity" className="product-qty-label">Qty:</label>
                        <select
                            id="quantity"
                            value={qty}
                            onChange={e => setQty(Number(e.target.value))}
                            className="product-qty-select"
                        >
                            {[...Array(product.stockcount).keys()].map(x =>
                                <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                </option>
                            )}
                        </select>
                    </div>
                )}
                <button
                    className="add-to-cart-btn"
                    disabled={product.stockcount === 0}
                    onClick={handleAddToCart}
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
}

export default ProductScreen;