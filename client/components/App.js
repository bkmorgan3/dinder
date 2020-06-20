// import React, { Component } from 'react';
// import MainContainer from './MainContainer.jsx';
// import axios from 'axios';
// import Login from './Loginpage.jsx';
// const LOCATION_SEARCHED = '1600 Main St 1st floor, Venice, CA 90291';
// import Sidebar from './Sidebar';
// let MAX_SIZE = 0;

// class App extends Component {
//   constructor() {
//     super();
//     this.state = {
//       businessList: [],
//       currentIndex: 0,
//       visited: {},
//       favs: [],
//       fetchingDetails: false,
//       isSidebarOpen: false,
//       currentUser: '',
//       verified: false,
//       rerender: false,
//       dance: false,
//       play: false
//     };

//     this.toggleSidebar = this.toggleSidebar.bind(this);
//     this.addFav = this.addFav.bind(this);
//     this.deleteFav = this.deleteFav.bind(this);
//     this.moveNext = this.moveNext.bind(this);
//     this.verify = this.verify.bind(this);
//     this.secret = this.secret.bind(this);
//     this.pressPlay = this.pressPlay.bind(this);
//     this.audio = new Audio(
//       'https://iringtone.net/rington/file?id=8454&type=sound&name=mp3'
//     );
//   }

//   // function invokes when the show Favs button is clicked in Sidebar
//   //login functions
// verify(e) {
//   console.log("verifiying")
//   e.preventDefault();
//   const username = e.target.username.value;
//   const password = e.target.password.value;

//   axios
//     .post('/login', { username, password })
//     .then(res => {
//       console.log("response is", res)
//       if (res.data === 'verified') {
//         this.setState({ verified: true, currentUser: user, rerender: true });
//       }
//     })
//     .catch(err => console.error(err));
// }

//   toggleSidebar() {
//     this.setState({
//       isSidebarOpen: !this.state.isSidebarOpen
//     });
//   }

//   // function invokes when the heart button is clicked in MainContainer
//   addFav() {
//     let favs = this.state.favs.slice();
//     let visited = Object.assign(this.state.visited);

//     favs.push(this.state.businessList[this.state.currentIndex]);
//     visited[this.state.currentIndex] = true;

//     let currentIndex = getRandomNum(MAX_SIZE);

//     // if currentIndex is already stored in visited, get another one
//     while (visited[currentIndex]) {
//       currentIndex = getRandomNum(MAX_SIZE);
//     }

//     this.setState({
//       currentIndex,
//       visited,
//       favs,
//       fetchingDetails: false
//     });

//     // post new favorite which is current business to the database
//     axios
//       .post('/favorites', {
//         business: this.state.businessList[this.state.currentIndex],
//         user: this.state.currentUser
//       })
//       .then(res => {
//         console.log(res.data);
//       })
//       .catch(err => console.error);
//   }

//   // function invokes when '??' button is clicked in Sidebar
//   deleteFav(yelpid) {
//     axios
//       .delete('/favorites', {
//         data: { currentUser: this.state.currentUser, yelpid }
//       })
//       .then(res => {
//         const updateFavs = this.state.favs.filter(fav => fav.yelpid !== yelpid);
//         this.setState({ favs: updateFavs });
//         console.log(res.data);
//       })
//       .catch(err => console.error);
//   }

//   // function invokes when the next button is clicked in MainContainer
//   moveNext() {
//     let visited = Object.assign(this.state.visited);
//     visited[this.state.currentIndex] = true;

//     let currentIndex = getRandomNum(MAX_SIZE);
//     // if currentIndex is already visited get another one
//     while (visited[currentIndex]) {
//       currentIndex = getRandomNum(MAX_SIZE);
//     }

//     this.setState({
//       currentIndex,
//       visited,
//       fetchingDetails: false
//     });
//   }

//   secret() {
//     this.setState({ dance: !this.state.dance });
//   }

//   pressPlay() {
//     this.setState({ play: true });
//     this.audio.play();
//   }

//   componentDidMount() {
//     // get data from yelp business endpoint
//     axios
//       .get(
//         `${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/search?location=${LOCATION_SEARCHED}`,
//         {
//           headers: {
//             Authorization: `Bearer ${process.env.API_KEY}`
//           },

//           params: {
//             categories: 'restaurants, All',
//             limit: 50
//           }
//         }
//       )
//       .then(res => {
//         // create state businessList with necessary infos
//         let businessList = [];
//         for (let restaurant of res.data.businesses) {
//           const businessObj = {
//             yelpid: restaurant.id,
//             name: restaurant.name,
//             address:
//               restaurant.location.display_address[0] +
//               ', ' +
//               restaurant.location.display_address[1],
//             imgurl: restaurant.image_url,
//             yelpurl: restaurant.url
//           };
//           businessList.push(businessObj);
//         }

//         // get favorites from back end database
//         axios
//           .post('/favorites/fav', { user: this.state.currentUser })
//           .then(({ data }) => {
//             const favs = data;

