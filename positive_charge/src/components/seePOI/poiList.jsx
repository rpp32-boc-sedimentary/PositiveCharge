import React from 'react';
import MoreDetails from './moreDetails.jsx'
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import { Table, TableHead, TableBody, TableRow, TableCell, InputLabel, Button, Input, Select, MenuItem } from '@mui/material';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';


const PoiList = (props) => {

  if (props === undefined) {
    return (
      <div className='loading'>Loading POI</div>
    )
  } else if (props.props !== undefined) {
    let eachPOI = props.props.map((item, index) => {

      return (

        <TableRow className='poiItems'>
          <Link to='/moreDetails' className='toMoreDetails' state={{data:item}}><TableCell className='poiName'>
            {item.name}
          </TableCell></Link>
          <Link to='/moreDetails' className='toMoreDetails' state={{data:item}}><TableCell className='likes'>{item.rating !== undefined ? <span className='likes'>{item.rating} yelp rating</span> : <span className='likes'>{item.loves} loves</span>} {item.sponsored === true ? <span className='isSpons'>(sponsored)</span> : <span></span>}</TableCell></Link>
          <Link to='/moreDetails' className='toMoreDetails' state={{data:item}}><TableCell className='distance'>{props.walkTime(item.distance)} min walk</TableCell></Link>
        </TableRow>

      )
    })

    return (
      <Table id='poiTable' stickyHeader>
            <TableHead style={{ backgroundColor: '#4eb5f1' }}>
            <TableRow>
              <TableCell className='poiName'>
                Name
              </TableCell>
              <TableCell className='loves'>
                Loves/Ratings
              </TableCell>
              <TableCell className='walkDist'>
                Distance
              </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
        {eachPOI}
        </TableBody>
        </Table>
    )
  }
  }

export default PoiList;