import React, { Component } from "react";
import { connect } from 'react-redux'
import Header from "../components/Header_Footer/Header";
import Footer from "../components/Header_Footer/Footer";
import StickyFooter from 'react-sticky-footer';
import axios from "axios"
import * as actionTypes from "../store/actions";

// import Footer from '../components/Header_footer/Footer';

class Layout extends Component {
	componentDidMount = async () => {
		let get_user_data_api_response;
		console.log("token value ", localStorage.getItem("token"))
		if(localStorage.getItem("token") !== null){
			console.log("hey we made it here")
			let get_user_data_API_URL = this.props.API_URL + "/users/me";
		const instance = axios.create({
			headers: {'Authorization': localStorage.getItem("token")}
		  });
		   get_user_data_api_response = await instance.get(get_user_data_API_URL);

		this.props.changeHeaderToDisplayLoggedOut(get_user_data_api_response.data)

		}
		// console.log("23423", get_user_data_api_response.data)
	}


	render() {
		console.log(this.props.children);
		return (
			<React.Fragment>
			<div>
				<Header />
				<div className="page_container">{this.props.children}</div>
				
				<Footer />
			</div>
			{/* <StickyFooter>
			Add any footer markup here
		</StickyFooter> */}
		</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => ({
    API_URL: state.API_URL
})

const mapDispatchToProps = dispatch => {
	return {
     changeHeaderToDisplayLoggedOut: (user_data) => dispatch({type: actionTypes.CHANGE_HEADER_TO_DISPLAY_LOGGED_OUT, user_data }),
	
	};
};


export default connect(mapStateToProps, mapDispatchToProps)(Layout)


// export default Layout;
