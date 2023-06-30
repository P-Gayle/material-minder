import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const handleSubmit = async (event) => {
    event.preventDefault();
}

const handleChange = (event) => {

}

const SignIn = () => {

    return (
        <>
            <h1>Sign In</h1>
            <Form onSubmit={handleSubmit} encType="multipart/form-data">

          <Form.Group>
            <Form.Label>Name:</Form.Label>
            <Form.Control
              type="text"
              name="users-name"
              onChange={handleChange} />
          </Form.Group>
          
          <Form.Group>
              <Form.Label>Password:</Form.Label>
            <Form.Control
                type="text"
                name="password"
                onChange={handleChange} />
          </Form.Group>
          
          <Button variant="primary" type="submit">
            Sign In
          </Button>
        </Form>
        </>
    )
}

export default SignIn