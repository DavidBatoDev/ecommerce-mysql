import Header from "./components/Header"
import Home from "./components/Home"
import SignIn from "./components/SignIn"
import SignUp from "./components/SignUp"
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'


function App() {

  

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<><Header /><Home /></>} />
        <Route path='/:category' element={<><Header /><Home /></>} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
