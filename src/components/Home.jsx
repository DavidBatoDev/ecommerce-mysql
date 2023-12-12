import React, {useState, useEffect} from 'react'
import Products from './Products';
import DecemberBanner from '../assets/images/DecemberBanner.png'
import '../styles/Home.css'

function Home() {
    const [products, setProducts] = useState([])

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://fakestoreapi.com/products')
                const json = await response.json()
                setProducts(json)
            } catch (error) {
                console.log(error)
            }
        };
        fetchProducts()
    }, [])

    Array.prototype.render2Items = function(callback) {
        const items = [];
        for (let i = 0; i < 2; i++) {
            if (this[i]) {
                items.push(callback(this[i], i, this));
            }
        }
        return items;
      }
      
      Array.prototype.render3Items = function(callback) {
        const items = [];
        for (let i = 2; i < 5; i++) {
            if (this[i]) {
                items.push(callback(this[i], i, this));
            }
        }
        return items;
      }
      
      Array.prototype.render1Item = function(callback) {
        const items = [];
        for (let i = 5; i < 6; i++) {
            if (this[i]) {
                items.push(callback(this[i], i, this));
            }
        }
        return items;
      }

      Array.prototype.renderTheRest = function(callback) {
        const items = [];
        for (let i = 6; i < this.length; i++) {
            if (this[i]) {
                items.push(callback(this[i], i, this));
            }
        }
        return items;
      }


  return (
    <div className='home'>
        <div className='home--category'>
            <span>All</span>
            <span>Mens Clothing</span>
            <span>Womens Clothing</span>
            <span>Jewelery</span>
            <span>Electronics</span>
        </div>
        <div className='home--container'>
            <img 
            className='home--image'
            src={DecemberBanner} 
            alt="banner" />
            <div className='home--row'>
                {products.render2Items((product) => (
                    <Products
                    key={product.id}
                    id={product.id}
                    title={product.title}
                    price={product.price}
                    image={product.image}
                    rating={product.rating.rate}
                    />
                ))}
            </div>
            <div className='home--row'>
                {products.render3Items((product) => (
                    <Products
                    key={product.id}
                    id={product.id}
                    title={product.title}
                    price={product.price}
                    image={product.image}
                    rating={product.rating}
                    />
                ))}
            </div>
            <div className='home--row'>
                {products.render1Item((product) => (
                    <Products
                    key={product.id}
                    id={product.id}
                    title={product.title}
                    price={product.price}
                    image={product.image}
                    rating={product.rating}
                    />
                ))}
            </div>
            <div className='home--rest'>
                {products.renderTheRest((product) => (
                    <Products
                    key={product.id}
                    id={product.id}
                    title={product.title}
                    price={product.price}
                    image={product.image}
                    rating={product.rating}
                    />
                ))}
            </div>
        </div>
    </div>
  )
}

export default Home
