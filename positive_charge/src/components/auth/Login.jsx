import React from 'react';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';


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
        this.props.logIn(user);
      } else {
        let error = response.data;
        this.setState({ error })
      }
    })
    .catch((error) => {
      console.error(error);
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
      <div className="login">
        { error && <p>{error}</p>}
        { user && (
          <Navigate to="/" replace={true} />
        )}
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