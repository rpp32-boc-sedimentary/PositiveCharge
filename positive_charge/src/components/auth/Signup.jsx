import React from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: ''
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
      console.log(response.data);
      if (response.data === 'success') {

      }
    })
    .catch((err) => {
      console.error(err);
    })
  }

  render () {
    return (
      <div className="signup">
        <h1>Sign Up</h1>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="name">Full Name: </label>
            <input type="text" name="name" onChange={this.handleChange} required />
          </div>
          <div>
            <label htmlFor="email">Email: </label>
            <input type="email" name="email" onChange={this.handleChange} required />
          </div>
          <div>
            <label htmlFor="password">Password: </label>
            <input type="text" name="password" onChange={this.handleChange} required />
          </div>
          <input type="submit" value="Sign Up" />
        </form>
        <div>Already have an account?
          <Link to="/login">Login</Link>
        </div>
      </div>
    )
  }
}

export default Signup;