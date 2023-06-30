import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react'
import './auth.css'
// import { useNavigate } from 'react-router-dom'
// import axios from 'axios'

const SignUp = () => {
  const [name, setName] = useState("")
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
    if (name !== "" && password !== "" && passwordConfirmation !== "") {
       var url = "http://localhost/Material-Minder/api/signUp.php";
            var headers = {
                "Accept": "application/json",
                "Content-Type": "application/json"
            };
            var Data = {
                name: name,
                password: passwordConfirmation
            }
            fetch(url, {
                method: "POST",
                headers: headers,
                body: JSON.stringify(Data)
            }).then((response) => response.json())
            .then((response) => {
                setMsg(response[0].result);
            }).catch((err) =>{
                setError(err);
                console.log(err);
            });
            setName("");
            setPassword("");
            setPasswordConfirmation("");
    }
      else {
        setError("All fields are required")
      }   
  }
  
  const checkUser = () => {
        var url = "http://localhost/Material-Minder/api/checkUser.php";
        var headers = {
            "Accept": "application/json",
            "Content-Type": "application/json"
        };
        var Data = {
            name: name
        }
        fetch(url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(Data)
        }).then((response) => response.json())
        .then((response) => {
            setError(response[0].result);
        }).catch((err) =>{
            setError(err);
            console.log(err);
        });
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
        <h1>Sign Up</h1>
                
        <Form onSubmit={handleSubmit} className="form">
          <p>
            {msg !== "" ?
              <span className="success">{msg}</span> :
              <span className="error">{error}</span>
            }      
          </p>
         
          <Form.Group>
            <Form.Label>Choose a user name:</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={name}
              onChange={(e) => handleChange(e, "name")} 
              onBlur={checkUser}/>
          </Form.Group>
          
          <Form.Group>
              <Form.Label>Password:</Form.Label>
            <Form.Control
              type="text"
              name="password"
              value={password}
              onBlur={checkPassword}
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