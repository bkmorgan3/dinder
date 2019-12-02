import React, { Component } from "react";
import axios from "axios";
import key from "../../config/keys";

class MainContainer extends Component {
	constructor(props) {
		super(props);
		this.state = this.initialState;

		// bind functions
		this.showMoreDetail = this.showMoreDetail.bind(this);
	}

	// initializing the initial state
	get initialState() {
		return {
			fetchingDetails: false,
			photos: [],
			rating: 0,
			price: ""
		};
	}

	// function invoked when the main image is clicked
	showMoreDetail() {
		// get current business detail from yelp api
		axios
			.get(
				`${"https://cors-anywhere.herokuapp.com/"}https://api.yelp.com/v3/businesses/${
					this.props.currentBusiness.yelpid
				}`,
				{
					headers: {
						Authorization: `Bearer ${key.API_KEY}`
					}
				}
			)
			.then(({ data }) => {
				console.log("IN SHOW MORE DETAIL DATA: ", data);
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
		// destructuring props
		const { currentBusiness, addFav, moveNext } = this.props;

		// when the image is clicked show details
		if (this.state.fetchingDetails) {
			return (
				<div>
					<img src={this.state.photos[0]} height="200" width="200"></img>
					<img src={this.state.photos[1]} height="200" width="200"></img>
					<img src={this.state.photos[2]} height="200" width="200"></img>
					<h3>{currentBusiness.name}</h3>
					<div>Address: {currentBusiness.address}</div>
					<div>Rating: {this.state.rating}</div>
					<div>{this.state.review_count} reviews</div>
					<div>Price: {this.state.price}</div>
					<button
						onClick={() => {
							addFav();
							this.resetState();
						}}
					>
						Heart
					</button>
					<button
						onClick={() => {
							moveNext();
							this.resetState();
						}}
					>
						Next
					</button>
					<a href={currentBusiness.yelpURL} target="_blank">
						Show more in Yelp
					</a>
				</div>
			);
		}

		// when image is not clicked, only show the main image and two buttons
		return (
			<div>
				<img
					src={currentBusiness.imageURL}
					onClick={() => this.showMoreDetail()}
					height="500"
					width="500"
				></img>
				<button
					onClick={() => {
						addFav();
					}}
				>
					Heart
				</button>
				<button
					onClick={() => {
						moveNext();
					}}
				>
					Next
				</button>
			</div>
		);
	}
}

export default MainContainer;
