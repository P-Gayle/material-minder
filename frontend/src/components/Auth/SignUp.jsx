import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react'
import './auth.css'
// import { useNavigate } from 'react-router-dom'
// import axios from 'axios'

const SignUp = () => {
  const [user, setUser] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")
  const [error, setError] = useState("")
  const [msg, setMsg] = useState("")

  useEffect(() => {
    setTimeout(function(){ 
      setMsg("")
    }, 15000)
  }, [msg])

  const handleSubmit = async (event) => {
    event.preventDefault();
}

const handleChange = (e, type) => {
  switch (type) { 
    case "user":
      setError("")
      setUser(e.target.value)
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

    return (
        <>
        <h1>Sign Up</h1>
         
       
        <Form onSubmit={handleSubmit} className="form">
          <p>
            {msg !== "" ?
              <span className="success">{msg}</span> :
              <span className="error">{error}</span>
            }
                  
          </p>
         
          <Form.Group>
            <Form.Label>Name:</Form.Label>
            <Form.Control
              type="text"
              name="user"
              value={user}
              onChange={(e) => handleChange(e, "user")} />
          </Form.Group>
          
          <Form.Group>
              <Form.Label>Password:</Form.Label>
            <Form.Control
              type="text"
              name="password"
              value={password}
              onChange={(e) => handleChange(e, "password")} />
          </Form.Group>

          <Form.Group>
              <Form.Label>Confirm Password:</Form.Label>
            <Form.Control
              type="text"
              name="passwordConfirmation"
              value={passwordConfirmation}
              onChange={(e) => handleChange(e, "passwordConfirmation")} />
          </Form.Group>
          
          <Button variant="primary" type="submit">
            Sign Up
          </Button>
        </Form>
        </>
    )
}

export default SignUp