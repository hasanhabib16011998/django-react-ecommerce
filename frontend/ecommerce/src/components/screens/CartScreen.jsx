import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart, increaseQty, decreaseQty } from '../../app/cartSlice';
import { Link } from 'react-router-dom';
import '../css/CartScreen.css';

function CartScreen() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.qty * item.product.price, 0);

  return (
    <div className="cart-container">
      <h2 className="cart-title">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <div className="cart-empty">
          Your cart is empty. <Link to="/">Go back</Link>
        </div>
      ) : (
        <>
          <div className="cart-list">
            {cartItems.map((item) => (
              <div className="cart-item" key={item.product.id}>
                <img src={item.product.image} alt={item.product.productname} className="cart-item-img" />
                <div className="cart-item-info">
                  <Link to={`/product/${item.product.id}`} className="cart-item-name">
                    {item.product.productname}
                  </Link>
                  <div className="cart-item-brand">{item.product.productbrand}</div>
                  <div className="cart-item-price">${item.product.price}</div>
                  <div className="cart-item-qty">
                    Qty:&nbsp;
                    <button
                      className="qty-btn"
                      onClick={() => dispatch(decreaseQty(item.product.id))}
                      disabled={item.qty <= 1}
                    >-</button>
                    <span className="qty-value">{item.qty}</span>
                    <button
                      className="qty-btn"
                      onClick={() => dispatch(increaseQty(item.product.id))}
                      disabled={item.qty >= item.product.stockcount}
                    >+</button>
                  </div>
                </div>
                <button
                  className="cart-item-remove"
                  onClick={() => dispatch(removeFromCart(item.product.id))}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <div>
              <strong>Total Items:</strong> {totalItems}
            </div>
            <div>
              <strong>Total Price:</strong> ${totalPrice.toFixed(2)}
            </div>
            <button className="cart-clear-btn" onClick={() => dispatch(clearCart())}>
              Clear Cart
            </button>
            {/* Example: Proceed to checkout */}
            <button className="cart-checkout-btn" disabled={cartItems.length === 0}>
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default CartScreen;