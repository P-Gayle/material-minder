import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './auth.css'

const SignUp = () => {
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")
  const [error, setError] = useState("")
  const [msg, setMsg] = useState("")

  useEffect(() => {
    setTimeout(function(){ 
      setMsg("")
      
    }, 6000)
  }, [msg])

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (name !== "" && password !== "" && passwordConfirmation !== "") {
      const url = "/api/signUp.php";

      
            const headers = {
                "Accept": "application/json",
                "Content-Type": "application/json"
            };
            const data = {
                name: name,
                password: passwordConfirmation
      }
       
      try {
        
        const response = await axios.post(url, data, { headers });
        const result = response.data[0].result;
        setMsg(result);
         
    } catch (error) {
      setError(error.message);
      // added return statement to prevent code from continuing onto the
      // navigate('/signin') statement below
      return
    } 
      
        setName("");
        setPassword("");
        setPasswordConfirmation("");
        setTimeout(function(){ 
         
           navigate('/signin')
        }, 4000)
      
     
    }
      else {
        setError("All fields are required")
    } 
  }
  
  const checkUser = async () => {
    const url = "/api/checkUser.php";

    const headers = {
      "Accept": "application/json",
      "Content-Type": "application/json"
    };
    const data = {
      name: name
    }
       
    try {
      const response = await axios.post(url, data, { headers });
      const result = response.data[0].result;
      setError(result);
    } catch (error) {
      // set error message to error.message (was previously getting set to the error object itself causing errors)
      setError(error.message);
    }
  }
  
const handleChange = (e, type) => {
  switch (type) { 
    case "name":
      setError("")
      setName(e.target.value)
      if (e.target.value === "") {
        setError("Username cannot be empty")
      }
      break;
    case "password":
      setError("")
      setPassword(e.target.value)
      if (e.target.value === "") {
        setError("Password cannot be empty")
      }
      break;
    case "passwordConfirmation":
      setError("")
      setPasswordConfirmation(e.target.value)
      if (e.target.value === "") {
        setError("Password Confirmation cannot be empty")
      }
      else if (e.target.value !== password) { 
        setError("Password and Password Confirmation must match")
      }      
      break;
    default:
  }
  }
  
  const checkPassword = () => {
    if (password.length < 8) {
      setError("Password must be at least 8 characters")
    }
  }

    return (
      <>
        <h1 className='auth-h1 py-2'>Sign Up</h1>
                
        <Form onSubmit={handleSubmit} className="form">
          <p>
            {msg !== "" ?
              <span className="success">{msg}</span> :
              <span className="error">{error}</span>
            }      
          </p>
         
          <Form.Group className='input p-3'>
            <Form.Label>Choose a user name:</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={name}
              onChange={(e) => handleChange(e, "name")} 
              onBlur={checkUser}
            />
          </Form.Group>
          
          <Form.Group className='input p-3'>
              <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={password}
              onBlur={checkPassword}
              onChange={(e) => handleChange(e, "password")} />
          </Form.Group>

          <Form.Group className='input p-3'>
              <Form.Label>Confirm Password:</Form.Label>
            <Form.Control
              type="password"
              name="passwordConfirmation"
              value={passwordConfirmation}
              onChange={(e) => handleChange(e, "passwordConfirmation")} />
          </Form.Group>
          
          <Button type="submit" className='my-3 auth-btn'>
            Sign Up
          </Button>
        </Form>
      </>
    )
}

export default SignUp