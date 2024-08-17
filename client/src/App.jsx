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
import { useStateValue } from "./context/StateProvider"
import Payment from "./components/Payment"

function App() {
  const [{ user }, dispatch] = useStateValue();

  console.log(user)

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
      </Routes>
    </Router>
    </>
  )
}

export default App
