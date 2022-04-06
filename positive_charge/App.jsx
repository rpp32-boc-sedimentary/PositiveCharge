import React from 'react';
import ReactDOM from 'react-dom'
import './src/styles.scss';
import Login from './src/components/login/Login.jsx';
import Signup from './src/components/login/Signup.jsx';
import LittleFilter from './src/components/filter/LittleFilter.jsx';
import BigFilter from './src/components/filter/BigFilter.jsx';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <div className="app">
                <Login />
                <Signup />
                <div>
                    <hr></hr>
                    <h2>
                        Filter Component
                    </h2>
                    <LittleFilter />
                    <BigFilter />
                    <hr></hr>
                </div>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('App'));
