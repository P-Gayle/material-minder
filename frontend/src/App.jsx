import AddSupplies from './components/AddSupplies/AddSupplies'
import EditSupplies from './components/EditSupplies/EditSupplies'
import SuppliesList from './components/suppliesList/SuppliesList'
import UpdateQuantity from './components/UpdateQuantity/UpdateQuantity'
import SupplyDetails from './components/SupplyDetails/SupplyDetails'
import SignUp from './components/Auth/SignUp'
import SignIn from './components/Auth/SignIn'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from './components/navbar/NavBar'
import Home from './components/home/Home'
import Protected from './components/Auth/Protected'
import './App.css'
import { useState, useEffect } from 'react'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => { 
    const loginStatus = localStorage.getItem("login")
    setIsLoggedIn(loginStatus !== null && loginStatus !== "")
  }, [])


  return (
    <>
      <div className='app'>
        <BrowserRouter>
        <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/list" element={<Protected Component={SuppliesList} />} />
            <Route path="/add" element={<Protected Component={AddSupplies} />} />
            <Route path="/supply/:id/edit" element={<EditSupplies/>}/>
            <Route path="/supply/:id/quantity" element={<UpdateQuantity />} />
            <Route path="/supply/:id/details" element={<SupplyDetails />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn setIsLoggedIn={setIsLoggedIn}/>} />
          </Routes>
        </BrowserRouter>      
      </div>
    </>
  )
}

export default App
