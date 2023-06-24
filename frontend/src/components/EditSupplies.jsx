import React from 'react'
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import axios from 'axios'

function EditSupplies() {
  
  const navigate = useNavigate()
  const [inputs, setInputs] = useState([])
  const {id} = useParams()
  
  useEffect(() => {
    // getUsers()
      axios.get(`http://localhost:80/material-minder/api/supply/${id}`)
      .then(response => {
        console.log(response.data);
        setInputs(response.data);

      })
      .catch(error => {
      console.log(error)
    })
  }, [])

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  //to prevent refresh when submitted
  const handleSubmit = (event) => {
    event.preventDefault();

    axios.put(`http://localhost:80/material-minder/api/supply/${id}/edit`, inputs)
      .then(function (response) {
        console.log(response.data);
        navigate('/')
    }) 
  }

  return (
    <div>
      <h1>Edit Your Supplies</h1>
      <div style={{ display: 'block', 
                  width: 600, 
                  padding: 30
      }}>
        
        <Form onSubmit={handleSubmit}>
          
          <Form.Group>
              <Form.Label>Product name:</Form.Label>
            <Form.Control
              value={inputs.name}
              type="text"
              name="name"
              onChange={handleChange} />
          </Form.Group>
          
          <Form.Group>
              <Form.Label>Product type:</Form.Label>
            <Form.Control
              value={inputs.type}
              type="text" 
              name="type"
              onChange={handleChange}/>
          </Form.Group>

          <Form.Group>
              <Form.Label>Product colour:</Form.Label>
            <Form.Control
              value={inputs.colour}
              type="text"
              name="colour"
              onChange={handleChange}/>
          </Form.Group>

          <Form.Group>
              <Form.Label>Product quantity:</Form.Label>
            <Form.Control
              value={inputs.quantity}
              type="number"
              name="quantity"
              onChange={handleChange}/>
          </Form.Group>

          <Form.Group>
              <Form.Label>Product Location:</Form.Label>
            <Form.Control
              value={inputs.location}
              type="text"
              name="location"
              onChange={handleChange}/>
          </Form.Group>

          <Form.Group>
              <Form.Label>Product Supplier:</Form.Label>
            <Form.Control
              value={inputs.supplier}
              type="text"
              name="supplier"
              onChange={handleChange}/>
          </Form.Group>
          
          <Button variant="primary" type="submit">
            Save
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default EditSupplies
