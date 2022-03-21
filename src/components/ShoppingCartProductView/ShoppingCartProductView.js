import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./ShoppingCartProductView.scss"
import InputPage from "../InputPage/InputPage"
import * as actionTypes from "../../store/actions";
import Axios from "axios"


class ShoppingCartProductView extends Component {
    state={
        reRender: false
    }

    // I know i should probably only have one function to handle both decrease and increase
    // don't feel like refactoring a lot of code. Its too late and therefore i'm just going to go
    // with this sloppy code.
    increaseQuantity = async (event) => {
        console.log("here is the value for key prop ", this.props.productId)
        let updateProductQuantityInUserCartAPIUrl = this.props.API_URL + "/cart/add"
        let data = {
            productId: this.props.productId, // the key contains the product id. Look at userShoppingCart.js file where we created this child component
            typeOfModify: "increase"
        }

        const instance = Axios.create({
            headers: { 'Authorization': "Bearer " + localStorage.getItem('token') }
        });

        let updateProductQuantityInUserCartAPIResponse = await instance.post(updateProductQuantityInUserCartAPIUrl, data)
        this.props.reCalculateCost()
        console.log("i made it to the recalculate cost in increase quantity.")
    }

    decreaseQuantity = async () => {
        let decreaseCartItemQuantityAPIUrl = this.props.API_URL + "/cart/add"
        let data = {
            productId: this.props.productId, // the key contains the product id. Look at userShoppingCart.js file where we created this child component
            typeOfModify: "decrease"
        }

        const instance = Axios.create({
            headers: { 'Authorization': "Bearer " + localStorage.getItem('token') }
        });

        let updateProductQuantityInUserCartAPIResponse = await instance.post(decreaseCartItemQuantityAPIUrl, data)
        this.props.reCalculateCost()

    }

    updateQuantityUsingFixedValue = async (userInputForUpdatingQuantity) => {
        let updateQuantityUsingFixedValueAPIUrl = this.props.API_URL + "/cart/add"
        let data = {
            productId: this.props.productId, // the key contains the product id. Look at userShoppingCart.js file where we created this child component
            typeOfModify: "input",
            userInputForUpdatingQuantity: userInputForUpdatingQuantity
        }

        const instance = Axios.create({
            headers: { 'Authorization': "Bearer " + localStorage.getItem('token') }
        });

        let updateProductQuantityInUserCartAPIResponse = await instance.post(updateQuantityUsingFixedValueAPIUrl, data)
        this.props.reCalculateCost()

    }

    // async componentDidUpdate(prevProps) {
    //     console.log("we made it in the if statement to rerender ")

    //     // Typical usage (don't forget to compare props):
    //     if (this.props.displayQuantityAndDescription !== prevProps.displayQuantityAndDescription) {
    //         console.log("we made it in the if statement to rerender ")
    //         await this.setState({}) // to force re-render. It wasn't happening before so i used this life cycle hook
    //     }
    //   }

    render() {
        console.log("here is the value for the two extra states 1 ", this.props.displayQuantityAndDescription)

        return (
            <div style={this.props.displayQuantityAndDescription ? {paddingBottom: "40%"} : {paddingBottom: "13%"}}>
             <img  class="w-25 float-left rounded" src={this.props.productFirebaseImageUrl} />
             <div class={this.props.displayQuantityAndDescription ? "float-right shopping-cart-product-view-description" : "shopping-cart-product-view-description-shipping-details-styles"}>
                <h3>{this.props.productName}</h3>
                <p>{this.props.displayQuantityAndDescription ? this.props.productDescription : null}</p>
                <p>${ this.props.productPrice}</p>
                    {this.props.displayQuantityAndDescription ? <InputPage
                        productQuantity={this.props.productQuantity}
                        // updateQuantityFunction is used to update the quantity property of userCartItems
                        increaseQuantity={this.increaseQuantity}
                        decreaseQuantity={this.decreaseQuantity}
                        updateQuantityUsingFixedValue={this.updateQuantityUsingFixedValue}
                    /> : this.props.productQuantity + "x" }
                </div>
            </div>
            
        );
    }
}

const mapStateToProps = state => {
	return {
        API_URL: state.API_URL,
        userCartItems: state.userCartItems
	};
};

const mapDispatchToProps = dispatch => {
	return {
		addToCart: product =>
			dispatch({
                type: actionTypes.ADD_TO_CART,
				product: product
			})
	};
};

export default connect(
    mapStateToProps,
)(ShoppingCartProductView);