// src/components/OrderDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/OrderDetails.css';

function OrderDetails() {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const token = JSON.parse(localStorage.getItem('ecom_authToken'));
                const response = await axios.get(`/api/orders/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setOrder(response.data.order);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching order details:', error);
                setError('Error fetching order details');
                setLoading(false);
            }
        };

        fetchOrderDetails();
    }, [id]);

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="order-details">
            <h1>Order Details</h1>
            {order ? (
                <div className="order-details--container">
                    <div className="order-summary">
                        <p><strong>Order ID:</strong> {order.id}</p>
                        <p><strong>Date:</strong> {new Date(order.order_date).toLocaleString()}</p>
                        <p><strong>Total Amount:</strong> ${order.total_amount}</p>
                        <p><strong>Payment Method:</strong> {order.payment_method}</p>
                        <p><strong>Delivery Address:</strong> {order.delivery_street}, {order.delivery_city}, {order.delivery_state}</p>
                    </div>
                    <h2>Items in this order:</h2>
                    <div className="order-items">
                        {order.items && order.items.length > 0 ? (
                            order.items.map(item => (
                                <div key={item.id} className="order-item">
                                    <Link to={`/product/${item.product_id}`}>
                                        <img src={item.image} alt={item.name} className="order-item--image" />
                                    </Link>
                                    <div className="order-item--details">
                                        <p><strong>Product:</strong> {item.name}</p>
                                        <p><strong>Quantity:</strong> {item.quantity}</p>
                                        <p><strong>Price:</strong> ${item.price}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No items in this order.</p>
                        )}
                    </div>
                </div>
            ) : (
                <p>No order found with this ID.</p>
            )}
        </div>
    );
}

export default OrderDetails;
