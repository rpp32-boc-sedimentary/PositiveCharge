import React from 'react';

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
    console.log('sign up clicked');
  }

  render () {
    return (
      <div className="signup">
        <h1>Sign Up</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="name">Full Name:
            <input type="text" name="name" onChange={this.handleChange} required />
          </label>
          <label htmlFor="email">Email:
            <input type="email" name="email" onChange={this.handleChange} required />
          </label>
          <label htmlFor="password">Password:
            <input type="text" name="password" onChange={this.handleChange} required />
          </label>
          <input type="submit" value="Sign Up" />
        </form>
      </div>
    )
  }
}

export default Signup;