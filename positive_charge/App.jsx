import React from 'react';
import { createRoot } from 'react-dom/client';
import AddPOI from './src/components/addPOI/AddPOI.jsx'
import Login from './src/components/login/Login.jsx';
import Signup from './src/components/login/Signup.jsx';
import Modal from './src/components/poiDetails/Modal.jsx';

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <>
            <div className="app">
                <Login />
                <Signup />
                <AddPOI />
            </div>
            <div>
                <Modal />
            </div>
          </>
        )
    }
}

const container = document.getElementById('app')
const root = createRoot(container)
root.render(<App />);
