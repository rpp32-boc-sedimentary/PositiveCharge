import React from 'react';
import MoreDetails from './moreDetails.jsx'
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';

const PoiList = (props) => {

  if (props === undefined) {
    return (
      <div className='loading'>Loading POI</div>
    )
  } else if (props.props !== undefined) {
    let eachPOI = props.props.businesses.map((item, index) => {

      return (
        <Link to='/moreDetails' state={{data:item}} >
        <div key={item.id}>
        <span className='listNumber'>{index + 1}</span><span className='POIName' >{item.name} </span> <span className='likes'>{item.rating} yelp rating </span> <span className='distance' >{props.walkTime(item.distance)} min walk</span>
        </div>
        </Link>
      )
    })

    return (
      <div className='poiList'>
        {eachPOI}
      </div>
    )
  }
  }

export default PoiList;