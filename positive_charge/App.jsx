import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import AddPOI from './src/components/addPOI/AddPOI.jsx'
import Login from './src/components/auth/Login.jsx';
import Signup from './src/components/auth/Signup.jsx';
import Modal from './src/components/poiDetails/Modal.jsx';
import LittleFilter from './src/components/filter/LittleFilter.jsx';
import BigFilter from './src/components/filter/BigFilter.jsx';
import SeePOI from './src/components/seePOI/seePOI.jsx';
import './src/styles.scss';
import axios from 'axios';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    }
    this.logIn = this.logIn.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  logIn() {
    this.setState({
      isLoggedIn: true
    })
  }

  logOut() {
    axios.post('/logout')
    .then((response) => {
      this.setState({
        isLoggedIn: false
      })
      console.log(response.data);
    })
    .catch((err) => {
      console.error(err);
    })
  }

  greeting() {
    if (this.state.isLoggedIn) {
      return (
        <li>
          <Link to="/logout" onClick={this.logOut}>Log Out</Link>
        </li>
      )
    } else {
      return (
        <li>
          <Link to="/login">Log In / Sign Up</Link>
        </li>
      )
    }
  }

  render() {
    return (
      <>
        <BrowserRouter>
          <div>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              {this.greeting()}
              <li>
                    <Link to="/seePOI">seePOI</Link>
                </li>
            </ul>
          </div>

          <Routes>
            <Route path="/" />
            <Route path="/login" element={<Login logIn={this.logIn}/>} />
            <Route path="signup" element={<Signup />} />
            <Route path="/logout" element={this.state.isLoggedIn ? <Navigate to="/" replace={true} /> : null} />
            <Route path='/seePOI' element={<SeePOI />}/>
          </Routes>
          </BrowserRouter>

        <div>
          <AddPOI />
        </div>
        <div>
          <Modal />
        </div>
        <div>
          <hr></hr>
          <h2>
            Filter Component
          </h2>
          <LittleFilter />
          <hr></hr>
        </div>
      </>
    )
  }
}

const container = document.getElementById('app')
const root = createRoot(container)
root.render(<App />);
