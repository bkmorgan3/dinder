import React, { Component } from "react";
import Sidebar from "./Sidebar.jsx";
import MainContainer from "./MainContainer.jsx";
import axios from "axios";
import key from "../../config/keys";
import Login from "./Loginpage.jsx";
const LOCATION_SEARCHED = "1600 Main St 1st floor, Venice, CA 90291";
let MAX_SIZE = 0;

class App extends Component {
	constructor() {
		super();
		this.state = {
			businessList: [],
			currentIndex: 0,
			visited: {},
			favs: [],
			fetchingDetails: false,
			isSidebarOpen: false,
			currentUser: "",
			verified: false,
			rerender: false
		};

		this.toggleSidebar = this.toggleSidebar.bind(this);
		this.addFav = this.addFav.bind(this);
		this.deleteFav = this.deleteFav.bind(this);
		this.moveNext = this.moveNext.bind(this);
		this.verify = this.verify.bind(this);
	}

	// function invokes when the show Favs button is clicked in Sidebar
	//login functions
	verify(e) {
		e.preventDefault();
		const user = e.target.username.value;
		const pass = e.target.password.value;

		axios
			.post("/login", { user: user, pass: pass })
			.then(res => {
				if (res.data === "verified") {
					this.setState({ verified: true, currentUser: user, rerender: true });
				}
			})
			.catch(err => console.error);
	}

	toggleSidebar() {
		this.setState({
			isSidebarOpen: !this.state.isSidebarOpen
		});
	}

	// function invokes when the heart button is clicked in MainContainer
	addFav() {
		let favs = this.state.favs.slice();
		let visited = Object.assign(this.state.visited);

		favs.push(this.state.businessList[this.state.currentIndex]);
		visited[this.state.currentIndex] = true;

		let currentIndex = getRandomNum(MAX_SIZE);

		// if currentIndex is already stored in visited, get another one
		while (visited[currentIndex]) {
			currentIndex = getRandomNum(MAX_SIZE);
		}

		this.setState({
			currentIndex,
			visited,
			favs,
			fetchingDetails: false
		});

		// post new favorite which is current business to the database
		axios
			.post("/favorites", {
				business: this.state.businessList[this.state.currentIndex],
				user: this.state.currentUser
			})
			.then(res => {
				console.log(res.data);
			})
			.catch(err => console.error);
	}

	// function invokes when '??' button is clicked in Sidebar
	deleteFav(id) {
		axios
			.delete("/favorites", {
				data: { _id: id }
			})
			.then(res => {
				const updateFavs = this.state.favs.filter(fav => fav._id !== id);
				this.setState({ favs: updateFavs });
			})
			.catch(err => console.error);
	}

	// function invokes when the next button is clicked in MainContainer
	moveNext() {
		let visited = Object.assign(this.state.visited);
		visited[this.state.currentIndex] = true;

		let currentIndex = getRandomNum(MAX_SIZE);
		// if currentIndex is already visited get another one
		while (visited[currentIndex]) {
			currentIndex = getRandomNum(MAX_SIZE);
		}

		this.setState({
			currentIndex,
			visited,
			fetchingDetails: false
		});
	}

	componentDidUpdate() {
		if (this.state.rerender === true) {
			// get data from yelp business endpoint
			axios
				.get(
					`${"https://cors-anywhere.herokuapp.com/"}https://api.yelp.com/v3/businesses/search?location=${LOCATION_SEARCHED}`,
					{
						headers: {
							Authorization: `Bearer ${key.API_KEY}`
						},
						params: {
							categories: "restaurants, All",
							limit: 50
						}
					}
				)
				.then(res => {
					// create state businessList with necessary infos
					let businessList = [];
					for (let restaurant of res.data.businesses) {
						const businessObj = {
							yelpid: restaurant.id,
							name: restaurant.name,
							address:
								restaurant.location.display_address[0] +
								", " +
								restaurant.location.display_address[1],
							imageURL: restaurant.image_url,
							yelpURL: restaurant.url
						};
						businessList.push(businessObj);
					}

					// get favorites from back end database
					axios
						.post("/favorites/fav", { user: this.state.currentUser })
						.then(({ data }) => {
							const favs = data;

							// filtering favs from business list
							const yelpIdArr = [];

							for (const fav of favs) {
								yelpIdArr.push(fav.yelpid);
							}

							const filteredBusinessList = businessList.filter(businessObj => {
								return yelpIdArr.indexOf(businessObj.yelpid) === -1;
							});

							MAX_SIZE = filteredBusinessList.length;
							const currentIndex = getRandomNum(MAX_SIZE);

							this.setState({
								businessList: filteredBusinessList,
								currentIndex,
								favs,
								rerender: false
							});
							// console.log("this.state.businessList: ", this.state.businessList);
							// console.log("this.state.favs: ", this.state.favs);
						})
						.catch(err =>
							console.log(`App.componentDidMount: get favorites: Error: ${err}`)
						);
				})
				.catch(err =>
					console.log(
						`App.componentDidMount: get businesses from yelp: Error: ${err}`
					)
				);
		}
	}

	render() {
		if (this.state.verified === false) {
			return (
				<div>
					<Login verification={this.verify} />
				</div>
			);
		}
		if (this.state.businessList.length === 0) {
			return <h1 style={{ textAlign: "center" }}>Loading...</h1>;
		}

		return (
			<div>
				<Sidebar
					favs={this.state.favs}
					isSidebarOpen={this.state.isSidebarOpen}
					toggleSidebar={this.toggleSidebar}
					deleteFav={this.deleteFav}
				/>
				<MainContainer
					currentBusiness={this.state.businessList[this.state.currentIndex]}
					addFav={this.addFav}
					moveNext={this.moveNext}
				/>
			</div>
		);
	}
}

function getRandomNum(max) {
	return Math.floor(Math.random() * max);
}

export default App;
