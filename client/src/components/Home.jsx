import React, { useState, useEffect } from 'react';
import Products from './Products';
import DecemberBanner from '../assets/images/DecemberBanner.png';
import '../styles/Home.css';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Popup from './Popup'; 

function Home() {
    const [products, setProducts] = useState([]);
    const { category } = useParams();
    const [categories, setCategories] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAllCatergories = async () => {
            try {
                const response = await fetch('api/products/categories');
                const json = await response.json();
                setCategories(json);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchAllCatergories();
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                let url = 'api/products';
                if (category) {
                    url += `?category=${category}`;
                }
                const response = await fetch(url);
                const json = await response.json();
                setProducts(json);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, [category]);

    // Handle window resize event
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    function renderItems(array, start, end, callback) {
        const items = [];
        for (let i = start; i < end; i++) {
            if (array[i]) {
                items.push(callback(array[i], i, array));
            }
        }
        return items;
    }

    // for responsive design, getting the number of products to display in each row
    const getProductCount = () => {
        if (windowWidth < 600) return [2, 4, 6, products.length];
        if (windowWidth < 900) return [2, 4, 6, products.length];
        return [2, 5, 6, products.length];
    };

    const [firstCount, secondCount, thirdCount, maxCount] = getProductCount();


    return (
        <div className='home'>
            <div className='home--category'>
                <div>
                    <Link to={`/`}>
                        <span className={`category--button ${category === '' ? 'selected' : ''}`}>All</span>
                    </Link>
                    {categories.slice(0, 3).map((categoryItem) => (
                        <Link to={`/${categoryItem}`} key={categoryItem}>
                            <span className={`category--button ${category === categoryItem ? 'selected' : ''}`}>{categoryItem}</span>
                        </Link>
                    ))}
                </div>
                {categories.length > 3 && (
                    <>
                        <MoreHorizIcon 
                            className="more-icon" 
                            onClick={() => setIsPopupOpen(true)} 
                        />
                        {isPopupOpen && (
                            <Popup 
                                categories={categories.slice(3)} 
                                selectedCategory={category}
                                onClose={() => setIsPopupOpen(false)}
                                onCategoryClick={(categoryItem) => {
                                    setIsPopupOpen(false);
                                    // handle navigation to selected category
                                    navigate(`/${categoryItem}`); // Use navigate for navigation
                                }}
                            />
                        )}
                    </>
                )}
            </div>
            <div className='home--class'>
                <div className='home--container'>
                    <img className='home--image' src={DecemberBanner} alt="banner" />
                    <div className='home--row'>
                        {renderItems(products, 0, firstCount, (product) => (
                            <Products
                                key={product.id}
                                id={product.id}
                                name={product.name}
                                price={product.price}
                                image={product.image}
                                description={product.description}
                            />
                        ))}
                    </div>
                    <div className='home--row'>
                        {renderItems(products, firstCount, secondCount, (product) => (
                            <Products
                                key={product.id}
                                id={product.id}
                                name={product.name}
                                price={product.price}
                                image={product.image}
                                description={product.description}
                            />
                        ))}
                    </div>
                    <div className='home--row'>
                        {renderItems(products, secondCount, thirdCount, (product) => (
                            <Products
                                key={product.id}
                                id={product.id}
                                name={product.name}
                                price={product.price}
                                image={product.image}
                                description={product.description}
                            />
                        ))}
                    </div>
                    <div className='home--rest'>
                        {renderItems(products, thirdCount, maxCount, (product) => (
                            <Products
                                key={product.id}
                                id={product.id}
                                name={product.name}
                                price={product.price}
                                image={product.image}
                                description={product.description}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
