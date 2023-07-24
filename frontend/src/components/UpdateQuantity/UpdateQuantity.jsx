import React from 'react'
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';
import './updateQuantity.css'
import Button from 'react-bootstrap/Button';
import axios from 'axios'

const UpdateQuantity  = () => {
    const navigate = useNavigate()
    const [inputs, setInputs] = useState([])
    const {id} = useParams()
  
  useEffect(() => {
    const fetchSupply = async () => {
      try {
        const response = await axios.get(`http://localhost:80/material-minder/api/supply/${id}`)
        // console.log(response.data)
        setInputs(response.data);
      } catch (error) {
      console.error(error);
      throw new Error('Failed to get this supply product');
      }
    }
    fetchSupply();
  }, [])

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
}
  
const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(`http://localhost:80/material-minder/api/supply/${id}/quantity`,
        {
             ...inputs,
        total_purchased: parseInt(inputs.purchased) || 0,
        total_used: parseInt(inputs.used) || 0

        }
      )
      console.log(response.data)
      navigate('/list')
    } catch (error) {
      console.error(error);
      throw new Error('Failed to edit the supply product');
    }
  }

  return (
   <div>
      <h1 className='edit-h1'>Update Quantity</h1>
      <div className='update'>
           
        <p className='productNameHeader'>{inputs.name}</p>
        
        <Form onSubmit={handleSubmit}>

          <Form.Group>
            <Form.Label>Quantity Purchased:</Form.Label>
            <Form.Control
              type="number"
              name="purchased"
              onChange={handleChange}/>
          </Form.Group>
               
            <Form.Group>
            <Form.Label>Quantity Used:</Form.Label>
            <Form.Control
              type="number"
              name="used"
              onChange={handleChange}/>
          </Form.Group>
          
          <Button className='edit-btn' type="submit">
            Save
          </Button>
        </Form>
      </div>
    </div>
  )
  }

export default UpdateQuantity