import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LogoDark from '../assets/Logo/Logo-dark.png'
import '../styles/Signin.css'

function Signin() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const signIn = e => {
        e.eventPropagation();
    }

    return (
        <div className='signin'>
            <Link to='/'>
                <img className='signin-logo' src={LogoDark} alt="" />
            </Link>
            <div className='signin--container'>
                <h1>Sign in</h1>
                <form action="">
                    <label htmlFor="">
                        <h5>Email</h5>
                        <input value={email} onChange={e => setEmail(e.target.value)} type="text" />
                    </label>

                    <label htmlFor="">
                        <h5>Password</h5>
                        <input value={password} onChange={e => setPassword(e.target.value)} type="password" />
                    </label>
                    <button onClick={signIn} className='signin--signInButton'>Sign In</button>
                </form>

                <p>
                    By signing-in you agree to Demo Ecommerce App's
                    Conditions of Use & Sale, Please see our Privacy Notice, 
                    our Cookies Notice and our interest-Based Ads Notice
                </p>


                <button className='signin--registerButton'>Create Account</button>
            </div>
        </div>
    )
}

export default Signin
