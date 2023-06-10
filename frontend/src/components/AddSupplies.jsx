import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react'
import axios from 'axios'

const AddSupplies = () => {

  const [inputs, setInputs] = useState({})

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  //to prevent refresh when submitted
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post ('http://localhost:80/material-minder/api/supplies/save', inputs)
    console.log(inputs);
  }

  return (
    <div>
      <h1>Add Your Supplies</h1>
      <div style={{ display: 'block', 
                  width: 600, 
                  padding: 30
      }}>
        
        <Form onSubmit={handleSubmit}>
          
          <Form.Group>
              <Form.Label>Product name:</Form.Label>
            <Form.Control
              type="text"
              name="name"
                placeholder="Enter the Product name"
                onChange={handleChange} />
          </Form.Group>
          
          <Form.Group>
              <Form.Label>Product type:</Form.Label>
            <Form.Control type="text" 
              name="type"
              placeholder="Enter the product type"
            onChange={handleChange}/>
          </Form.Group>

          <Form.Group>
              <Form.Label>Product colour:</Form.Label>
            <Form.Control type="text" name="colour" placeholder="Enter the product colour"
            onChange={handleChange}/>
          </Form.Group>

          <Form.Group>
              <Form.Label>Product quantity:</Form.Label>
            <Form.Control type="number" name="quantity" placeholder="Enter the quantity available"
            onChange={handleChange}/>
          </Form.Group>

          <Form.Group>
              <Form.Label>Product Location:</Form.Label>
            <Form.Control type="text" name="location" placeholder="Enter the product's location"
            onChange={handleChange}/>
          </Form.Group>

          <Form.Group>
              <Form.Label>Product Supplier:</Form.Label>
            <Form.Control type="text" name="supplier" placeholder="Enter the product's supplier"
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

export default AddSupplies
