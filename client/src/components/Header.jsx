import React from 'react';
import LogoDark from '../assets/Logo/Logo-Dark.png';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import '../styles/Header.css';
import { Link, useParams } from 'react-router-dom';
import { useStateValue } from '../context/StateProvider';
import useLocalStorage from '../hooks/useLocalStorage';

function Header() {
    const [{ basket, user }, dispatch] = useStateValue();
    const { category } = useParams(); // Destructure category directly
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
        <div className='header'>
            <div className='header--container'>
                <Link to="/">
                    <img className='header--logo' src={LogoDark} alt="logo" />
                </Link>
                <div className="header--search">
                    <input className='header--searchInput' type="text" placeholder={category ? `Search item in ${category}` : "Search"} />
                    <SearchIcon className='header--searchIcon' />
                </div>
                <div className="header--nav">
                    {user ? (
                        <div onClick={handleAuthentication} className="header--options">
                            <span className='header--optionsLineOne'>Hello {user.email.split("@")[0]}</span>
                            <span className='header--optionsLineTwo'>Sign Out</span>
                        </div>
                    ) : (
                        <Link to='/sign-in'>
                            <div className="header--options">
                                <span className='header--optionsLineOne'>Hello Guest</span>
                                <span className='header--optionsLineTwo'>Sign In</span>
                            </div>
                        </Link>
                    )}
                    <div className="header--options">
                        <span className='header--optionsLineOne'>Returns</span>
                        <span className='header--optionsLineTwo'>& Orders</span>
                    </div>
                    <Link to='/basket'>
                        <div className="header--optionBasket">
                            <ShoppingBasketIcon />
                            <span className='header--basketCount'>{itemsQuantity}</span>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Header;
