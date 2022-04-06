import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Signup from './Signup.jsx';


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
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
      console.log(response.data);
    })
    .catch((err) => {
      console.error(err);
    })
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <div className="login">
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="email">Email: </label>
            <input type="email" name="email" onChange={this.handleChange} required />
          </div>
          <div>
            <label htmlFor="password">Password: </label>
            <input type="text" name="password" onChange={this.handleChange} required />
          </div>
          <input type="submit" value="Login" />
        </form>
        <div>Don't have an account?
          <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    )
  }
}

export default Login;