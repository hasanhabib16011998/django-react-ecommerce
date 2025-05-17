import React from 'react';

function Rating({ value, text, color }) {
    return (
        <div className="rating">
            {Array.from({ length: 5 }, (_, i) => (
                <span key={i}>
                    <i
                        style={{ color }}
                        className={
                            value >= i + 1
                                ? 'fas fa-star' // Solid star
                                : value >= i + 0.5
                                ? 'fas fa-star-half-alt' // Half star
                                : 'far fa-star' // Empty star
                        }
                    ></i>
                </span>
            ))}
            {text && <span>{text}</span>}
        </div>
    );
}

export default Rating;