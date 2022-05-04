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
  } else if (category === 'museum' || 'museums') {
    return 'Museums';
  } else if (category === 'park' || category === 'parks') {
    return 'Parks';
  } else if (category === 'landmarks and historical' || category === 'landmarks & historical') {
    return 'Landmarks and Historical'
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
        <Grid container item xs={12} justifyContent="flex-start">
          <FormGroup>
            {_.map(props.categoriesChecked, (val, key) =>
              <FormControlLabel control={<Checkbox />} sx={{ '& .MuiSvgIcon-root': { fontSize: 32 }}} label={key} labelPlacement="end" name={key} checked={val} onChange={props.handleAllCategories} />
            )}
          </FormGroup>
        </Grid>
      </FormControl>
    )
  }
}

export default AllCategories;
