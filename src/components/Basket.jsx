import React from 'react'
import { useStateValue } from '../context/StateProvider'
import BasketItem from './BasketItem'
import '../styles/Basket.css'
import formatCurrency from '../utils/FormatCurrency';

function Basket() {
    const [{basket}, dispatch] = useStateValue();

    const calculateItemsPrice = () => {
        let price = 0;
        basket.map(item => {
            price += item.price * item.quantity;
        })
        return price;
    }

    const itemsPrice = calculateItemsPrice();


    return (
        <div className='basket'>
            <h1>Review your order</h1>
            <div className="basket-container">
                <div class="basket-item-container">
                    {basket.map(item => (
                        <BasketItem 
                            id={item.id}
                            title={item.title}
                            image={item.image}
                            price={item.price}
                            rating={item.rating}
                            quantity={item.quantity}
                        />
                    ))}
                </div>
                <div className='payment'>
                    <div class="payment-summary">
                        <div class="payment-summary-title">
                            Order Summary
                        </div>

                        <div class="payment-summary-row">
                            <div>Items ({basket.length}):</div>
                            <div class="payment-summary-money">${formatCurrency(itemsPrice)}</div>
                        </div>

                        <div class="payment-summary-row">
                            <div>Shipping &amp; handling:</div>
                            <div class="payment-summary-money">$4.99</div>
                        </div>

                        <div class="payment-summary-row subtotal-row">
                            <div>Total before tax:</div>
                            <div class="payment-summary-money">$47.74</div>
                        </div>

                        <div class="payment-summary-row">
                            <div>Estimated tax (10%):</div>
                            <div class="payment-summary-money">$4.77</div>
                        </div>

                        <div class="payment-summary-row total-row">
                            <div>Order total:</div>
                            <div class="payment-summary-money">$52.51</div>
                        </div>

                        <button class="place-order-button button-primary">
                            Place your order
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Basket
