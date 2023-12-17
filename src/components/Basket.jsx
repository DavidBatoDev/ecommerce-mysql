import React from 'react'
import { useStateValue } from '../context/StateProvider'
import BasketItem from './BasketItem'
import '../styles/Basket.css'
import formatCurrency from '../utils/FormatCurrency';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Link, useNavigate } from 'react-router-dom';

function Basket() {
    const navigate = useNavigate();
    const [{basket}, dispatch] = useStateValue();

      const calculateItemsTotal = () => {
        return basket
          .filter(item => item.isSelected)
          .map(item => item.price * item.quantity)
          .reduce((acc, item) => acc + item, 0)
      }

      const calculateTotal = () => {
        return calculateItemsTotal() * 1.10
      }

    return (
        <div className='basket'>
            <h1>Review your order</h1>
            <div className="basket-container">
                <div className="basket-item-container">
                { basket.length === 0 ? 
                <Link className='link' to='/'>
                    <div className="basket-empty">
                        <AddShoppingCartIcon className='basket-empty-icon'/>
                        <h2>Your basket is empty</h2>
                    </div>
                </Link>
                :
                basket.map(item => (
                    <BasketItem
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        image={item.image}
                        price={item.price}
                        quantity={item.quantity}
                        isSelected={item.isSelected}
                    />
                ))}
                </div>
                <div className='payment'>
                    <div className="payment-summary">
                        <div className="payment-summary-title">
                            Basket Summary
                        </div>

                        <div className="payment-summary-row">
                            <div>Items ({basket.length}):</div>
                            <div className="payment-summary-money">${formatCurrency(calculateItemsTotal())}</div>
                        </div>
                        <div className="payment-summary-row">
                            <div>Shipping &amp; handling:</div>
                            <div className="payment-summary-money">Free</div>
                        </div>

                        <div className="payment-summary-row subtotal-row">
                            <div>Total before tax:</div>
                            <div className="payment-summary-money">${formatCurrency(calculateItemsTotal())}</div>
                        </div>

                        <div className="payment-summary-row">
                            <div>Estimated tax (10%):</div>
                            <div className="payment-summary-money">${formatCurrency(calculateItemsTotal() * 0.10)}</div>
                        </div>

                        <div className="payment-summary-row total-row">
                            <div>Order total:</div>
                            <div className="payment-summary-money">${formatCurrency(calculateTotal())}</div>
                        </div>

                        <button onClick={e => navigate("./")} className="place-order-button button-primary">
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Basket
