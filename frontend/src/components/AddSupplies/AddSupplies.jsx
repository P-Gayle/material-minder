import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './addSupplies.css'

const AddSupplies = () => {

  const [inputs, setInputs] = useState({})
  const [error, setError] = useState("")
  const [msg, setMsg] = useState("") 
  const navigate = useNavigate()

  useEffect(() => {
        setInputs(inputs => ({
            ...inputs,
            userId: localStorage.getItem('userId')
        }));
  }, []);
  
  useEffect(() => {
  let timerError = setTimeout(() => { setError("") }, 5000);
  let timerMsg = setTimeout(() => { setMsg("") }, 5000);

  return () => {
    clearTimeout(timerError);
    clearTimeout(timerMsg);
  };
}, [error, msg]);

  const handleChange = (event) => {
  
    if (event.target.type === 'file') {
    const file = event.target.files[0];
    setInputs((values) => ({
      ...values,
      image: file,
    }));
    } else {
      const name = event.target.name;
      const value = event.target.value;
      setInputs((values) => ({
        ...values,
        [name]: value,
      }));
    }
  }

   const handleSubmit = async (event) => {
    event.preventDefault();
    
      try {
      
        const formData = new FormData();
        formData.append('image', inputs.image);
        formData.append('userId', inputs.userId);
        formData.append('name', inputs.name);
        formData.append('price', inputs.price);
        formData.append('size', inputs.size);
        formData.append('type', inputs.type);
        formData.append('colour', inputs.colour);
        formData.append('total_purchased', inputs.total_purchased);
        formData.append('location', inputs.location);
        formData.append('supplier', inputs.supplier);
        formData.append('notes', inputs.notes);
        //  console.log(formData)
       
      const response = await axios.post('http://localhost:80/material-minder/api/supplies/save', formData)
        console.log(response.data)
        
        if(response.data.status === 1) {
          setMsg(response.data.message)
           setTimeout(() => { 
             navigate('/list')
            }, 2000);
        } else {
            setError(response.data.message)      
        
        }
      

    } catch (error) {
      console.error(error);
        // throw new Error('Failed to add a supply product');
        setError('Failed to add a supply product');
    }
  }

  return (
    <div >
      <h1 className='auth-h1'>Add Your Supplies</h1>

      {msg && <div className='success'>{msg}</div>} 
      <div className='add'>
        
        <Form onSubmit={handleSubmit} encType="multipart/form-data">
         
        <div className='row'>
        <div className='col'>        

           {error && <div className='error'>{error}</div>}
          
          <Form.Group>
                <Form.Label> Image (optional) <span>5mb max</span></Form.Label>
               
            <Form.Control
              type="file"
              name="image"
              placeholder="upload the product image"
              onChange={handleChange} />
          </Form.Group>
          
          <Form.Group>
              <Form.Label>Product Name:</Form.Label>
              <Form.Control
                type="text"
                name="name"
                onChange={handleChange} />
          </Form.Group>

           <Form.Group>
              <Form.Label>Price Per Unit:</Form.Label>
              <Form.Control
                type="number"
                step="any"
                name="price"
                onChange={handleChange} />
          </Form.Group>

           <Form.Group>
              <Form.Label>Size:</Form.Label>
              <Form.Control
                type="text"
                step="any"
                name="size"
                onChange={handleChange} />
              </Form.Group>  
          
          <Form.Group>
              <Form.Label>Product type:</Form.Label>
              <Form.Control
                name="type"
                as="select"
                onChange={handleChange}>
                  
                <option value="" selected disabled hidden>Click to select a product type</option>
                <option value="fabric">Fabric</option>
                <option value="thread">Thread</option>
                <option value="elastic">Elastic</option>
                <option value="poppers">Poppers</option>
                <option value="hook_and_eye">Hook and Eyes</option>  
                <option value="zip">Zip</option>
              </Form.Control>
          </Form.Group>    

          <Form.Group>
              <Form.Label>Colour:</Form.Label>
              <Form.Control
                type="text"
                name="colour"
                onChange={handleChange}/>
          </Form.Group>
        </div>
            
        <div className='col'>
        
          <Form.Group>
              <Form.Label>Quantity Purchased:</Form.Label>
              <Form.Control
                type="number"
                step="any"
                name="total_purchased"
                onChange={handleChange}/>
          </Form.Group>

          <Form.Group>
              <Form.Label>Storage Location:</Form.Label>
              <Form.Control
                type="text"
                name="location"
                onChange={handleChange}/>
          </Form.Group>

          <Form.Group>
              <Form.Label>Supplier/Shop Name:</Form.Label>
              <Form.Control
                type="text"
                name="supplier"
                onChange={handleChange}/>
          </Form.Group>

          <Form.Group>
              <Form.Label>Notes:</Form.Label>
              <Form.Control
                className='notes'
                type="text"
                name="notes"
                onChange={handleChange}/>
            </Form.Group>
        </div>
        </div>
          
          <Button className='add-btn' type="submit">
            Save
          </Button>
          </Form>
      </div>
    </div>
  )
}

export default AddSupplies
