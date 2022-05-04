import React from 'react';
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
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';


 const BigFilter = (props) => {

  return (
    <div>
        <Dialog
          open={props.modalState}
          onClose={props.manageModalState}
        >
          <Grid container display="flex" direction="row" justifyContent="center" >

            <Grid container item xs={4} alignItems="flex-start" direction="column" justifyContent="flex-start">
              <div>
                  <Button style={{ maxWidth: '90px', maxHeight: '30px' }} variant="text" onClick={ props.manageModalState }>Cancel</Button>
              </div>
            </Grid>
            <Grid item xs={4} alignItems="center" direction="row">
              <div>
                <DialogTitle>Filters</DialogTitle>
              </div>
            </Grid>
            <Grid container item xs={4} direction="row" justifyContent="flex-end" alignItems="flex-start">
              <div>
                <Button style={{ maxWidth: '90px', maxHeight: '30px' }} variant="text" onClick={ props.clearFilters }>Reset</Button>
              </div>
            </Grid>
          </Grid>
          <DialogContent>

            <div>
              <div>
                { Object.keys( props.suggestedCategories).length > 0 ? <BfCategories suggestedCategories={ props.suggestedCategories } handleSuggestedCategoriesBf={ props.handleSuggestedCategoriesBf } lessThanFive={ props.lessThanFive } quickWalk={ props.quickWalk} handleQuickBf={ props.handleQuickBf } /> : null }
              </div>
            </div>

            <Grid container display="flex" direction="column">
              <FormControl>
                <Grid container item xs={12}></Grid>
                <Grid container item xs={12} alignContent="center" justifyContent="center">
                  <FormLabel id="demo-controlled-rad io-buttons-group">Maximum Walking Duration</FormLabel>
                </Grid>
                <Grid container item direction="column" xs={12} alignContent="flex-start" justifyContent="flex-start">
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
                </Grid>
              </FormControl>
              <Grid item xs={12} style={{color: 'white', fontSize: '36px'}}>
                xx
              </Grid>
            </Grid>

            <Grid container direction="row" justifyContent="center">
              <FormControl component="fieldset" variant="standard">
                <Grid container item xs={12} alignContent="center" justifyContent="center">
                  <FormLabel>Price</FormLabel>
                </Grid>
                <Grid container item xs={12}>
                  <FormGroup row>
                    <FormControlLabel control={ <Checkbox /> } sx={{ '& .MuiSvgIcon-root': { fontSize: 32 }}} label="Free" labelPlacement="end" name="free" checked={ props.price.free } onChange={ props.handlePrice} />
                    <FormControlLabel control={ <Checkbox /> } sx={{ '& .MuiSvgIcon-root': { fontSize: 32 }}} label="$" labelPlacement="end" name="$" checked={ props.price.$ } onChange={ props.handlePrice} />
                    <FormControlLabel control={ <Checkbox /> } sx={{ '& .MuiSvgIcon-root': { fontSize: 32 }}} label="$$" labelPlacement="end" name="$$" checked={ props.price.$$ } onChange={ props.handlePrice} />
                    <FormControlLabel control={ <Checkbox /> } sx={{ '& .MuiSvgIcon-root': { fontSize: 32 }}} label="$$$" labelPlacement="end" name="$$$" checked={ props.price.$$$ } onChange={ props.handlePrice} />
                  </FormGroup>
                </Grid>
              </FormControl>
              <Grid item xs={12} style={{color: 'white', fontSize: '36px'}}>
                xx
              </Grid>
            </Grid>

            <Grid container display="flex" direction="column">
              { Object.keys( props.categoriesChecked).length > 0 ? <AllCategories categoriesChecked={ props.categoriesChecked } handleAllCategories={ props.handleAllCategories } /> : null }
            </Grid>

          </DialogContent>

          <Grid container justifyContent="center">
            <Grid container item xs={12} justifyContent="center">
              <DialogActions>
                <Button style={{ maxWidth: '180px', maxHeight: '30px' }} variant="contained" color="secondary" onClick={ props.handleBigFilterApply }>Apply Filters</Button>
              </DialogActions>
            </Grid>
          </Grid>

        </Dialog>
      </div>
  )
}



  export default BigFilter;
