import React, {useState} from 'react'
import '../styles/Products.css'
import Star_1 from '../assets/ratings/rating-10.png'
import Star_2 from '../assets/ratings/rating-20.png'
import Star_3 from '../assets/ratings/rating-30.png'
import Star_4 from '../assets/ratings/rating-40.png'
import Star_5 from '../assets/ratings/rating-50.png'
import { useStateValue } from '../context/StateProvider'
import formatCurrency from '../utils/FormatCurrency';

export default function Product({id, title, image, price}) {
    const stars = [Star_1, Star_2, Star_3, Star_4, Star_5];
    const [{basket}, dispatch] = useStateValue();


    // quantity state & functions
    const [quantity, setQuantity] = useState(1);

    const handleIncrement = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
        }
    };

    const addToBasket = () => {
        const productId = id;

        const existingProduct = basket.findIndex(product => product.id === productId);

        if (existingProduct !== -1) {
            const newQuamtity = basket[existingProduct].quantity += 1;
            dispatch({
                type: 'SET_QUANTITY',
                payload: {
                    id,
                    quantity: newQuamtity
                }
            })
        } else {
            dispatch({
                type: 'ADD_TO_BASKET',
                item: {
                    id,
                    title,
                    image,
                    price,
                    quantity: 1,
                    isSelected: true
                }
            })
        }
    }


  return (
    <div className='product'>
        <div className="product--info">
            <p className='product--title'>{title}</p>
            <p className="product--price">
            <small>$</small>
            <strong>{formatCurrency(price)}</strong>
            </p>
        </div>

        <div className="product--rating">
            {/* <img src={stars[Math.floor(rating) - 1]} alt="" /> */}
        </div>

        <img 
            className='product--image'
            src={image}
            alt=""
        />
        
            
        {/* <div className="quantity-selector">
            <button onClick={handleDecrement} className="decrement">-</button>
            <p className='q'>{quantity}</p>
            <button onClick={handleIncrement} className="increment">+</button>
        </div> */}

        <button onClick={addToBasket} className='product--button'>Add to Basket</button>
    </div>
  )
}
