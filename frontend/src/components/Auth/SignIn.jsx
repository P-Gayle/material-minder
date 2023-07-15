import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './auth.css'
// import axios from 'axios'

const SignIn = () => {
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [msg, setMsg] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    let login = localStorage.getItem("login")
    if (login) {
      navigate('/list')
    }
    let loginStatus = localStorage.getItem("loginStatus")
    if (loginStatus) {
      setError(loginStatus)
      setTimeout(() => { 
        localStorage.clear()
        window.location.reload()
      }, 3000) 
    }
    setTimeout(() => {
      setMsg("")
    }, 5000)
  }, [msg])

  const handleChange = (e, type) => {
  switch (type) {
    case "name":
      setError("")
      setName(e.target.value)
      if (e.target.value === "") {
        setError("Username is required")
      }
      break
    case "password":
      setError("")
      setPassword(e.target.value)
      if (e.target.value === "") {
        setError("Password is required")
      }
      break
    default:
  }
}
  function handleSubmit(event) {
     event.preventDefault();
    if (name !== "" && password !== "") {
      const url = "http://localhost/material-minder/api/signIn.php"
      const headers = {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
      
      const data = {
        name: name,
        password: password
      }

      fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
      }).then((response) => response.json())
        .then((response) => {
          if (response[0].result === "Invalid username!" || response[0].result === "Invalid password!") {
            setError(response[0].result)
          } else {
            setMsg(response[0].result)
            setTimeout(function(){
              localStorage.setItem("login", true)
              localStorage.setItem("userId", response[0].userId); // Store the user ID in localStorage
              navigate('/list')
            }, 6000)
          }
      
        }).catch((err) => {
          setError(err)
          console.log(err)
        })
      }
    
    else {
      setError("Please enter username and password")
    }
}



    return (
        <>
            <h1 className='auth-h1 py-2'>Sign In</h1>
            <Form onSubmit={handleSubmit} className='form'>
          <p>
            {error !== "" ?
              <span className="error">{error}</span> :
              <span className="success">{msg}</span>
            }
          </p>
          <Form.Group className='input p-3'>
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              // name="name"
              value={name}
              onChange={(e) => handleChange(e, "name")} />
          </Form.Group>
          
          <Form.Group className='input p-3'>
              <Form.Label>Password:</Form.Label>
            <Form.Control
              type="text"
              // name="password"
              value={password}
              onChange={(e) => handleChange(e, "password")} />
          </Form.Group>
          
          <Button
            // variant="primary"
            className='auth-btn my-3'
            type="submit"
            defaultValue="login">
            Sign In
          </Button>
        </Form>
        </>
    )
}

export default SignIn