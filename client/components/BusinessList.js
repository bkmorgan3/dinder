import React, { Component } from 'react';
import Business from './Business';

const BusinessList = props => {
  const { businessList, oneBusiness, addFav } = props;
  console.log("bizl", oneBusiness, addFav)
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
        />



      }
    </div>
  );

}

export default BusinessList;