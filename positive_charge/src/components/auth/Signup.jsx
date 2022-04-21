import React from 'react';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Button from '@mui/material/Button';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      status: null,
      error: null
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    axios.post('/signup', {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    })
    .then((response) => {
      let status = response.data;
      if (status === 'Added new user') {
        this.setState({ status })
      }
    })
    .catch((error) => {
      this.setState({ error: 'User with that email already exists.' });
      console.log(error);
    })
  }

  render () {
    let { status, error } = this.state;
    return (
      <Container className="signup">
        { error && <p>{error}</p>}
        { status && (
          <Navigate to="/login" replace={true} />
        )}
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main'}}>
              <LockOutlinedIcon />
            </Avatar>
          <h1>Sign Up</h1>
          <form onSubmit={this.handleSubmit}>
            <div>
              <label htmlFor="name">Name: </label>
              <input type="text" name="name" id="name" onChange={this.handleChange} required />
            </div>
            <div>
              <label htmlFor="email">Email: </label>
              <input type="email" name="email" id="email" onChange={this.handleChange} required />
            </div>
            <div>
              <label htmlFor="password">Password: </label>
              <input type="text" name="password" id="password" onChange={this.handleChange} required />
            </div>
            {/* <input type="submit" value="Sign Up" /> */}
            <Button type="submit" variant="contained" sx={{mt: 3, mb: 2}}>Sign Up</Button>
          </form>
          <div>Already have an account?
            <Link to="/login">Login</Link>
          </div>
        </Box>
      </Container>
    )
  }
}

export default Signup;