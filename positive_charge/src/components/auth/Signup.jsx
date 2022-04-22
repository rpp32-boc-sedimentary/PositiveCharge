import React from 'react';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MuiLink from '@mui/material/Link';
import Grid from '@mui/material/Grid';


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
      <Container className="signup" maxWidth="xs">
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
          <Typography component="h1" variant="h4">
            Sign Up
          </Typography>
          <Box component="form" onSubmit={this.handleSubmit} sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="name"
                  id="name"
                  label="Name"
                  onChange={this.handleChange}
                  required
                  fullWidth
                />
                {/* <div>
                  <label htmlFor="name">Name: </label>
                  <input type="text" name="name" id="name" onChange={this.handleChange} required />
                </div> */}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="email"
                  name="email"
                  id="email"
                  label="Email"
                  onChange={this.handleChange}
                  required
                  fullWidth
                  autoComplete="email"
                />
                {/* <div>
                  <label htmlFor="email">Email: </label>
                  <input type="email" name="email" id="email" onChange={this.handleChange} required />
                </div> */}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="password"
                  id="password"
                  label="Password"
                  onChange={this.handleChange}
                  required
                  fullWidth
                />
                {/* <div>
                  <label htmlFor="password">Password: </label>
                  <input type="text" name="password" id="password" onChange={this.handleChange} required />
                </div> */}
                {/* <input type="submit" value="Sign Up" /> */}
              </Grid>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 3 }}
              fullWidth
            >
              Sign Up
            </Button>
          </Box>
          <Grid container justifyContent="flex-end">
            <Grid item>Already have an account?
              <MuiLink component={Link} to="/login" sx={{ ml: 1 }}>Login</MuiLink>
            </Grid>
          </Grid>
        </Box>
      </Container>
    )
  }
}

export default Signup;