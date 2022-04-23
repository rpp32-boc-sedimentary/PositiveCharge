import React from 'react';
import ReactDOM from 'react-dom';
import AllCategories from './AllCategories.jsx';
import BfCategories from './BfCategories.jsx';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
const modalRoot = document.getElementById('bigFilter-portal');


class BigFilter extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  }

  componentDidMount() {
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  render() {

    return ReactDOM.createPortal(
      <>
        <div className="bigModal">
          <div className="bigFilterSection">
            <Button style={{ maxWidth: '90px', maxHeight: '30px' }} variant="text" onClick={ this.props.manageModalState }>Cancel</Button>
            <div className="categoryHeader">Filters</div>
            <Button style={{ maxWidth: '180px', maxHeight: '30px' }} variant="text" onClick={ this.props.clearFilters }>Reset Filters</Button>
          </div>

          <div>
           {this.props.distance !== '' ? this.props.distance : null }
          </div>
          <hr/>
          <FormControl>
            <FormLabel id="demo-controlled-radio-buttons-group">Maximum Walking Duration</FormLabel>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              onChange={ this.props.handleDistance }
            >
              <FormControlLabel value="5 min or less" control={<Radio />} sx={{ '& .MuiSvgIcon-root': { fontSize: 32 }}} label="5 Minutes" checked={ this.props.distance === "5 min or less"} />
              <FormControlLabel value="10 min or less" control={<Radio />} sx={{ '& .MuiSvgIcon-root': { fontSize: 32 }}} label="10 Minutes" checked={ this.props.distance === "10 min or less"} />
              <FormControlLabel value="15 min or less" control={<Radio />} sx={{ '& .MuiSvgIcon-root': { fontSize: 32 }}} label="15 Minutes" checked={ this.props.distance === "15 min or less"} />
              <FormControlLabel value="All distances" control={<Radio />} sx={{ '& .MuiSvgIcon-root': { fontSize: 32 }}} label="All Distances" checked={ this.props.distance === "All distances"} />
            </RadioGroup>
          </FormControl>

          <hr/>
          <div className="bigFilterSection">
            <div>
              { Object.keys(this.props.suggestedCategories).length > 0 ? <BfCategories suggestedCategories={ this.props.suggestedCategories } handleSuggestedCategoriesBf={ this.props.handleSuggestedCategoriesBf } lessThanFive={ this.props.lessThanFive } quickWalk={this.props.quickWalk} handleQuickBf={this.props.handleQuickBf } /> : null }
            </div>
          </div>
          <hr/>

          <div className="bigFilterSection">
          <FormControl component="fieldset" variant="standard">
            <FormLabel>Price</FormLabel>
            <FormGroup>
              <FormControlLabel control={ <Checkbox /> } sx={{ '& .MuiSvgIcon-root': { fontSize: 32 }}} label="Free" labelPlacement="start" name="free" checked={ this.props.price.free } onChange={this.props.handlePrice} />
              <FormControlLabel control={ <Checkbox /> } sx={{ '& .MuiSvgIcon-root': { fontSize: 32 }}} label="$" labelPlacement="start" name="$" checked={ this.props.price.$ } onChange={this.props.handlePrice} />
              <FormControlLabel control={ <Checkbox /> } sx={{ '& .MuiSvgIcon-root': { fontSize: 32 }}} label="$$" labelPlacement="start" name="$$" checked={ this.props.price.$$ } onChange={this.props.handlePrice} />
              <FormControlLabel control={ <Checkbox /> } sx={{ '& .MuiSvgIcon-root': { fontSize: 32 }}} label="$$$" labelPlacement="start" name="$$$" checked={ this.props.price.$$$ } onChange={this.props.handlePrice} />
            </FormGroup>
          </FormControl>
          </div>
          <hr/>

          <div className="bigFilterSection">
            { Object.keys(this.props.categoriesChecked).length > 0 ? <AllCategories categoriesChecked={ this.props.categoriesChecked } handleAllCategories={ this.props.handleAllCategories } /> : null }
          </div>
          <hr/>
          <div className="bigFilterSection">
            <Button style={{ maxWidth: '180px', maxHeight: '30px' }} variant="contained" onClick={ this.props.handleBigFilterApply }>Apply Filters</Button>
          </div>
        </div>
      </>,
      this.el
    )
  }
}



export default BigFilter;
