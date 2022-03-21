import React from "react";
import { Route, Switch } from "react-router-dom"; //make sure to import all the components.
import Layout from "./hoc/layout";
import Home from "./containers/Home/Home.js";
import Header from "./components/Header_Footer/Header";
import UserShoppingCart from "./containers/UserShoppingCart/UserShoppingCart"



import { connect } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Shop from './containers/Shop/Shop';
import ShopForProducts from './containers/Shop/ShopForProducts/ShopForProducts'
import Product from "./containers/Product/Product"
import Login from "./containers/Login/Login"
import SignUp from "./containers/SignUp/SignUp"
import VerifyEmail from "./containers/VerifyEmail/VerifyEmail"
import {CSSTransition, TransitionGroup} from "react-transition-group";



// The order of the routes matters
function Routes() {
	return (
		<Layout>
			{/* <Route render={({location}) => (
						<TransitionGroup>
						<CSSTransition
						key={location.key}
							timeout={3000}
							className="fade"
						> */}
						<Switch>
							<Route path="/" exact component={Home} />
							<Route path="/shop" exact component={Shop} />
							<Route path="/shop/products" exact component={ShopForProducts} />
							<Route path="/product" exact component={Product} />
							<Route path="/shoppingCart" exact component={UserShoppingCart} />
							<Route path="/login" exact component={Login} />
							<Route path="/signup" exact component={SignUp} />
							<Route path="/verify/:id" component={VerifyEmail} />
			
			
						</Switch>
						{/* </CSSTransition>
						</TransitionGroup>
			)}/> */}
	
		</Layout>
	);
}

// export default Routes;

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Routes);
