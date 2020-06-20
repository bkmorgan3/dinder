import React, { Component } from 'react';

const Business = props => {
  console.log("props", props)
  const { addFav } = props;

  return (
    <div>
      <main>
        <div className='modal'>
          <img
            className='img-main'
            src={props.imageURL}
            onClick={props.showMoreDetail}
          />
          <div className='button-group'>
            <button
              className='fav'
              onClick={() => {
                addFav();
              }}
            >
              <i className='fa fa-heart'></i>
            </button>
            <button
              className='next'
              onClick={() => {
                moveNext();
              }}
            >
              <i className='fa fa-times'></i>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}


export default Business;