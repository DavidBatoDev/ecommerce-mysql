// src/components/Header.jsx
import React from 'react';
import LogoDark from '../assets/Logo/Logo-Dark.png';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import PersonIcon from '@mui/icons-material/Person';
import '../styles/Header.css';
import { Link, useParams } from 'react-router-dom';
import { useStateValue } from '../context/StateProvider';
import useLocalStorage from '../hooks/useLocalStorage';
import { useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();
    const [{ basket, user }, dispatch] = useStateValue();
    const { category } = useParams();
    const [localAuth, setLocalAuth] = useLocalStorage('authToken', null);
    const [localBasket, setLocalBasket] = useLocalStorage('basket', []);
    const [localUser, setLocalUser] = useLocalStorage('user', null);

    const handleAuthentication = () => {
        dispatch({
            type: 'SET_USER',
            user: null
        });
        dispatch({
            type: 'EMPTY_CART'
        });
        setLocalUser(null);
        setLocalAuth(null);
        setLocalBasket([]);
    };

    const itemsQuantity = basket.reduce((total, item) => total + item.quantity, 0);

    return (
        <header className='header'>
            <div className='header--container'>
                <Link to="/" className="header--logoContainer">
                    <img className='header--logo' src={LogoDark} alt="logo" />
                </Link>
                <div className="header--search">
                    <input
                        className='header--searchInput'
                        type="text"
                        placeholder={category ? `Search item in ${category}` : "Search"}
                    />
                    <button className="header--searchButton">
                        <SearchIcon className='header--searchIcon' />
                    </button>
                </div>
                <div className="header--nav">
                    {user ? (
                        <Link to="/profile" className="header--navLink">
                            <div className="header--options header--profile">
                                <span className='header--optionsLineOne'>Hello {user.email.split("@")[0]}</span>
                                <div className="header--profileDetails">
                                    <span className='header--optionsLineTwo'>Profile</span>
                                    <PersonIcon className='header--profileIcon' />
                                </div>
                            </div>
                        </Link>
                    ) : (
                        <Link to='/sign-in' className="header--navLink">
                            <div className="header--options">
                                <span className='header--optionsLineOne'>Hello Guest</span>
                                <span className='header--optionsLineTwo'>Sign In</span>
                            </div>
                        </Link>
                    )}
                    <Link to='/profile' className="header--navLink">
                        <div className="header--options">
                            <span className='header--optionsLineOne'>Returns</span>
                            <span className='header--optionsLineTwo'>& Orders</span>
                        </div>
                    </Link>
                    <Link to='/basket' className="header--navLink">
                        <div className="header--optionBasket">
                            <ShoppingBasketIcon />
                            <span className='header--basketCount'>{itemsQuantity}</span>
                        </div>
                    </Link>
                </div>
            </div>
        </header>
    );
}

export default Header;
