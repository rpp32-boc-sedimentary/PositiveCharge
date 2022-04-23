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
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';

const modalRoot = document.getElementById('bigFilter-portal');


 const BigFilter = (props) => {


  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    backgroundColor: 'white',
    border: '2px solid #000',
    boxShadow: 2,
    p: 4,
  };

    return (
      <div>
        <Modal
          open={props.modalState}
          onClose={props.manageModalState}
          BackdropProps={{style: {backgroundColor: 'white'}}}
        >

          <Box sx={{ style }}>
            <Grid container spacing={2} justify="center">
              <Grid item xs={4} align="center">
                <div>
                  <Button style={{ maxWidth: '90px', maxHeight: '30px' }} variant="text" onClick={ props.manageModalState }>Cancel</Button>
                </div>
              </Grid>
              <Grid item xs={4} align="center">
                <div>
                  <div className="text">Filters</div>
                </div>
              </Grid>
              <Grid item xs={4} align="center">
                <div>
                  <Button style={{ maxWidth: '180px', maxHeight: '30px' }} variant="text" onClick={ props.clearFilters }>Reset Filters</Button>
                </div>
              </Grid>
              <Grid item xs={12} align="center">
                <div>
                  <div>
                    { Object.keys( props.suggestedCategories).length > 0 ? <BfCategories suggestedCategories={ props.suggestedCategories } handleSuggestedCategoriesBf={ props.handleSuggestedCategoriesBf } lessThanFive={ props.lessThanFive } quickWalk={ props.quickWalk} handleQuickBf={ props.handleQuickBf } /> : null }
                  </div>

                </div>
              </Grid>
              <Grid item xs={12} align="center">
                <div>
                  <FormControl>
                    <FormLabel id="demo-controlled-radio-buttons-group">Maximum Walking Duration</FormLabel>
                    <RadioGroup
                      aria-labelledby="demo-controlled-radio-buttons-group"
                      name="controlled-radio-buttons-group"
                      onChange={ props.handleDistance }
                      >
                      <FormControlLabel value="5 min or less" control={<Radio />} sx={{ '& .MuiSvgIcon-root': { fontSize: 32 }}} label="5 Minutes" labelPlacement="end" checked={ props.distance === "5 min or less"} />
                      <FormControlLabel value="10 min or less" control={<Radio />} sx={{ '& .MuiSvgIcon-root': { fontSize: 32 }}} label="10 Minutes" labelPlacement="end" checked={ props.distance === "10 min or less"} />
                      <FormControlLabel value="15 min or less" control={<Radio />} sx={{ '& .MuiSvgIcon-root': { fontSize: 32 }}} label="15 Minutes" labelPlacement="end" checked={ props.distance === "15 min or less"} />
                      <FormControlLabel value="All distances" control={<Radio />} sx={{ '& .MuiSvgIcon-root': { fontSize: 32 }}} label="All Distances" labelPlacement="end" checked={ props.distance === "All distances"} />
                    </RadioGroup>
                  </FormControl>
                </div>
              </Grid>
              <Grid item xs={12} align="center">
                <div>

                  <FormControl component="fieldset" variant="standard">
                    <FormLabel>Price</FormLabel>
                    <FormGroup row>
                      <FormControlLabel control={ <Checkbox /> } sx={{ '& .MuiSvgIcon-root': { fontSize: 32 }}} label="Free" labelPlacement="end" name="free" checked={ props.price.free } onChange={ props.handlePrice} />
                      <FormControlLabel control={ <Checkbox /> } sx={{ '& .MuiSvgIcon-root': { fontSize: 32 }}} label="$" labelPlacement="end" name="$" checked={ props.price.$ } onChange={ props.handlePrice} />
                      <FormControlLabel control={ <Checkbox /> } sx={{ '& .MuiSvgIcon-root': { fontSize: 32 }}} label="$$" labelPlacement="end" name="$$" checked={ props.price.$$ } onChange={ props.handlePrice} />
                      <FormControlLabel control={ <Checkbox /> } sx={{ '& .MuiSvgIcon-root': { fontSize: 32 }}} label="$$$" labelPlacement="end" name="$$$" checked={ props.price.$$$ } onChange={ props.handlePrice} />
                    </FormGroup>
                  </FormControl>
                </div>
              </Grid>
              <Grid item xs={12} align="center">
                <div>

                  { Object.keys( props.categoriesChecked).length > 0 ? <AllCategories categoriesChecked={ props.categoriesChecked } handleAllCategories={ props.handleAllCategories } /> : null }
                </div>
              </Grid>
              <Grid item xs={12} align="center">
                <div>

                  <Button style={{ maxWidth: '180px', maxHeight: '30px' }} variant="contained" color="secondary" onClick={ props.handleBigFilterApply }>Apply Filters</Button>

                </div>
              </Grid>
            </Grid>
          </Box>

        </Modal>
      </div>
      )

  }



  export default BigFilter;

      //   <div className="bigModal">
      //     <div className="bigFilterSection">
      //       <Button style={{ maxWidth: '90px', maxHeight: '30px' }} variant="text" onClick={ this.props.manageModalState }>Cancel</Button>
      //       <div className="categoryHeader">Filters</div>
      //       <Button style={{ maxWidth: '180px', maxHeight: '30px' }} variant="text" onClick={ this.props.clearFilters }>Reset Filters</Button>
      //     </div>

      //     <div>
      //      {this.props.distance !== '' ? this.props.distance : null }
      //     </div>
      //     <hr/>
      //     <FormControl>
      //       <FormLabel id="demo-controlled-radio-buttons-group">Maximum Walking Duration</FormLabel>
      //       <RadioGroup
      //         aria-labelledby="demo-controlled-radio-buttons-group"
      //         name="controlled-radio-buttons-group"
      //         onChange={ this.props.handleDistance }
      //       >
      //         <FormControlLabel value="5 min or less" control={<Radio />} sx={{ '& .MuiSvgIcon-root': { fontSize: 32 }}} label="5 Minutes" checked={ this.props.distance === "5 min or less"} />
      //         <FormControlLabel value="10 min or less" control={<Radio />} sx={{ '& .MuiSvgIcon-root': { fontSize: 32 }}} label="10 Minutes" checked={ this.props.distance === "10 min or less"} />
      //         <FormControlLabel value="15 min or less" control={<Radio />} sx={{ '& .MuiSvgIcon-root': { fontSize: 32 }}} label="15 Minutes" checked={ this.props.distance === "15 min or less"} />
      //         <FormControlLabel value="All distances" control={<Radio />} sx={{ '& .MuiSvgIcon-root': { fontSize: 32 }}} label="All Distances" checked={ this.props.distance === "All distances"} />
      //       </RadioGroup>
      //     </FormControl>

      //     <hr/>
      //     <div className="bigFilterSection">
      //       <div>
      //         { Object.keys(this.props.suggestedCategories).length > 0 ? <BfCategories suggestedCategories={ this.props.suggestedCategories } handleSuggestedCategoriesBf={ this.props.handleSuggestedCategoriesBf } lessThanFive={ this.props.lessThanFive } quickWalk={this.props.quickWalk} handleQuickBf={this.props.handleQuickBf } /> : null }
      //       </div>
      //     </div>
      //     <hr/>

      //     <div className="bigFilterSection">
      //     <FormControl component="fieldset" variant="standard">
      //       <FormLabel>Price</FormLabel>
      //       <FormGroup>
      //         <FormControlLabel control={ <Checkbox /> } sx={{ '& .MuiSvgIcon-root': { fontSize: 32 }}} label="Free" labelPlacement="start" name="free" checked={ this.props.price.free } onChange={this.props.handlePrice} />
      //         <FormControlLabel control={ <Checkbox /> } sx={{ '& .MuiSvgIcon-root': { fontSize: 32 }}} label="$" labelPlacement="start" name="$" checked={ this.props.price.$ } onChange={this.props.handlePrice} />
      //         <FormControlLabel control={ <Checkbox /> } sx={{ '& .MuiSvgIcon-root': { fontSize: 32 }}} label="$$" labelPlacement="start" name="$$" checked={ this.props.price.$$ } onChange={this.props.handlePrice} />
      //         <FormControlLabel control={ <Checkbox /> } sx={{ '& .MuiSvgIcon-root': { fontSize: 32 }}} label="$$$" labelPlacement="start" name="$$$" checked={ this.props.price.$$$ } onChange={this.props.handlePrice} />
      //       </FormGroup>
      //     </FormControl>
      //     </div>
      //     <hr/>

      //     <div className="bigFilterSection">
      //       { Object.keys(this.props.categoriesChecked).length > 0 ? <AllCategories categoriesChecked={ this.props.categoriesChecked } handleAllCategories={ this.props.handleAllCategories } /> : null }
      //     </div>
      //     <hr/>
      //     <div className="bigFilterSection">
      //       <Button style={{ maxWidth: '180px', maxHeight: '30px' }} variant="contained" onClick={ this.props.handleBigFilterApply }>Apply Filters</Button>
      //     </div>
      //   </div>
      // </>,
      // this.el