import React from 'react';

var Directions = (props) => {
    return(
        props.directions.map((direction, index) => {
            return (
                <p key ={index}>
                    <span > {index + 1}. {direction}  </span>
                    <br></br>
                </p>
            )
        })
    )
}

export default Directions;