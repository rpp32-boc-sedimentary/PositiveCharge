import React from 'react';
import MoreDetails from './moreDetails.jsx'
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';

const PoiList = (props) => {

  if (props === undefined) {
    return (
      <div className='loading'>Loading POI</div>
    )
  } else if (props.props !== undefined) {
    let eachPOI = props.props.map((item, index) => {

      return (
        <div className={item.id} key={index}>
        <span className='listNumber'>{index + 1}</span> <Link to='/moreDetails' style={{textDecoration: 'none'}} state={{data:item}} ><span className='POIName' >{item.name} </span></Link> <span className='likes'>{item.rating !== undefined ? <span className='likes'>{item.rating} yelp rating</span> : <span className='likes'>{item.loves} loves</span>} </span> <span className='distance' >{props.walkTime(item.distance)} min walk</span>
        </div>
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