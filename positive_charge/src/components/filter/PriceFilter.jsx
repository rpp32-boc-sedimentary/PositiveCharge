import React from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import '../../../src/styles.scss'


const PriceFilter = (props) => {

  return (
    <>
      <Dialog
        open={ props.priceModalState }
        onClose={ props.handlePriceModalState }
        fullWidth={false}
        maxWidth={"sm"}
      >
        <DialogTitle>Select Price Preferences</DialogTitle>
        <DialogContent>
          <form onSubmit={ props.handlePriceApply }>
            <Grid container display="flex" direction="row">
              <Grid container item xs={3}>
                <div className='cksButton'>
                  <label>
                    <input type='checkbox' name='free' checked={ props.price.free } onChange={ props.handlePrice } />
                    <span>Free</span>
                  </label>
                </div>
              </Grid>
              <Grid container item xs={3}>
                <div className='cksButton'>
                  <label>
                    <input type='checkbox' name='$' checked={ props.price.$ } onChange={ props.handlePrice } />
                    <span>$</span>
                  </label>
                </div>
              </Grid>
              <Grid container item xs={3}>
                <div className='cksButton'>
                  <label>
                    <input type='checkbox' name='$$' checked={ props.price.$$ } onChange={ props.handlePrice }  />
                    <span>$$</span>
                  </label>
                </div>
              </Grid>
              <Grid container item xs={3}>
                <div className='cksButton'>
                  <label>
                    <input type='checkbox' name='$$$' checked={ props.price.$$$ } onChange={ props.handlePrice }  />
                    <span>$$$</span>
                  </label>
                </div>
              </Grid>

            </Grid>
            <DialogActions>
              <Grid container>
                <Grid container item xs={6} justifyContent="flex-start">
                  <Button onClick={ props.handlePriceModalState}>Cancel</Button>
                </Grid>
                <Grid container item xs={6} justifyContent="flex-end">
                  <Button type="submit">Save</Button>
                </Grid>
              </Grid>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )

}

export default PriceFilter;

