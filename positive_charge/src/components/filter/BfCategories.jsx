import React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
const _ = require('underscore');

const BfCategories = (props) => {

  return (
    <FormControl component="fieldset" variant="standard">
      <FormLabel>Suggested</FormLabel>
      <FormGroup>
          {_.map(props.suggestedCategories, (val, key) =>
            <FormControlLabel control={<Checkbox />} sx={{ '& .MuiSvgIcon-root': { fontSize: 32 }}} label={ key } labelPlacement="end" name={ key } checked={ val } onChange={props.handleSuggestedCategoriesBf} />
          )}
          { props.lessThanFive ?
                  <FormGroup>
                    <FormControlLabel control={ <Checkbox /> } sx={{ '& .MuiSvgIcon-root': { fontSize: 32 }}} label="Quick Walk (5 minutes or less)" labelPlacement="end" checked={ props.quickWalk } onChange={ props.handleQuickBf } name="quickWalk" />
                  </FormGroup>
          : null }
        </FormGroup>
      </FormControl>
  )
};

export default BfCategories;

