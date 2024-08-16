import React from 'react';
import '../styles/Popup.css';
import { Link } from 'react-router-dom';

function Popup({ categories, selectedCategory, onClose, onCategoryClick }) {
    return (
        <div className="popup">
            <button className="popup-close" onClick={onClose}>×</button>
            <div className="popup-content">
                {categories.map((categoryItem) => (
                    <Link
                        to={`/${categoryItem}`} 
                        key={categoryItem}
                        className={`popup-item ${selectedCategory === categoryItem ? 'selected-popup-item' : ''}`}
                        onClick={() => onCategoryClick(categoryItem)}
                    >
                        {categoryItem}
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Popup;
