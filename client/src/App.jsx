import { useEffect } from "react"
import Header from "./components/Header"
import Home from "./components/Home"
import SignIn from "./components/SignIn"
import SignUp from "./components/SignUp"
import Basket from "./components/Basket"
import ProductView from "./components/ProductView"
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'
import { useStateValue } from "./context/StateProvider"
import Payment from "./components/Payment"
import useLocalStorage from "./hooks/useLocalStorage"

function App() {
  const [{ user, basket }, dispatch] = useStateValue()
  const [localUser, setLocalUser] = useLocalStorage('user', null)
  const [localBasket, setLocalBasket] = useLocalStorage('basket', [])

  // on initial render, check if there is a user or basket in local storage
  useEffect(() => {
    console.log('localUser:', localUser)
    console.log('localBasket:', localBasket)
    if (localUser?.email) {
      dispatch({
        type: 'SET_USER',
        user: localUser
      })
    }
    if (localBasket.length > 0) {
      localBasket.forEach(item => {
        dispatch({
          type: 'ADD_TO_CART',
          item
        })
      })
    }
  }, [])

  // whenever user or basket changes, update localUser or localBasket
  useEffect(() => {
    if (user) {
      setLocalUser(user)

    } else {
      setLocalUser(null)
    }
    if (basket.length > 0) {
      setLocalBasket(basket)
    } else {
      setLocalBasket([])
    }
  }, [user, basket])

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<><Header /><Home /></>} />
        <Route path='/:category' element={<><Header /><Home /></>} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/basket" element={<><Header /><Basket /></>} />
        <Route path="/payment" element={<><Header/><Payment /></>} />
        <Route path="/product/:id" element={<><Header /><ProductView /></>} /> {/* Updated */}
      </Routes>
    </Router>
    </>
  )
}

export default App
