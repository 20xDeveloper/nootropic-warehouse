import * as actionTypes from "./actions"; //This has the list of actions. Now you don't have to type the string
//value for the action name. That would cause a error if you have a typo

//the initialState when you start the app
const initialState = {
	// userCartItems: [],
	isUserLoggedIn: false,
	userAddedCartItem: false,
	API_URL: "https://terrain-cart.herokuapp.com", 
	// API_URL: "https://terrain-cart.herokuapp.com",
	user_data: null,
	website_URL: "https://nootropic-warehouse.herokuapp.com",
	// website_URL: "https://nootropic-warehouse.herokuapp.com",


};

const reducer = (state = initialState, action) => {
	console.log("here is not updated rooms in the reducer ", state.rooms);

	switch (action.type) {
		case actionTypes.ADD_TO_CART: //ADD_PERSOn value can be found in the action.js file that we imported
			return {
				...state, //this makes it immutable which is a good practice. It means cloning.
				// userCartItems: [...action.updatedCartItems],
				userAddedCartItem: true
			};
		case actionTypes.CHANGE_HEADER_TO_DISPLAY_LOGGED_OUT: //ADD_PERSOn value can be found in the action.js file that we imported
			return {
				...state, //this makes it immutable which is a good practice. It means cloning.
				isUserLoggedIn: !state.isUserLoggedIn,
				user_data: action.user_data

			};
		default:
	}
console.log("user cart items ", state.userCartItems)
	return state;
};

export default reducer;
