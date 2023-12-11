import React, {useState} from 'react'
import CheckIcon from '@mui/icons-material/Check';
import '../styles/Products.css'

function Products({id, title, price, description, category, image}) {
    const [quantity, setQuantity] = useState(1)
    return (
        <div className='product'>
            <div className="product-container">
                    <div className="product-image-container">
                        <img className="product-image"
                            src={image} alt={title} />
                    </div>

                    <div className="product-name limit-text-to-2-lines">
                        {title}
                    </div>

                    <div className="product-price">
                        ${price}
                    </div>

                    <div className="product-quantity-container">
                        <select value={quantity} onChange={e => setQuantity(e.target.value)}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select>
                    </div>

                    <div className="product-spacer"></div>

                    <div className="added-to-cart">
                        <CheckIcon className="added-to-cart-icon" />
                        Added
                    </div>

                    <button className="add-to-cart-button button-primary">
                        Add to Cart
                    </button>
                </div>
        </div>
    )
}

export default Products
