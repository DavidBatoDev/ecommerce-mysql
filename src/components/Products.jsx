import React from 'react'
import '../styles/Products.css'
import Star_1 from '../assets/ratings/rating-10.png'
import Star_2 from '../assets/ratings/rating-20.png'
import Star_3 from '../assets/ratings/rating-30.png'
import Star_4 from '../assets/ratings/rating-40.png'
import Star_5 from '../assets/ratings/rating-50.png'

export default function Product({id, title, image, price, rating}) {
    const stars = [Star_1, Star_2, Star_3, Star_4, Star_5];

  return (
    <div className='product'>
        <div className="product--info">
            <p>{title}</p>
            <p className="product--price">
            <small>$</small>
            <strong>{price}</strong>
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

        <button className='product--button'>Add to Basket</button>
    </div>
  )
}
