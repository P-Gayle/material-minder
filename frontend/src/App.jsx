import AddSupplies from './components/AddSupplies'
import EditSupplies from './components/EditSupplies'
import SuppliesList from './components/SuppliesList'
import UpdateQuantity from './components/UpdateQuantity'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import './App.css'

function App() {

  return (
    <>
      <div className='app'>
        <BrowserRouter>
        <NavBar/>
          <Routes>
            <Route path="/" element={<SuppliesList />} />
            <Route path="/add" element={<AddSupplies />} />
            <Route path="/supply/:id/edit" element={<EditSupplies/>}
            />
            <Route path="/supply/:id/quantity" element={<UpdateQuantity />} />
          </Routes>
        </BrowserRouter>      
      </div>
    </>
  )
}

export default App
