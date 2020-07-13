import React, { Component } from 'react';
import BusinessList from './BusinessList';
import Navbar from './Navbar'
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
      locationSearched: 'LA',
      isLoading: true,
      error: '',
      currentIndex: 0,
      favs: [],
      offsetBy: 20
    }

    // bind functions
    this.showMoreDetail = this.showMoreDetail.bind(this);
    this.addFav = this.addFav.bind(this);
    this.moveNext = this.moveNext.bind(this);
    this.loadBusinesses = this.loadBusinesses.bind(this)
  }

  componentDidMount() {
    this.loadBusinesses(this.state.currentIndex)

  }

  loadBusinesses(index) {
    console.log("INIDE A MATH", index)
    axios.get(`${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/search?location=${this.state.locationSearched}&offset=${index}`, {
      headers: {
        Authorization: `Bearer ${key.API_KEY}`
      },

      params: {
        categories: 'dinner'
      }
    })
      .then((res) => {

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
          businessList: businessArr.concat(businessArr),
          isLoading: false
        })
      })
      .catch(err => {
        console.error(err)
        this.setState({ error: err })
      });
  }

  addFav() {
    let favs = this.state.favs.slice();
    favs.push(this.state.businessList[this.state.currentIndex])
    // console.log("favs", favs)

    this.setState({
      currentIndex: this.state.currentIndex + 1,
      favs
    })
    this.checkForFetch()

    console.log("STATE IS", this.state.favs)
    console.log('this.state.businessList[this.state.currentIndex]: ', this.state.businessList[this.state.currentIndex + 1]);

    // axios.post('/favorites', this.state.businessList[this.state.currentIndex])
    //   .then(res => {
    //     console.log("FAV RES", res);
    //   })
    //   .catch(err => console.error(err));
  }

  moveNext() {
    this.setState({ currentIndex: this.state.currentIndex + 1 })
    this.checkForFetch()
  }

  checkForFetch() {
    console.log("checking!")
    if (this.state.currentIndex === this.state.businessList.length - 2) {
      console.log("baanana")
      this.loadBusinesses(this.state.currentIndex)
    }
  }


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
  // resetState() {
  //   this.setState(this.initialState);
  // }

  render() {
    // destructuring props
    const { businessList, isLoading, currentIndex } = this.state;
    const { addFav, moveNext } = this.props;
    console.log("INdEX", this.state.currentIndex)
    console.log("LENGTH", this.state.businessList.length)

   

    // when image is not clicked, only show the main image and two buttons
    return (
      <div>
          <Navbar />
       {isLoading ? 
    (<div>Loading</div>) :
    (<BusinessList
        showMoreDetail={this.showMoreDetail}
        oneBusiness={businessList[currentIndex]}
        businessList={businessList}
        addFav={this.addFav}
        moveNext={this.moveNext}
      />)
    }
      </div>
    )
   
  }
}


export default MainContainer;
