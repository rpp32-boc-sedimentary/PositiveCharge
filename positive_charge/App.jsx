import React from 'react';
import { createRoot } from 'react-dom/client';
import AddPOI from './src/components/addPOI/AddPOI.jsx'
import Login from './src/components/login/Login.jsx';
import Signup from './src/components/login/Signup.jsx';
import Modal from './src/components/poiDetails/Modal.jsx';
import LittleFilter from './src/components/filter/LittleFilter.jsx';
import BigFilter from './src/components/filter/BigFilter.jsx';
import './src/styles.scss';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
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
