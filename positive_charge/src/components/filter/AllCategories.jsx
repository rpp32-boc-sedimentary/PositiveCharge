import React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
const _ = require('underscore');


const returnCategory = (category) => {
  if (category === 'food') {
    return 'Food';
  } else if (category === 'cafe' || category === 'cafes') {
    return 'Cafes';
  } else if (category === 'museum' || category === 'Museums') {
    console.log('here')
    return 'Museums';
  } else if (category === 'park' || category === 'parks') {
    return 'Parks';
  } else if (category === 'landmark' || category === 'landmarks and historical' || category === 'landmarks & historical') {
    return 'Landmarks';
  } else if (category === 'other' || category === 'Other') {
    return 'Other';
  }
}

const AllCategories = (props) => {
  if (Object.keys(props.categoriesChecked)[0] === 'undefined') {
    return (
      null
    )
  } else {
    return (
      <FormControl component="fieldset" variant="standard">
        <Grid container item xs={12} justifyContent="center">
          <FormLabel>Categories Available</FormLabel>
        </Grid>
        <FormGroup>
          {_.map(props.categoriesChecked, (val, key) =>
            <FormControlLabel key={ key } control={<Checkbox />} sx={{ '& .MuiSvgIcon-root': { fontSize: 32 }}} label={returnCategory(key)} labelPlacement="end" name={key} checked={val} onChange={props.handleAllCategories} />
          )}
        </FormGroup>
      </FormControl>
    )
  }
}

export default AllCategories;
