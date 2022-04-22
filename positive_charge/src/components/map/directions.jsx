import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

var Directions = (props) => {
    return(
        props.directions.map((direction, index) => {
            return (
                // <p key ={index}>
                //     <span > {index + 1}. {direction}  </span>
                //     <br></br>
                // </p>
                <ListItem key ={direction} disablePadding>
                    <ListItemText primary = {`${index + 1}. ${direction}`} />
                </ListItem>
            )
        })
    )
}

export default Directions;