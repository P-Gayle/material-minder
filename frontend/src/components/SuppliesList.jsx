import { useEffect, useState } from "react";
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';  
import { Table } from 'react-bootstrap';  
import { Link } from "react-router-dom";

const SuppliesList = () => {

  const [supplies, setSupplies] = useState([])

  const getSupplies = async () => {
    const response = await axios.get('http://localhost:80/material-minder/api/supplies/')
    try {
        console.log(response.data);
        setSupplies(response.data);
        } catch (error) {
          console.error(error);
          throw new Error('Failed to get supplies');
        }  
    }
 
  useEffect(() => {
    getSupplies()   
  }, [])

  const deleteSupply = (id) => {
    axios.delete(`http://localhost:80/material-minder/api/supply/${id}/delete`)
      .then(function (response) {
      console.log(response.data)
      getSupplies()
    })
  }
 
  return (
    <div>
      <h1>Supplies List</h1>  
      <div className='p-5'>  
        <Table striped bordered hover>  
          <thead>  
            <tr>  
              <th>#</th>  
              <th>Item Name</th>
              <th>Price per unit</th>
              <th>Item Type</th> 
              <th>Colour</th>
              <th>Amount Available</th>
              <th>Storage Location</th>
              <th>Supplier</th> 
              <th>Actions</th>        
            </tr>  
          </thead>  
          <tbody>  
            {supplies.map((supply, key) => 
              <tr key={key}>
                <td>{supply.id}</td>
                <td>{supply.name}</td>
                <td>{supply.price}</td>
                <td>{supply.type}</td>
                <td>{supply.colour}</td>
                <td>{supply.quantity}</td>
                <td>{supply.location}</td>
                <td>{supply.supplier}</td>
                <td>
                  <Link to={`/supply/${supply.id}/edit`}> Edit</Link>
                  <button onClick={() => deleteSupply(supply.id)}>Delete</button>
                </td>
              </tr>
            )} 
          </tbody>  
        </Table>  
      </div>
    </div>
  )
}

export default SuppliesList

