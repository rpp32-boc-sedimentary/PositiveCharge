import React from 'react';

export default class BigFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <>
        <h2>Filters</h2>
        <div className="bigFilter">
          <div className="categoryHeader">Distance:</div>
          <label>2 min less</label>
          <input type="radio" name="short" />
          <label>5 min or less</label>
          <input type="radio" name="medium" />
          <label>10 min or less</label>
          <input type="radio" name="long" />
          <label>Any distance</label>
          <input type="radio" name="all" />
        </div>

        <div className="categoryHeader">Price</div>
        <div className="categoryHeader">Suggested</div>
        <div className="bigFilter">
          <input type="checkbox" name="Good for kids" />
          <label>Open Now</label>
          <input type="checkbox" name="OpenNow" />
          <label>Good For Kids</label>
          <input type="checkbox" />
          <label>Dogs Allowed</label>
        </div>
        <div>Category</div>
        <button>Cancel</button>
        <button>Apply Filters</button>
      </>
    )
  }
}