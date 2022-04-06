import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, Outlet, Link } from 'react-router-dom';
import Login from './src/components/login/Login.jsx';
import Signup from './src/components/login/Signup.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Log In / Sign Up</Link>
            </li>
            {/* <li>
              <Link to="/signup">Sign Up</Link>
            </li> */}
          </ul>
        </div>

        <Routes>
            <Route path="/" />
            <Route path="/login" element={<Login />} />
                <Route path="signup" element={<Signup />} />
        </Routes>
        <Outlet />
      </BrowserRouter>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('App'));
