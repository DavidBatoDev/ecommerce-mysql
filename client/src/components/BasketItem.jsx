import React, {useState} from 'react'
import { useStateValue } from '../context/StateProvider'
import '../styles/BasketItem.css'
import formatCurrency from '../utils/FormatCurrency';
import axios from 'axios';

function BasketItem({id, name, image, price, quantity, isSelected}) {
  const [{user, basket}, dispatch] = useStateValue();


  const removeFromBasket = async () => {
    try {
      if (user?.email) {
        const token = localStorage.getItem('ecom_authToken');
        if (!token) {
          return setError('You need to be logged in to add items to cart')
        }
        const res = await axios.post('api/cart/remove', {
          productId: id
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        if (res.status !== 200) {
          console.log('error:', res.data.message)
          return
        }
      }
      // Remove from local cart regardless of authentication
      dispatch({
        type: 'REMOVE_FROM_BASKET',
        id: id
      })
    } catch (error) {
      console.log('error:', error)
    }
  }

  const toggleItemSelection = () => {
    dispatch({
      type: 'TOGGLE_ITEM_SELECTION',
      id: id
    })
  }

  return (
    <div className='basket-item'>
      <div className='basket-select'>
        <input type="checkbox" checked={isSelected} onChange={toggleItemSelection} />
      </div>
            <div className="basket-item-details-grid">
              <img className="product-image"
                src={image}/>

              <div className="basket-item-details">
                <div className="product-name">
                    {name}
                </div>
                <div className="product-price">
                  ${formatCurrency(price)}
                </div>
                <div className="product-quantity">
                  <span className='amount-quantity'>
                    Quantity: <span className="quantity-label">{quantity}</span>
                  </span>
                  <span className="update-quantity-link link-primary">
                    Update
                  </span>
                  <span onClick={removeFromBasket} className="delete-quantity-link link-primary">
                    Delete
                  </span>
                </div>
              </div>

              {/* <div className="delivery-options">
                <div className="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div className="delivery-option">
                  <input type="radio" checked
                    className="delivery-option-input"
                    name={`delivery-option-${id}`}/>
                  <div>
                    <div className="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div className="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div className="delivery-option">
                  <input type="radio"
                    className="delivery-option-input"
                    name={`delivery-option-${id}`}/>
                  <div>
                    <div className="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div className="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div className="delivery-option">
                  <input type="radio"
                    className="delivery-option-input"
                    name={`delivery-option-${id}`}/>
                  <div>
                    <div className="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div className="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
    </div>
  )
}

export default BasketItem
