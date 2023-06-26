import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const AddSupplies = () => {

  const [inputs, setInputs] = useState({})
  const navigate = useNavigate()

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

   const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:80/material-minder/api/supplies/save', inputs)
      console.log(response.data)
      navigate('/')
    } catch (error) {
      console.error(error);
      throw new Error('Failed to add a supply product');
    }
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
              <Form.Label>Price Per Unit:</Form.Label>
            <Form.Control
                type="number"
                step="any"
                name="price"
                placeholder="Enter the Product price per unit"
                onChange={handleChange} />
          </Form.Group>

           <Form.Group>
              <Form.Label>Size:</Form.Label>
            <Form.Control
                type="text"
                step="any"
                name="size"
                placeholder="Enter the size of the product"
                onChange={handleChange} />
          </Form.Group>
          
          <Form.Group>
              <Form.Label>Product type:</Form.Label>
            <Form.Control
              name="type"
              as="select"
              custom
              // placeholder="Enter the product type"
              onChange={handleChange}>
              <option value="fabric">Fabric</option>
              <option value="thread">Thread</option>
              <option value="elastic">Elastic</option>
              <option value="poppers">Poppers</option>
              <option value="hook_and_eye">Hook and Eyes</option>  
              <option value="zip">Zip</option>
              </Form.Control>
          </Form.Group>

          <Form.Group>
              <Form.Label>Product colour:</Form.Label>
            <Form.Control
              type="text"
              name="colour"
              placeholder="Enter the product colour"
              onChange={handleChange}/>
          </Form.Group>

          <Form.Group>
              <Form.Label>quantity purchased:</Form.Label>
            <Form.Control
              type="number"
              step="any"
              name="total_purchased"
              placeholder="Enter the quantity available"
              onChange={handleChange}/>
          </Form.Group>

          <Form.Group>
              <Form.Label>Product Location:</Form.Label>
            <Form.Control
              type="text"
              name="location"
              placeholder="Enter the product's location"
              onChange={handleChange}/>
          </Form.Group>

          <Form.Group>
              <Form.Label>Product Supplier:</Form.Label>
            <Form.Control
              type="text"
              name="supplier"
              placeholder="Enter the product's supplier"
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
