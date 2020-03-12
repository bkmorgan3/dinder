import React, { Component } from 'react';
import Navbar from './Navbar.jsx';
import MainContainer from './MainContainer.jsx';
import axios from 'axios';
import key from '../config/keys';

const locationSearched = '1600 Main St 1st floor, Venice, CA 90291';

class App extends Component {
    constructor(){
      super();
      this.state = {
        businessList: [],
        currentIndex: 0,
        favs: [],
      };

      this.showFavs = this.showFavs.bind(this);
      this.addFav = this.addFav.bind(this);
      this.moveNext = this.moveNext.bind(this);
    }

    showFavs() {
        console.log('showFavs is clicked');
    } 

    addFav() {
        let favs = this.state.favs.slice();
        favs.push(this.state.businessList[this.state.currentIndex])

        this.setState({
            currentIndex: this.state.currentIndex + 1,
            favs
        })

        console.log('this.state.businessList[this.state.currentIndex]: ', this.state.businessList[this.state.currentIndex]);

        axios.post('/favorites', this.state.businessList[this.state.currentIndex])
            .then(res => {
                console.log(res);
            })
            .catch(err => console.error);
    }

    moveNext() {
        this.setState({currentIndex: this.state.currentIndex + 1})
        console.log('moveNext is clicked');
    }

    componentDidMount() {
        axios.get(`${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/search?location=${locationSearched}`, {
            headers: {
                Authorization: `Bearer ${key.API_KEY}`
            },

            params: {
                categories: 'dinner'
            }
        }) 
        .then((res) => {

            console.log(res.data.businesses);
            
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

            console.log(this.state.businessList);

        })
        .catch(err => console.error);

    }

    render() {
        if(this.state.businessList.length === 0) {
            return (
                <div>
                    <h1>LOADING...</h1>
                </div>
            )
        }
    
        return (
            <div>
                <h1>Dinder</h1>
                <Navbar showFavs={this.showFavs}/>
                <MainContainer currentBusiness={this.state.businessList[this.state.currentIndex]} addFav={this.addFav} moveNext={this.moveNext} />
            </div>
        )
    }

}

export default App;
