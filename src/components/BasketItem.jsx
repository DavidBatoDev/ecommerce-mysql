import React from 'react'
import { useStateValue } from '../context/StateProvider'
import '../styles/BasketItem.css'

function BasketItem({id, title, image, price, rating, quantity}) {
  const [{basket}, dispatch] = useStateValue();

  const removeFromBasket = () => {
    dispatch({
      type: 'REMOVE_FROM_BASKET',
      id: id
    })
  }

  return (
    <div className='basket-item'>
            <div class="basket-item-details-grid">
              <img class="product-image"
                src={image}/>

              <div class="basket-item-details">
                <div class="product-name">
                    {title}
                </div>
                <div class="product-price">
                  {price}
                </div>
                <div class="product-quantity">
                  <span className='amount-quantity'>
                    Quantity: <span class="quantity-label">{quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span onClick={removeFromBasket} class="delete-quantity-link link-primary">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name={`delivery-option-${id}`}/>
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name={`delivery-option-${id}`}/>
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name={`delivery-option-${id}`}/>
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
    </div>
  )
}

export default BasketItem
