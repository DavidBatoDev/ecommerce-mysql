import React from 'react'
import Logo from '../assets/Logo/logo.png'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import '../styles/Header.css'
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className="header">
        <div className='header--container'>
            <img className='header--logo' src={Logo} alt="logo" />
            <div className="header--search">
                <input className='header--searchInput' type="text" placeholder='search' />
                <SearchIcon className='header--searchIcon' />
            </div>
            <div className="header--nav">
                <div className="header--options">
                    <span className='header--optionsLineOne'>Hello Guest</span>
                    <span className='header--optionsLineTwo'>Sign In</span>
                </div>
                <div className="header--options">
                    <span className='header--optionsLineOne'>Returns</span>
                    <span className='header--optionsLineTwo'>& Orders</span>
                </div>
                <div className="header--optionsBasket">
                    <ShoppingBasketIcon />
                    <span className='header--optionsLineTwo header--basketCount'>0</span>
                </div>
            </div>
        </div>
        <div className='home--category'>
            <Link to='/'>
                <span className='category--button'>All</span>
            </Link>
            <Link to='/mens-clothing'>
                <span className='category--button'>Mens Clothing</span>
            </Link>
            <Link to='/womens-clothing'>
                <span className='category--button'>Womens Clothing</span>
            </Link>
            <Link to='/jewelery'>
                <span className='category--button'>Jewelery</span>
            </Link>
            <Link to='/electronics'>
                <span className='category--button'>Electronics</span>
            </Link>
        </div>
    </div>
  )
}

export default Header
