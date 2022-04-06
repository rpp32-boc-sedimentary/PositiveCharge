import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Outlet, Link } from 'react-router-dom';
import AddPOI from './src/components/addPOI/AddPOI.jsx'
import Login from './src/components/auth/Login.jsx';
import Signup from './src/components/auth/Signup.jsx';
import Modal from './src/components/poiDetails/Modal.jsx';
import LittleFilter from './src/components/filter/LittleFilter.jsx';
import BigFilter from './src/components/filter/BigFilter.jsx';
import './src/styles.scss';



class App extends React.Component {
  constructor(props) {
    super(props);
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
              <li>
                  <Link to="/login">Log In / Sign Up</Link>
              </li>
            </ul>
          </div>

          <Routes>
              <Route path="/" />
              <Route path="/login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
          </Routes>
          <Outlet />
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
            <BigFilter />
            <hr></hr>
        </div>
      </>
        )
    }
}

const container = document.getElementById('app')
const root = createRoot(container)
root.render(<App />);
