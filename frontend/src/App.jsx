import AddSupplies from './components/AddSupplies/AddSupplies'
import EditSupplies from './components/EditSupplies/EditSupplies'
import SuppliesList from './components/SuppliesList/SuppliesList'
import UpdateQuantity from './components/UpdateQuantity/UpdateQuantity'
import SupplyDetails from './components/SupplyDetails/SupplyDetails'
import SignUp from './components/Auth/SignUp'
import SignIn from './components/Auth/SignIn'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from './components/navbar/NavBar'
import Home from './components/home/Home'
import Protected from './components/Auth/Protected'
import './App.css'

function App() {

  return (
    <>
      <div className='app'>
        <BrowserRouter>
        <NavBar/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/list" element={<Protected Component={SuppliesList} />} />
            <Route path="/add" element={<Protected Component={AddSupplies} />} />
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
