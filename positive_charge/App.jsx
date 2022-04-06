import React from 'react';
import ReactDOM from 'react-dom'
import AddPOI from './src/components/addPOI/AddPOI.jsx'



class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
           <div className="app">
               <AddPOI />
           </div>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('algoVisualizer'));
