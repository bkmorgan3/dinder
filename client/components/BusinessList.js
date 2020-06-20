import React, { Component } from 'react';
import Business from './Business';

const BusinessList = props => {
  const { businessList } = props;
  console.log("bizl", businessList)
  return (
    <div>
      {
        businessList.map(biz => (
          < Business
            id={biz.id}
            key={biz.id}
            name={biz.name}
            address={biz.address}
            imageURL={biz.imageURL}
            yelpURL={biz.yelpURL}
          />
        )

        )
      }
    </div>
  );

}

export default BusinessList;