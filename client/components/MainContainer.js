import React, { Component } from 'react';
import axios from 'axios';
import key from '../../config/keys';

class MainContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchingDetails: false,
      photos: [],
      rating: 0,
      price: '',
      businessList: [],
      locationSearched: 'LA'
    }

    // bind functions
    this.showMoreDetail = this.showMoreDetail.bind(this);
  }

  componentDidMount() {
    axios.get(`${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/search?location=${this.state.locationSearched}`, {
      headers: {
        Authorization: `Bearer ${key.API_KEY}`
      },

      params: {
        categories: 'dinner'
      }
    })
      .then((res) => {

        console.log("came back", res.data.businesses);

        let businessArr = [];

        for (let restaurant of res.data.businesses) {
          const businessObj = {
            id: restaurant.id,
            name: restaurant.name,
            address: restaurant.location.display_address[0] + ", " + restaurant.location.display_address[1],
            imageURL: restaurant.image_url,
            yelpURL: restaurant.url
          }

          businessArr.push(businessObj);
        }

        this.setState({
          businessList: businessArr,
        });

        console.log("list", this.state.businessList);

      })
      .catch(err => console.error(err));

  }

  // initializing the initial state
  // ALARM HERE...
  // get initialState() {
  //   return {
  //     fetchingDetails: false,
  //     photos: [],
  //     rating: 0,
  //     price: ''
  //   };
  // }

  // function invoked when the main image is clicked
  showMoreDetail() {
    // get current business detail from yelp api
    axios
      .get(
        `${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/${
        this.props.currentBusiness.id
        }`,
        {
          headers: {
            Authorization: `Bearer ${key.API_KEY}`
          }
        }
      )
      .then(({ data }) => {
        console.log('IN SHOW MORE DETAIL DATA: ', data);
        // store the information to the state
        this.setState({
          fetchingDetails: true,
          // only three photos are passed from the data
          photos: data.photos.slice(),
          rating: data.rating,
          review_count: data.review_count,
          price: data.price
        });
      })
      .catch(err =>
        console.log(
          `App.showMoreDetail: get businesses details from yelp: Error: ${err}`
        )
      );
  }

  // reset the state when next or addFav is clicked
  resetState() {
    this.setState(this.initialState);
  }

  render() {
    console.log("PASSED", this.props)
    console.log("state in MC", this.state)
    // destructuring props
    const { currentBusiness } = this.state;
    const { addFav, moveNext } = this.props;

    // when the image is clicked show details
    // if (this.state.fetchingDetails) {
    //   return (
    //     <main>
    //       <div className='modal details'>
    //         <div>
    //           <img src={this.state.photos[0]} />
    //           <img src={this.state.photos[1]} />
    //           <img src={this.state.photos[2]} />
    //         </div>
    //         <div className='details-content'>
    //           <h3>{currentBusiness.name}</h3>
    //           <p>Address: {currentBusiness.address}</p>
    //           <p>Rating: {this.state.rating}</p>
    //           <p>{this.state.review_count} reviews</p>
    //           <p>Price: {this.state.price}</p>
    //         </div>
    //         <div className='button-group'>
    //           <button
    //             className='fav'
    //             onClick={() => {
    //               addFav();
    //               this.resetState();
    //             }}
    //           >
    //             <i className='fa fa-heart'></i>
    //           </button>
    //           <button
    //             className='next'
    //             onClick={() => {
    //               moveNext();
    //               this.resetState();
    //             }}
    //           >
    //             <i className='fa fa-times'></i>
    //           </button>
    //           <a
    //             className='yelp'
    //             href={currentBusiness.yelpurl}
    //             target='_blank'
    //           >
    //             <i className='fa fa-info'></i>
    //           </a>
    //         </div>
    //       </div>
    //     </main>
    //   );
    // }

    // when image is not clicked, only show the main image and two buttons
    return (
      <main>
        {/* <div className='modal'>
          <img
            className='img-main'
            src={currentBusiness.imageURL}
            onClick={() => this.showMoreDetail()}
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
        </div> */}
        MAIN COMP
      </main>
    );
  }
}

export default MainContainer;
