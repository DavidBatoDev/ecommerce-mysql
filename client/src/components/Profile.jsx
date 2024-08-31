// src/components/Profile.jsx
import React, { useEffect, useState } from 'react';
import { useStateValue } from '../context/StateProvider';
import axios from 'axios';
import '../styles/Profile.css';

function Profile() {
    const [{ user }, dispatch] = useStateValue();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            if (user) {
                try {
                    const token = JSON.parse(localStorage.getItem('ecom_authToken'));
                    const response = await axios.get('/api/orders', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    console.log('orders:', response.data);
                    setOrders(response.data);
                } catch (error) {
                    console.error('Error fetching orders:', error);
                }
            }
        };
        fetchOrders();
    }, [user]);

    const handleSignOut = () => {
        // Clear user data and token
        localStorage.removeItem('ecom_authToken');
        dispatch({
            type: 'SET_USER',
            user: null,
        });
        window.location.href = '/sign-in';
    };

    console.log('orders:', orders);

    return (
        <div className="profile">
            <div className="profile--header">
                <h1>Your Profile</h1>
                <button onClick={handleSignOut} className="signout-button">Sign Out</button>
            </div>
            <div className="profile--info">
                <h2>{user?.email}</h2>
                <p>View and manage your orders below</p>
            </div>
            <div className="profile--orders">
                <h2>Your Orders</h2>
                {orders.length === 0 ? (
                    <p>You have no orders yet.</p>
                ) : (
                    <div className="orders--list">
                        {orders.map(order => (
                            <div key={order.id} className="order--card">
                                <p><strong>Order ID:</strong> {order.id}</p>
                                <p><strong>Date:</strong> {new Date(order.order_date).toLocaleString()}</p>
                                <p><strong>Total:</strong> ${order.total_amount}</p>
                                <div className="order--items">
                                    {order.items && order.items.length > 0 ? (
                                        order.items.map(item => (
                                            <div key={item.id} className="order--item">
                                                <p>{item.name}</p>
                                                <p>Qty: {item.quantity}</p>
                                                <p>Price: ${item.price}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <p>No items in this order.</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Profile;
