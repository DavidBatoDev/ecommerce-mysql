import React, {useState} from 'react'
import '../styles/Products.css'
import Star_1 from '../assets/ratings/rating-10.png'
import Star_2 from '../assets/ratings/rating-20.png'
import Star_3 from '../assets/ratings/rating-30.png'
import Star_4 from '../assets/ratings/rating-40.png'
import Star_5 from '../assets/ratings/rating-50.png'
import { useStateValue } from '../context/StateProvider'
import formatCurrency from '../utils/FormatCurrency';
import axios from 'axios';

export default function Product({id, name, image, price, description}) {
    const stars = [Star_1, Star_2, Star_3, Star_4, Star_5];
    const [{user, basket}, dispatch] = useStateValue();
    const [error, setError] = useState(null);

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

    const addToCart = async () => {
        try {
            if (user?.email) {
                console.log('adding to cart with user')
                const token = localStorage.getItem('ecom_authToken');
                console.log('token:', token)
                if (!token) {
                    console.log('no token')
                    return setError('You need to be logged in to add items to cart')
                }
                const res = await axios.post('api/cart/add', {
                    productId: id,
                    quantity
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                console.log('res:', res)
                if (res.status !== 201) {
                    console.log('error:', res.data.message)
                    setError(res.data.message)
                    return
                }
            }
            // Add to local cart regardless of authentication
            dispatch({
                type: 'ADD_TO_CART',
                item: {
                    id,
                    name,
                    image,
                    description,
                    price,
                    quantity,
                    isSelected: true
                }
            })
        } catch (error) {
            console.log('Error adding to cart:', error.response.data.message)
            setError(error.response.data.message);
        }
    }


  return (
    <div className='product-card'>
        {/* <Error error={error} /> */}
        <div className="product--info">
            <p className='product--title'>{name}</p>
            <p className="product--price">
            <small>$</small>
            <strong>{formatCurrency(price)}</strong>
            </p>
        </div>

        <div className="product--rating">
            {/* <img src={stars[Math.floor(rating) - 1]} alt="" /> */}
        </div>

        <div className='product-image-container'>
            <img 
                className='product--image'
                src={image}
                alt=""
            />
        </div>
        
        <div className='product--button-container'>
            <button onClick={addToCart} className='product--button'>Add to Basket</button>
        </div>
    </div>
  )
}