//             // filtering favs from business list
//             const yelpIdArr = [];

//             for (const fav of favs) {
//               yelpIdArr.push(fav.yelpid);
//             }

//             const filteredBusinessList = businessList.filter(businessObj => {
//               return yelpIdArr.indexOf(businessObj.yelpid) === -1;
//             });

//             MAX_SIZE = filteredBusinessList.length;
//             const currentIndex = getRandomNum(MAX_SIZE);

//             this.setState({
//               businessList: filteredBusinessList,
//               currentIndex,
//               favs,
//               rerender: false
//             });
//             // console.log("this.state.businessList: ", this.state.businessList);
//             // console.log("this.state.favs: ", this.state.favs);
//           })
//           .catch(err =>
//             console.log(`App.componentDidMount: get favorites: Error: ${err}`)
//           );
//       })
//       .catch(err =>
//         console.log(
//           `App.componentDidMount: get businesses from yelp: Error: ${err}`
//         )
//       );
//   }

//   render() {
//     console.log(this.state)
//     // if (this.state.verified === false) {
//     //   return (
//     //     <main>
//     //       <Login verification={this.verify} />
//     //     </main>
//     //   );
//     // }
//     // if (this.state.businessList.length === 0) {
//     //   return (
//     //     <main>
//     //       <div className='modal'>
//     //         <h1>Loading...</h1>
//     //       </div>
//     //     </main>
//     //   );
//     // }

//     let dance = this.state.dance ? 'dance' : '';

//     return (
//       <div className={`container ${dance}`}>
//         {/* <Sidebar
//           favs={this.state.favs}
//           isSidebarOpen={this.state.isSidebarOpen}
//           toggleSidebar={this.toggleSidebar}
//           deleteFav={this.deleteFav}
//           dance={this.state.dance}
//           secret={this.secret}
//           pressPlay={this.pressPlay}
//         />
//         <MainContainer
//           currentBusiness={this.state.businessList[this.state.currentIndex]}
//           addFav={this.addFav}
//           moveNext={this.moveNext}
//         /> */}
//         APP
//       </div>
//     );
//   }
// }

// function getRandomNum(max) {
//   return Math.floor(Math.random() * max);
// }

// export default App;









// 


import React, { Component } from 'react';
import Navbar from './Navbar.js';
import MainContainer from './MainContainer.js';
import axios from 'axios';
import key from '../../config/keys';
import Login from './Loginpage.js';
import Signup from './SignupPage'
import Homepage from './Homepage.js';
import Authform from './Authform';
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom';

const locationSearched = '1600 Main St 1st floor, Venice, CA 90291';

class App extends Component {
  constructor() {
    super();
    this.state = {
      businessList: [],
      currentIndex: 0,
      favs: [],
      visited: {},
      fetchingDetails: false,
      isSidebarOpen: false,
      currentUser: '',
      verified: false,
      rerender: false,
      dance: false,
      play: false
    };

    this.showFavs = this.showFavs.bind(this);
    this.moveNext = this.moveNext.bind(this);
    this.verify = this.verify.bind(this)
  }
  verify(e) {
    console.log("verifiying")
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    axios
      .post('/api/auth/login', { username, password })
      .then(res => {
        console.log("response is", res.data)
        if (res.data.token) {
          localStorage.setItem("token", res.data.token)
          this.setState({ verified: true, currentUser: res.data.username })
        }
      })
      .catch(err => console.error(err));
  }
  // SIGN UP ROUTE NEEDED!!!!!

  submit(e) {
    e.preventDefault();
  }

  showFavs() {
    console.log('showFavs is clicked');
  }



  moveNext() {
    this.setState({ currentIndex: this.state.currentIndex + 1 })
    console.log('moveNext is clicked');
  }



  render() {
    const { verified } = this.state
    // if (this.state.verified === false) {
    //   return (
    //     <main>
    //       <Login verification={this.verify} />
    //     </main>
    //   );
    // }
    // if (this.state.businessList.length === 0) {
    //   return (
    //     <div>
    //       <h1>LOADING...</h1>
    //     </div>
    //   )
    // }

    return (
      <div>
        <Router>
          <Switch>

            <Route
              path="/login"
              render={props =>
                !verified ? (
                  <Login {...props} verification={this.verify} />
                ) : (<Redirect to="/homepage" />)
              }
            />

            <Route
              path="/signup"
              render={props =>
                !verified ? (
                  <Signup {...props} />
                ) : (<Redirect to="/homepage" />
                  )
              }
            />

            <Route
              path="/homepage"
              render={props =>
                verified ? (
                  <MainContainer {...props} />
                ) : (
                    <Redirect to="/login" />
                  )}
            />

            <Route
              exact
              path="/"
              render={props =>
                !verified ? (
                  <Login {...props} verification={this.verify} />
                ) : (
                    <Redirect to="/homepage" />
                  )} />

          </Switch>
        </Router>
      </div>
    )
  }

}

export default App;