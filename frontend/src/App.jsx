import AddSupplies from './components/AddSupplies'
import EditSupplies from './components/EditSupplies'
import SuppliesList from './components/SuppliesList'
import UpdateQuantity from './components/UpdateQuantity'
import SupplyDetails from './components/SupplyDetails/SupplyDetails'
import SignUp from './components/Auth/SignUp'
import SignIn from './components/Auth/SignIn'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Home from './components/Home'
import './App.css'

function App() {

  return (
    <>
      <div className='app'>
        <BrowserRouter>
        <NavBar/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/list" element={<SuppliesList />} />
            <Route path="/add" element={<AddSupplies />} />
            <Route path="/supply/:id/edit" element={<EditSupplies/>}/>
            <Route path="/supply/:id/quantity" element={<UpdateQuantity />} />
            <Route path="/supply/:id/details" element={<SupplyDetails />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
          </Routes>
        </BrowserRouter>      
      </div>
    </>
  )
}

export default App
