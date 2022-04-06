import React from 'react';
import axios from 'axios';

export default class LittleFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: [],
    }
    this.getYelpData = this.getYelpData.bind(this);
  }

  // DELETE Later, for testing purposes
  getYelpData() {
    axios.get('/filter')
      .then(data => {
        console.log('data', data);
      })
      .catch(err => {
        console.log('error', err);
      })
  }


  render() {
    return (
      <div className="smallFilter">
        {'Small Filter Bar'}
        <select className="sfChild">

          <option>Recommended</option>
          <option>Distance</option>
          <option>Likes</option>
        </select>
        <button className="sfChild" onClick={this.getYelpData}>More Filters</button>
        <button className="sfChild">Open Now</button>
        <button className="sfChild">Price</button>
        <button className="sfChild">Dynamic Button</button>
      </div>
    )
  }
}