import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';


function Sponsor() {

  const [startDate, setStart] = useState('');
  const [months, setMonths] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { data } = location.state;

  function handleSubmit(e) {
    e.preventDefault();
    console.log('data = ', data)
    // check if yelp id or poi id is passed down
    // if yelp id, add poi
    // poi id, sponsor it

    var poi_id, user_id;
    var yelpId = data.props.id;
    // check if POI exists in DB
    axios.get('/get-poi-user', {
      params: {
        id: data.props.id,
        name: data.props.name
      }
    })
    .then((result) => {
      // if poi exists, get the id's for poi and user
      user_id = result.data.user;
      if (result.data.poi) {
        poi_id = result.data.poi;
        return {user: user_id, poi: poi_id};
      } else {
        // if poi doesn't exist, add the poi
        axios.post('/addPOI', [yelpId])
        .then((poi) => {
          console.log('addPOI result: ', poi);
          poi_id = poi[0].id;
          return {user: user_id, poi: poi_id};
        })
        .catch((err) => {
          console.error(err);
        })
      }
    })
    .catch((err) => {
      console.error(err);
    })
    .then((ids) => {
      console.log('poi_id:', ids.poi, 'user_id', ids.user);
      axios.post('/sponsor', {
        startDate: startDate,
        months: months,
        user: ids.user,
        poi: ids.poi
      })
      .then((res) => {
        // show sponsoring successful message / page with details
        alert(`Thank you!  ${data.props.name} will be sponsored starting on ${startDate}!`);
        navigate(-1, { replace: true })
        return res;
      })
      .catch((err) => {
        console.error(err);
      })
    })
    // immediately check if there are any active sponsors
    .then(() => {
      axios.get('/activate')
      .then((res) => {
        console.log('Activated POIs: ', res);
      })
      .catch((err) => {
        console.error(err);
      })
    })
  }

  // can't get this to work as helper function
  // should be returning a promise but unable to utilize within handleSubmit
  // function getIds(data) {
  //   var yelpId = data.props.id;
  //   axios.get('/get-poi-user', {
  //     params: {
  //       name: data.props.name
  //     }
  //   })
  //   .then((result) => {
  //     console.log('get-poi-user result', result.data)
  //     if (result.data.poi) {
  //       return result.data;
  //     } else {
  //       axios.post('/addPOI', [yelpId])
  //       .then((poi) => {
  //         console.log('addPOI result poi: ', poi);
  //         result.data.poi = poi[0].id;
  //         return result.data;
  //       })
  //       .catch((err) => {
  //         console.error(err);
  //       })
  //     }
  //   })
  //   .catch((err) => {
  //     console.error(err);
  //   })
  // }

  return (
    <Container className="sponsor" maxWidth="sm">
      <Box
        sx={{
          marginTop:8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h4" className="center" sx={{ mb: 1 }}>
          Sponsor this point of interest:
        </Typography>
        <Typography component="h1" variant="h3"  className="center" sx={{ mb: 3, color: '#11730a' }}>
          {data.props.name}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography component="h3" variant="h6" color="text.primary" sx={{ mb: 2 }}>Enter Date Range</Typography>
              <TextField
                type="date"
                name="startDate"
                value={startDate}
                id="startDate"
                label="Starting on"
                onChange={e => setStart(e.target.value)}
                required
                sx={{ width: 220, mb: 2 }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              {/* <label htmlFor="startDate">Starting on: </label>
              <input type="date" name="startDate" value={startDate} onChange={e => setStart(e.target.value)} required></input> */}
              <TextField
                type="number"
                name="months"
                id="months"
                label="Number of months"
                value={months}
                onChange={e => setMonths(e.target.value)}
                required
                sx={{ width: 220 }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              {/* <label htmlFor="months">Number of months: </label>
              <input type="number" name="months" value={months} onChange={e => setMonths(e.target.value)} required></input> */}
            </Grid>
            <Grid item xs={12}>
              <Typography component="h3" variant="h6" color="text.primary" sx={{ mt: 2 }}>Pricing</Typography>
              <Container maxWidth="lg" component="main">
                <Grid container spacing={5} alignItems="flex-end">
                  <Grid
                    item
                    xs={6}
                    // sm={6}
                    // md={4}
                  >
                    <Card>
                      <CardHeader
                        title="Monthly"
                        titleTypographyProps={{ align: 'center' }}
                        sx={{
                          backgroundColor: (theme) =>
                            theme.palette.primary.main
                        }}
                      />
                      <CardContent
                        sx={{
                          bgcolor: (theme) =>
                            theme.palette.primary.light
                            // theme.palette.mode === 'light'
                            // ? theme.palette.grey[200]
                            // : theme.palette.grey[700]
                        }}
                      >
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'basline',
                            mb: 2,
                          }}
                        >
                          <Typography variant="h5" color="text.primary">
                            $5
                          </Typography>
                          <Typography variant="h7" color="text.secondary">
                            /mo
                          </Typography>
                        </Box>
                        <ul>
                          <Typography
                            component="li"
                            variant="subtitle1"
                            align="center"
                          >
                            Prioritized listing
                          </Typography>
                        </ul>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    // sm={6}
                    // md={4}
                  >
                    <Card>
                      <CardHeader
                        title="Yearly"
                        titleTypographyProps={{ align: 'center' }}
                        sx={{
                          backgroundColor: (theme) =>
                            theme.palette.primary.main
                        }}
                      />
                      <CardContent
                        sx={{
                          backgroundColor: (theme) =>
                            theme.palette.primary.light
                        }}
                      >
                      <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'basline',
                            mb: 2,
                          }}
                      >
                        <Typography variant="h5" color="text.primary">
                          $3.75
                        </Typography>
                        <Typography variant="h7" color="text.secondary">
                          /mo
                        </Typography>
                      </Box>
                      <ul>
                        <Typography
                          component="li"
                          variant="subtitle1"
                          align="center"
                        >
                          Prioritized listing
                        </Typography>
                        <Typography
                          component="li"
                          variant="subtitle1"
                          align="center"
                        >
                          25% discount
                        </Typography>
                      </ul>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Container>
              {/* <ul>
                <li>$5 per month (31 day increments from start date)</li>
                <li>$45 per year</li>
              </ul> */}
            </Grid>
            <Grid item xs={12}>
              <Typography component="h3" variant="h6" color="text.primary" sx={{ mb: 2 }}>Enter Payment Information</Typography>
              <Button variant="outlined" color="secondary" sx={{ mr: 2, mb: 2}}>Paypal</Button><br />
              <Button variant="outlined" color="secondary" sx={{ mr: 2, mb: 2}}>Google Pay</Button><br />
              <Button variant="outlined" color="secondary" sx={{ mr: 2, mb: 2}}>Apple Pay</Button><br />
            </Grid>
          </Grid>
          <Button
            type="submit"
            id="sponsor-btn" variant="contained"
            sx={{ mt: 7, mb: 7 }}
            fullWidth
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Container>
  )
}

export default Sponsor;