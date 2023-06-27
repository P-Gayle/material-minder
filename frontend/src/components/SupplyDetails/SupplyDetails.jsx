import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import './SupplyDetails.css'

const SupplyDetails = () => {
    const { id } = useParams()
  const [supply, setSupply] = useState([])

      
    useEffect(() => {
    const fetchSupply = async () => {
      try {
        const response = await axios.get(`http://localhost:80/material-minder/api/supply/${id}/details`)
        // console.log(response.data)
        setSupply(response.data);
      } catch (error) {
      console.error(error);
      throw new Error('Failed to get this supply product');
      }
    }
    fetchSupply();
    }, [])
    
    return (
      <>
        <div className="supply-details">
           
            <div className="supply-image"> {supply.image ?
            (<img src={`http://localhost:80/material-minder/api/${supply.image}`} alt="item image" style={{ width: '300px' }} />) : "No image"}</div>
          <div className="info">
            <header><h1>{supply.name}</h1></header>
            <div><span>Colour: </span>{supply.colour}</div>
            <div><span>Storage Location:</span> {supply.location}</div>
            <div><span>Supplier: </span>{supply.supplier}</div>
            <div><span>Total Amount Purchased: </span>{supply.total_purchased} units</div>
            <div><span>Total Amount Used: </span>{supply.total_used}</div>
            <div><span>Amount Available: </span>{supply.total_purchased - supply.total_used}</div>   
          
          <div className='edit-details'><Link to={`/supply/${supply.id}/edit`}>Edit item details</Link></div>
          </div>
        
        </div>
         <div className='note'>Notes:<br></br>{supply.notes}</div>
        </>
    )
}

export default SupplyDetails