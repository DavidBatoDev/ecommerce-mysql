import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LogoDark from "../assets/Logo/Logo-Dark.png"
import '../styles/SignUp.css'
import Error from './ErrorModal'
import axios from 'axios'

function SignUp() {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const signUp = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('api/users/register', {
                username,
                email,
                password
            })
            if (res.status !== 201) {
                setError(res.data.message)
            }
            navigate('/sign-in')
        }catch (error) {
            const errorMessage = error.response.data.message;
            setError(errorMessage)
        }
    }


    return (
    <div>
        {error && <Error errorMsg={error} clearError={()=>setError('')} />}
        <div className='signup'>
            <Link to='/'>
                <img className='signup-logo' src={LogoDark} alt="" />
            </Link>
            <div className='signup--container'>
                <h1>Sign Up</h1>
                <form action="">
                    <label htmlFor="">
                        <h5>Username</h5>
                        <input placeholder='Username' value={username} onChange={e => setUsername(e.target.value)} type="text" />
                    </label>

                    <label htmlFor="">
                        <h5>Email</h5>
                        <input placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} type="text" />
                    </label>

                    <label htmlFor="">
                        <h5>Password</h5>
                        <input placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} type="password" />
                    </label>
                    <button onClick={signUp} className='signup--signupButton'>Sign Up</button>
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
