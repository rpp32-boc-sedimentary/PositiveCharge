import React from 'react';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Button from '@mui/material/Button';


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      user: null,
      error: null
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    axios.post('/login', {
      email: this.state.email,
      password: this.state.password
    })
    .then((response) => {
      console.log('response.data: ', response.data)
      if ((response.data !== 'Incorrect password') && (response.data !== 'Cannot find user')) {
        let user = response.data;
        this.setState({ user });
        this.props.logIn(user, this.state.email);
      } else {
        let error = response.data;
        this.setState({ error })
      }
    })
    .catch((error) => {
      console.log(error);
      // this.setState({ error });
    })
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    let { user, error } = this.state;
    return (
      <Container className="login" maxwidth="xs">
        { error && <p>{error}</p>}
        { user && (
          <Navigate to="/" replace={true} />
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
          <h1>Login</h1>
          <Box component="form" onSubmit={this.handleSubmit}>
            <div>
              <label htmlFor="email">Email: </label>
              <input type="email" name="email" id="email" onChange={this.handleChange} required />
            </div>
            <div>
              <label htmlFor="password">Password: </label>
              <input type="text" name="password" id="password" onChange={this.handleChange} required />
            </div>
            {/* <input type="submit" value="Login" /> */}
            <Button type="submit" variant="contained" sx={{mt: 3, mb: 2}}>Login</Button>
          </Box>
          <div>Don't have an account?
            <Link to="/signup">Sign Up</Link>
          </div>
        </Box>
      </Container>
    )
  }
}

export default Login;