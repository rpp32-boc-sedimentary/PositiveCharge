import React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
const _ = require('underscore');

const BfCategories = (props) => {

  return (
    <Grid container direction="column">
      <FormControl component="fieldset" variant="standard">
        <Grid container item xs={12} justifyContent="center">
          <FormLabel>Suggested</FormLabel>
        </Grid>
        <Grid container item xs={12}>
          <FormGroup>
              {_.map(props.suggestedCategories, (val, key) =>
                <FormControlLabel control={<Checkbox />} sx={{ '& .MuiSvgIcon-root': { fontSize: 32 }}} label={ key } labelPlacement="end" name={ key } checked={ val } onChange={props.handleSuggestedCategoriesBf} />
                )}
          </FormGroup>
        </Grid>
            { props.lessThanFive ?
              <Grid container item xs={12}>
                <FormGroup>
                  <FormControlLabel control={ <Checkbox /> } sx={{ '& .MuiSvgIcon-root': { fontSize: 32 }}} label="Quick Walk (5 minutes or less)" labelPlacement="end" checked={ props.quickWalk } onChange={ props.handleQuickBf } name="quickWalk" />
                </FormGroup>
              </Grid>
            : null }
        </FormControl>
        <Grid container item xs={12} style={{color: 'white', fontSize: '36px'}}>
          xx
        </Grid>
    </Grid>
  )
};

export default BfCategories;

