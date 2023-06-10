import AddSupplies from './components/AddSupplies'
import EditSupplies from './components/EditSupplies'
import SuppliesList from './components/SuppliesList'
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
            <Route path="/:id/edit" element={<EditSupplies/>}/>
          </Routes>
        </BrowserRouter>
        

      </div>
    </>
  )
}

export default App
