import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import LogoDark from "../assets/Logo/Logo-Dark.png"
import '../styles/SignUp.css'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../Firebase'

function SignUp() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const signUp = e => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user)
                navigate('/')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorCode, errorMessage)
            });
    }

    return (
    <div>
        <div className='signup'>
            <Link to='/'>
                <img className='signup-logo' src={LogoDark} alt="" />
            </Link>
            <div className='signup--container'>
                <h1>Sign Up</h1>
                <form action="">
                    <label htmlFor="">
                        <h5>Email</h5>
                        <input value={email} onChange={e => setEmail(e.target.value)} type="text" />
                    </label>

                    <label htmlFor="">
                        <h5>Password</h5>
                        <input value={password} onChange={e => setPassword(e.target.value)} type="password" />
                    </label>
                    <button onClick={signUp} className='signup--signUpButton'>Sign Up</button>
                </form>
                <span className='signIn-notice'>Already have an account?</span>
                <Link to='/sign-in'>
                    <p className='signIn-navigate'>Sign In?</p>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default SignUp
