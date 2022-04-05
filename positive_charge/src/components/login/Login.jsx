import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
    this.loginSubmit = this.loginSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  loginSubmit(e) {
    e.preventDefault();
    console.log('login clicked');
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
        <form onSubmit={this.loginSubmit}>
          <label htmlFor="email">Email:
            <input type="email" name="email" onChange={this.handleChange} required />
          </label><br/>
          <label htmlFor="password">Password:
            <input type="text" name="password" onChange={this.handleChange} required />
          </label>
          <input type="submit" value="Login" />
        </form>
      </div>
    )
  }
}

export default Login;