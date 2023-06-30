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
    const fetchSupply = async () => {
      try {
        const response = await axios.get(`http://localhost:80/material-minder/api/supply/${id}`)
        console.log(response.data)
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
      const response = await axios.put(`http://localhost:80/material-minder/api/supply/${id}/edit`, inputs)
      console.log(response.data)
      navigate(-1)
    } catch (error) {
      console.error(error);
      throw new Error('Failed to edit the supply product');
    }
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
              <Form.Label>Price Per Unit:</Form.Label>
            <Form.Control
                value={inputs.price}
                type="number"
                step="any"
                name="price"
                onChange={handleChange} />
          </Form.Group>

           <Form.Group>
              <Form.Label>Size:</Form.Label>
            <Form.Control
              value={inputs.size}
                type="text"
                step="any"
                name="size"
                onChange={handleChange} />
          </Form.Group>

          <Form.Group>
              <Form.Label>Product type:</Form.Label>
            <Form.Control
              value={inputs.type}
              name="type"
              as="select"
              // custom
              // placeholder="Enter the product type"
              onChange={handleChange}>
              <option value="fabric">Fabric</option>
              <option value="thread">Thread</option>
              <option value="elastic">Elastic</option>
              <option value="poppers">Poppers</option>
              <option value="hook and eye">Hook and Eyes</option>  
              <option value="zip">Zip</option>
              </Form.Control>
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

          <Form.Group>
            <Form.Label>Notes:</Form.Label>
            <Form.Control
              value={inputs.notes}
              type="text"
              name="notes"
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
