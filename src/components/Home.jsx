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

    const productsList = products.map(product => product.category)
    console.log(productsList)

  return (
    <div className='home'>
        <div className='home--container'>
            <img 
            className='home--image'
            src={DecemberBanner} 
            alt="banner" />
        </div>
        <div className='home-row'>
        </div>
        <div className='home-row'></div>
        <div className='home-row'></div>
    </div>
  )
}

export default Home
