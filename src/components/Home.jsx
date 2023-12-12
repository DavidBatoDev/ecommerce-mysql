import React, {useState, useEffect} from 'react'
import Products from './Products';
import DecemberBanner from '../assets/images/DecemberBanner.png'
import '../styles/Home.css'
import { useParams } from 'react-router-dom';

function Home() {
    const [products, setProducts] = useState([])

    const { category } = useParams();

    const categoryMap = {
        'mens-clothing': 'men\'s clothing',
        'womens-clothing': 'women\'s clothing',
        'jewelery': 'jewelery',
        'electronics': 'electronics',
    };
    
    
    console.log(products.map((product) => product.category));

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                let url = 'https://fakestoreapi.com/products';
                if (category) {
                    const apiCategory = categoryMap[category];
                    if (apiCategory) {
                        url += `/category/${apiCategory}`;
                    }
                }
                const response = await fetch(url);
                const json = await response.json();
                setProducts(json);
            } catch (error) {
                console.log(error);
            }
        };
        fetchProducts();
    }, [category]);

    function renderItems(array, start, end, callback) {
        const items = [];
        for (let i = start; i < end; i++) {
            if (array[i]) {
                items.push(callback(array[i], i, array));
            }
        }
        return items;
    }


  return (
    <div className='home'>
        <div className='home--container'>
            <img 
            className='home--image'
            src={DecemberBanner} 
            alt="banner" />
            <div className='home--row'>
                {renderItems(products, 0, 2, (product) => (
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
                {renderItems(products, 2, 5, (product) => (
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
                {renderItems(products, 5, 6, (product) => (
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
            <div className='home--rest'>
                {renderItems(products, 6, products.length, (product) => (
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
        </div>
    </div>
  )
}

export default Home
