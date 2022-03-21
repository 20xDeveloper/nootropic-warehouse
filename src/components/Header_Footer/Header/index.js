import React, { Component } from "react";
import { Route, NavLink, Switch, Redirect } from "react-router-dom"; //make sure to import all the components.

// import Cookies from 'universal-cookie';
import Axios from "axios";

import { connect } from "react-redux";
import * as actionTypes from "../../../store/actions";
import "./header.scss";
import Toggle from "react-toggle";

class Header extends Component {
	
	state = {
		numberOfUserCartItems: 0
	}

	async componentDidMount() {
		const token = localStorage.getItem("token");
		if (token) {
				let getUserCartItemsAPIUrl = this.props.API_URL + "/cart"
				const instance = Axios.create({
					headers: { 'Authorization': "Bearer " + localStorage.getItem('token') }
				});
				let getUserCartItemsAPIResponse = await instance.get(getUserCartItemsAPIUrl)
				console.log("here is the respones from getting user cart items ", getUserCartItemsAPIResponse)
				
				let numberOfUserCartItems = getUserCartItemsAPIResponse.data.userCartItems.length
				this.setState({numberOfUserCartItems})
			}
		}

	logOutHandler = () => {
				 localStorage.clear(); 
				 this.props.changeHeaderToDisplayLoggedIn()
				//  this.setState({})

	}

	render() {
		if(this.props.userAddedCartItem === true){
			this.componentDidMount()
		}
		return (
			<nav class="navbar navbar-expand-lg navbar-light bg-light">
				<div class="col-xl">
					<a class="navbar-brand something" href="#">
						Nootropic Warehouse
					</a>
					<button
						class="navbar-toggler"
						type="button"
						data-toggle="collapse"
						data-target="#navbarNav"
						aria-controls="navbarNav"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span class="navbar-toggler-icon" />
					</button>
				</div>
				<div class="" id="navbarNav">
					<ul class="navbar-nav">
						<li class="nav-item">
							<a class="nav-link header-nav-link" href="#">
								<NavLink to="/" exact>
									Home
								</NavLink>
							</a>
						</li>
					</ul>
				</div>
				<div class="" id="navbarNav">
					<ul class="navbar-nav">
						<li class="nav-item">
							<a class="nav-link header-nav-link" href="#">
								<NavLink to="/About" exact>
									About
								</NavLink>
							</a>
						</li>
					</ul>
				</div>
				<div class="" id="navbarNav">
					<ul class="navbar-nav">
						<li class="nav-item">
							<a class="nav-link header-nav-link" href="#">
								<NavLink to="/shop" exact>
									Shop
								</NavLink>
							</a>
						</li>
					</ul>
				</div>
				<div class="" id="navbarNav">
					<ul class="navbar-nav">
						<li class="nav-item">
							<a class="nav-link header-nav-link" href="#">
								<NavLink to="/new-project" exact>
									Help
								</NavLink>
							</a>
						</li>
					</ul>
				</div>
				<div style={{marginLeft: '3em'}} class="" id="navbarNav">
					<ul class="navbar-nav">
						<li class="nav-item">
					
								{localStorage.getItem("token") ? <a onClick={this.logOutHandler} class="nav-link header-nav-link" href="#">
									Sign out
							</a>: <a onClick={this.logOutHandler} class="nav-link header-nav-link" href="#">
								<NavLink to="/login" exact>
									Sign in 
								</NavLink>
							</a>}
						</li>
					</ul>
				</div>
				
				<div class="" id="navbarNav">
					<ul class="navbar-nav">
					<li class="nav-item">
							<a style={{pointerEvents: "none",
   cursor: "default"}} class="nav-link" href="#">
								|
							</a>
						</li>
					</ul>
				</div>


				<div class="" id="navbarNav">
					<ul class="navbar-nav">
						<li class="nav-item">
							<a class="nav-link header-nav-link" href="#">
							<NavLink to="/shoppingCart" exact>
								<i class="fas fa-shopping-cart"></i>{this.state.numberOfUserCartItems}
								</NavLink>
							</a>
						</li>
					</ul>
				</div>
			{/* <div class="" id="navbarNav">
					<ul class="navbar-nav">
						<li class="nav-item">
							<input class="toggle header-toggle-translation" type="checkbox" />
						</li>
					</ul>
				</div> */}
			</nav>
		);
	}
}

//get the central store and insert it into this component props.
//to access prs it would be this.props.prs
const mapStateToProps = state => {
	return {
		// userCartItems: state.userCartItems,
		isUserLoggedIn: state.isUserLoggedIn,
		userAddedCartItem: state.userAddedCartItem,
		API_URL: state.API_URL
	};
};

const mapDispatchToProps = dispatch => {
	return {
		changeHeaderToDisplayLoggedIn: () => dispatch({type: actionTypes.CHANGE_HEADER_TO_DISPLAY_LOGGED_OUT }),

	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
