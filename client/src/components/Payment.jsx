import React, { useEffect, useState } from 'react';
import { useStateValue } from '../context/StateProvider';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import axios from 'axios'; // Import axios for making HTTP requests
import '../styles/Payment.css';

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();
  const [products, setProducts] = useState([]);
  const [address, setAddress] = useState({
    email: user?.email || '',
    street: '',
    city: '',
    state: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [paypalDetails, setPaypalDetails] = useState({
    paypalEmail: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const selectedProducts = basket.filter((item) => item.isSelected);
    setProducts(selectedProducts);
  }, [basket]);

  const handleAddressChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handlePaypalDetailsChange = (e) => {
    setPaypalDetails({
      ...paypalDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handlePlaceOrder = async () => {
    if (!address.street || !address.city || !address.state) {
      alert('Please enter a valid address');
      return;
    }
    try {
      // Prepare the order data
      const orderData = {
        address,
        paymentMethod,
        paypalDetails: paymentMethod === 'paypal' ? paypalDetails : null,
        products,
      };

      // Get the user's auth token from localStorage
      const token = JSON.parse(localStorage.getItem('ecom_authToken'));

      if (!token) {
        alert('You must be logged in to place an order.');
        return;
      }

      // Make the API call to place the order
      const response = await axios.post('/api/orders/place', orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Order placed:', response);

      // Handle success
      if (response.status === 201) {
        alert('Order placed successfully!');
        // Clear the basket after placing the order
        dispatch({
          type: 'REMOVE_SELECTED_FROM_BASKET',
        });
        // Redirect to a confirmation or orders page
        navigate('/orders');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('There was an issue placing your order. Please try again.');
    }
  };

  return (
    <div className='payment'>
      <div className='payment--container'>
        <h1>
          Checkout (<Link to='/basket'>{basket?.length} items</Link>)
        </h1>

        <div className='payment--section'>
          <div className='payment--title'>
            <h3>Delivery Address</h3>
          </div>
          <div className='payment--address'>
            <input
              type='email'
              name='email'
              placeholder='Email'
              value={address.email}
              onChange={handleAddressChange}
            />
            <input
              type='text'
              name='street'
              placeholder='Street Address'
              value={address.street}
              onChange={handleAddressChange}
            />
            <input
              type='text'
              name='city'
              placeholder='City'
              value={address.city}
              onChange={handleAddressChange}
            />
            <input
              type='text'
              name='state'
              placeholder='State'
              value={address.state}
              onChange={handleAddressChange}
            />
          </div>
        </div>

        <div className='payment--section'>
          <div className='payment--title'>
            <h3>Review items and delivery</h3>
          </div>
          <div className='payment--items'>
            {products.map((item) => (
              <div className='item' key={item.id}>
                <div className='item--image'>
                  <img src={item.image} alt='product' />
                </div>
                <div className='item--info'>
                  <p className='item--title'>{item.name}</p>
                  <p className='item--price'>
                    <small>$</small>
                    <strong>{item.price}</strong>
                    <span>({item.quantity})</span>
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
            <div className='payment--method'>
              <input
                type='radio'
                id='cod'
                name='paymentMethod'
                value='cod'
                checked={paymentMethod === 'cod'}
                onChange={handlePaymentMethodChange}
              />
              <label htmlFor='cod'>Cash on Delivery (COD)</label>
            </div>
            <div className='payment--method'>
              <input
                type='radio'
                id='paypal'
                name='paymentMethod'
                value='paypal'
                checked={paymentMethod === 'paypal'}
                onChange={handlePaymentMethodChange}
              />
              <label htmlFor='paypal'>PayPal</label>
            </div>

            {paymentMethod === 'paypal' && (
              <div className='paypal--details'>
                <input
                  type='email'
                  name='paypalEmail'
                  placeholder='PayPal Email'
                  value={paypalDetails.paypalEmail}
                  onChange={handlePaypalDetailsChange}
                  required
                />
              </div>
            )}
          </div>
        </div>

        <div className='payment--actions'>
          <button className='payment--button' onClick={handlePlaceOrder}>
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default Payment;
