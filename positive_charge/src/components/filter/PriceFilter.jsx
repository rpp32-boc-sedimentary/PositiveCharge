import React from 'react';
import ReactDOM from 'react-dom';
import Button from '@mui/material/Button';
const modalRoot = document.getElementById('priceFilter-portal');

class PriceFilter extends React.Component {
  constructor(props) {
    super(props);
    this.modal = document.createElement('div');
  }

  componentDidMount() {
    modalRoot.appendChild(this.modal);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.modal);
  }


  render() {

    return ReactDOM.createPortal(
      <>
        <form className='priceFilterModal' onSubmit={ this.props.handlePriceApply }>
          <div className='cksButton'>
            <label>
              <input type='checkbox' name='free' checked={this.props.price.free} onChange={ this.props.handlePrice } />
              <span>Free</span>
            </label>
          </div>

          <div className='cksButton'>
            <label>
              <input type='checkbox' name='$' checked={this.props.price.$} onChange={ this.props.handlePrice } />
              <span>$</span>
            </label>
          </div>

          <div className='cksButton'>
            <label>
              <input type='checkbox' name='$$' checked={this.props.price.$$} onChange={ this.props.handlePrice }  />
              <span>$$</span>
            </label>
          </div>

          <div className='cksButton'>
            <label>
              <input type='checkbox' name='$$$' checked={this.props.price.$$$} onChange={ this.props.handlePrice }  />
              <span>$$$</span>
            </label>
          </div>
          <input type='submit' value='Save'/>
        </form>
      </>,
      this.modal
    )
  }
}

export default PriceFilter;

