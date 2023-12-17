import React from 'react'
import { useStateValue } from '../context/StateProvider';
import '../styles/Payment.css'

function Payment() {
    const [{basket, user}, dispatch] = useStateValue();

  return (
    <div className='payment'>
      <div className='payment--container'>
        <div className='payment--section'>
          <div className='payment--title'>
            <h3>Delivery Address</h3>
          </div>
          <div className='payment--address'>
            <p>{user?.email}</p>
            <p>123, React Lane</p>
            <p>Los Angeles, CA</p>
          </div>
        </div>

        <div className='payment--section'>
          <div className='payment--title'>
            <h3>Review items and delivery</h3>
          </div>
          <div className='payment--items'>
            {basket.map(item => (
                <div className='item'>
                <div className='item--image'>
                    <img src={item.image} alt='product' />
                </div>
                <div className='item--info'>
                    <p className='item--title'>{item.title}</p>
                    <p className='item--price'>
                    <small>$</small>
                    <strong>{item.price}</strong>
                    </p>
                </div>
            </div>
            ))}
          </div>
        </div>
        <div className='payment--section'>
          <div className='payment--title'>
            <h3>Payment Method</h3>
          </div>
          <div className='payment--details'>
            <p>Details</p>
            {/* Stripe magic will go here */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Payment
