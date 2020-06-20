import React, { Component } from 'react';
import Business from './Business';

const BusinessList = props => {
  const { businessList, oneBusiness, addFav, moveNext } = props;
  console.log("bizl", oneBusiness, addFav, moveNext)
  return (
    <div>
      {

        < Business
          id={oneBusiness.id}
          key={oneBusiness.id}
          name={oneBusiness.name}
          address={oneBusiness.address}
          imageURL={oneBusiness.imageURL}
          yelpURL={oneBusiness.yelpURL}
          addFav={addFav}
          moveNext={moveNext}
        />



      }
    </div>
  );

}

export default BusinessList;