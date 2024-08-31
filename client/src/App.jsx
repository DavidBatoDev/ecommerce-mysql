import React, {useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Basket from './components/Basket';
import Payment from './components/Payment';
import ProductView from './components/ProductView';
import Profile from './components/Profile'; // Import Profile component
import { useStateValue } from './context/StateProvider';
import useLocalStorage from './hooks/useLocalStorage';

function App() {
    const [{ user, basket }, dispatch] = useStateValue();
    const [localUser, setLocalUser] = useLocalStorage('user', null);
    const [localBasket, setLocalBasket] = useLocalStorage('basket', []);

    useEffect(() => {
        const token = localStorage.getItem('ecom_authToken');
        if (token) {
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            if (decodedToken.exp * 1000 < Date.now()) {
                localStorage.removeItem('ecom_authToken');
                dispatch({
                    type: 'SET_USER',
                    user: null,
                });
            }
        }
    }, []);

    useEffect(() => {
        if (localUser?.email) {
            dispatch({
                type: 'SET_USER',
                user: localUser,
            });
        }
        if (localBasket.length > 0) {
            localBasket.forEach(item => {
                dispatch({
                    type: 'ADD_TO_CART',
                    item,
                });
            });
        }
    }, []);

    useEffect(() => {
        if (user) {
            setLocalUser(user);
        } else {
            setLocalUser(null);
        }
        if (basket.length > 0) {
            setLocalBasket(basket);
        } else {
            setLocalBasket([]);
        }
    }, [user, basket]);

    return (
        <>
            <Router>
                <Routes>
                    <Route path='/' element={<><Header /><Home /></>} />
                    <Route path='/:category' element={<><Header /><Home /></>} />
                    <Route path="/sign-in" element={<SignIn />} />
                    <Route path="/sign-up" element={<SignUp />} />
                    <Route path="/basket" element={<><Header /><Basket /></>} />
                    <Route path="/payment" element={<><Header /><Payment /></>} />
                    <Route path="/product/:id" element={<><Header /><ProductView /></>} />
                    <Route path="/profile" element={<><Header /><Profile /></>} /> {/* Profile Route */}
                </Routes>
            </Router>
        </>
    );
}

export default App;
