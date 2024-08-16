import React from 'react';
import '../styles/Popup.css';

function Popup({ categories, selectedCategory, onClose, onCategoryClick }) {
    return (
        <div className="popup">
            <button className="popup-close" onClick={onClose}>×</button>
            <div className="popup-content">
                {categories.map((categoryItem) => (
                    <a 
                        href={`/${categoryItem}`} 
                        key={categoryItem}
                        className={`popup-item ${selectedCategory === categoryItem ? 'selected-popup-item' : ''}`}
                        onClick={() => onCategoryClick(categoryItem)}
                    >
                        {categoryItem}
                    </a>
                ))}
            </div>
        </div>
    );
}

export default Popup;
