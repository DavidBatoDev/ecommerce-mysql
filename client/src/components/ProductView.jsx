import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/ProductView.css'; // Import a separate CSS file for styling
import { FaStar, FaHeart } from 'react-icons/fa';
import { BiShoppingBag } from 'react-icons/bi';
import { useStateValue } from '../context/StateProvider';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ProductView() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [{user, basket}, dispatch] = useStateValue();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [error, setError] = useState(null);

  const addToCart = async () => {
    try {
        if (user?.email) {
            const token = JSON.parse(localStorage.getItem('ecom_authToken'));
            if (!token) {
                console.log('no token');
                return setError('You need to be logged in to add items to cart');
            }

            // Make sure the endpoint is correct
            const res = await axios.post('/api/cart/add', {
                productId: product.id,
                quantity
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (res.status !== 201) {
                console.log('error:', res.data.message);
                setError(res.data.message);
                return;
            }
        }

        // Add to local cart regardless of authentication
        dispatch({
            type: 'ADD_TO_CART',
            item: {
                id: product.id,
                name: product.name,
                image: product.image,
                description: product.description,
                price: product.price,
                quantity: quantity,
                isSelected: true
            }
        });

        navigate('/basket');
    } catch (error) {
        console.log('Error adding to cart:', error);
        setError('Error adding to cart: ' + (error.response?.data?.message || error.message));
    }
}

const handleQuantityChange = (e) => {
    setQuantity(+e.target.value)
}

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/product/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div className="loading">Loading...</div>;
  }

  const handleAddToBasket = () => {
    addToCart();
  };

  return (
    <>
    <div className="product-view">
      <div className="product-view__left">
        <div className="product-view__image">
          <img src={product.image} alt={product.name} />
        </div>
      </div>
      <div className="product-view__right">
        <h1 className="product-view__title">{product.name}</h1>
        <div className="product-view__rating">
          {[...Array(5)].map((star, index) => (
            <FaStar key={index} color={index < 4 ? "#FFD700" : "#DDD"} />
          ))}
          <span className="product-view__reviews">(125 reviews)</span>
        </div>
        <p className="product-view__price">${product.price}</p>
        <p className="product-view__description">{product.description}</p>

        <div className="product-view__action">
          <div className="product-view__quantity">
            <label htmlFor="quantity">Quantity:</label>
            <input 
              type="number" 
              id="quantity" 
              value={quantity} 
              onChange={handleQuantityChange} 
              min="1" 
              max="10" 
            />
          </div>
          <button className="add-to-basket-button" onClick={handleAddToBasket}>
            <BiShoppingBag className="icon" /> Add to Basket
          </button>
        </div>
      </div>
    </div>

    <div className="product-view__info-tabs">
      <button className="tab active">Product Details</button>

      <div className="tab-content">
        <p>{product.description}</p>
      </div>
    </div>
    </>
  );
}

export default ProductView;
