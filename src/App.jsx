import { useEffect } from "react"
import Header from "./components/Header"
import Home from "./components/Home"
import SignIn from "./components/SignIn"
import SignUp from "./components/SignUp"
import Basket from "./components/Basket"
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'
import { auth } from "./Firebase"
import { onAuthStateChanged } from "firebase/auth"
import { useStateValue } from "./context/StateProvider"

function App() {
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch ({
          type: 'SET_USER',
          user: user
        })
      } else {
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    });
  }, [user])

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<><Header /><Home /></>} />
        <Route path='/:category' element={<><Header /><Home /></>} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/basket" element={<><Header /><Basket /></>} />
      </Routes>
    </Router>
    </>
  )
}

export default App
