import React, { Component } from 'react';
import { connect } from 'react-redux';
import './UserShoppingCart.scss'
import { MDBBtn } from "mdbreact";
import * as firebase from "firebase"
import $ from "jquery";
import { MDBInput } from 'mdbreact';

import { NavLink } from "react-router-dom"; //make sure to import all the components.


import * as actionTypes from "../../store/actions";
import ShoppingCartProductView from "../../components/ShoppingCartProductView/ShoppingCartProductView"
import Axios from 'axios-https-proxy-fix';
import FadeIn from 'react-fade-in';

// Dialog dependencies
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
// import StripeCheckout from 'react-stripe-checkout';
import {Elements, StripeProvider, } from 'react-stripe-elements';
import CheckoutForm from '../../components/CheckoutForm/CheckoutForm'


import StripeCheckout from 'react-stripe-checkout';



class UserShoppingCart extends Component {


    state = {
        // User Shopping Cart Tab
        userCartItemsComponent: [],
        tax: 13,
        subTotal: 0,
        total: 0,
        shopping_cart_complete: false,

        // Shipping Details Tab
        listOfShippingRatesInOptionTags: [],
        // You want to hide it if they are not logged in
        hideUserShoppingCart: null,
        // If they are in the shipping details tab of the check out process then set to false
        displayQuantityAndDescription: true,

        // Shipping Details
        firstName: "",
        lastName: "",
        address: "",
        address2: "",
        country: "",
        province: "",
        city: "",
        postalCode: "",
        phoneNumber: "",
        shippingRate: 0,
        isBillingAddressSameAsShipping: false,

        // Billing Details
        firstNameForBilling: "",
        lastNameForBilling: "",
        addressForBilling: "",
        address2ForBilling: "",
        countryForBilling: "",
        provinceForBilling: "",
        cityForBilling: "",
        postalCodeForBilling: "",
        phoneNumberForBilling: "",
        email_address: "",


        shipping_details_complete: false,

        // Other utils
        dialog_content: null,
        redirect: null,

        // credit card information
        credit_card_number: null,
        credit_card_month_exp_date: null, 
        credit_card_year_exp_date: null,
        credit_card_CVC_number: null
    }
  
    submit_order = async () => {
        try{
            let submit_purchase_API_URL = this.props.API_URL + "/cart/checkout"
            let data;
            if(this.state.isBillingAddressSameAsShipping){
                data = {
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    address: this.state.address,
                    address2: this.state.address2,
                    country: this.state.country,
                    province: this.state.province,
                    city: this.state.city,
                    postalCode: this.state.postalCode,
                    phoneNumber: this.state.phoneNumber,
                    email_address: this.state.email_address,
                    // token: this.state.credit_card_number
                    customer_credit_card_number: this.state.credit_card_number,
                    customer_credit_card_exp_month: this.state.credit_card_month_exp_date,
                    customer_credit_card_exp_year: this.state.credit_card_year_exp_date,
                    customer_credit_card_cvc_number: this.state.credit_card_CVC_number,
                }
            }else{
                 data = {
                    firstName: this.state.firstNameForBilling,
                    lastName: this.state.lastNameForBilling,
                    address: this.state.addressForBilling,
                    address2: this.state.address2ForBilling,
                    country: this.state.countryForBilling,
                    province: this.state.provinceForBilling,
                    city: this.state.cityForBilling,
                    postalCode: this.state.postalCodeForBilling,
                    phoneNumber: this.state.phoneNumberForBilling,
                    email_address: this.state.email_address,
                    // token: this.state.credit_card_number
                    customer_credit_card_number: this.state.credit_card_number,
                    customer_credit_card_exp_month: this.state.credit_card_month_exp_date,
                    customer_credit_card_exp_year: this.state.credit_card_year_exp_date,
                    customer_credit_card_cvc_number: this.state.credit_card_CVC_number,
                }
            }
            
            const instance = Axios.create({
                headers: { 'Authorization': "Bearer " + localStorage.getItem('token') }
            });
    
            let submit_purchase_API_response = await instance.post(submit_purchase_API_URL, data)

            // THIS IS WHERE I LEFT OFF
            // if(submit_purchase_API_response.data.message !== undefined){
            //     let redirect = <Redirect to={"/product?productName=" + product_name} />;
            // }
            console.log("here is the api response ", submit_purchase_API_response)
        }catch(error){
            console.log("here is the error message ", error)
        }
    
    }

    async componentDidMount(){
        // Check if user is logged in before getting user cart items from the database
        if(localStorage.getItem("token") === null){
            this.setState({hideUserShoppingCart: "none"})
        }else{
            // so it doesn't stack when you back to the previous step of the check out process
            this.setState({userCartItemsComponent: []}) 



            // get user cart items information
            let getUserCartItemsAPIUrl = this.props.API_URL + "/cart"
                    const instance = Axios.create({
                        headers: { 'Authorization': "Bearer " + localStorage.getItem('token') }
                    });
                    let getUserCartItemsAPIResponse = await instance.get(getUserCartItemsAPIUrl)
                    console.log("here is the respones from getting user cart items ", getUserCartItemsAPIResponse)
                    
                    let userCartItemsInformation = getUserCartItemsAPIResponse.data.userCartItems

                    // get the image of the product and pass it to the child component that will display
                    // the product cart

                    // Get a reference to the storage service, which is used to create references in your storage bucket
                    var storage = firebase.storage();
                    
                    // Create a storage reference from our storage service
                    var storageRef = storage.ref();

                    
                    console.log("here is the user cart item ", userCartItemsInformation)



            // Get the list of products to view to the customer
            // If you look at the product.js component you can see we stored the firebase image url as imageURL
            await userCartItemsInformation.map((userCartItem, index) => (
                // THIS IS HOW YOU RETRIEVE AN IMAGE
                storageRef.child(userCartItem.firebaseImageURL).getDownloadURL().then(imageURL => {
                        
                    this.storeShoppingCartProductViewToState(imageURL, userCartItem.name, userCartItem.description, userCartItem.price, userCartItem.quantity, userCartItem.id)
            
                }).catch(function (error) {
                    console.log("error message from firebase ", error)
                })
                
            )) 
            

            // Get subtotal, shipping, taxes and total set as a state to display when rendering this component

            // get the subtotal for this order
            let subTotal = 0
            userCartItemsInformation.forEach((userCartItem)=>(
                subTotal = subTotal + (userCartItem.price * userCartItem.quantity)
            ))
            let tax = 13 // temporary because I don't know how it works.

            let total = subTotal + tax
            this.setState({subTotal, tax, total})
        }
    }

    unCheckBillingAddressSameAsShipping = async () => {
        this.setState({isBillingAddressSameAsShipping: !this.state.isBillingAddressSameAsShipping})
        $('.billingAddress-checkbox').attr('checked', false); // Checks it
    }

    // Used when updated the quantity of a product
    reCalculateCost = async () => {
        console.log("we made it to re calculate the cost function ")
          // get user cart items information
          let getUserCartItemsAPIUrl = this.props.API_URL + "/cart"
          const instance = Axios.create({
              headers: { 'Authorization': "Bearer " + localStorage.getItem('token') }
          });
          let getUserCartItemsAPIResponse = await instance.get(getUserCartItemsAPIUrl)
          console.log("here is the respones from getting user cart items ", getUserCartItemsAPIResponse)
          
          let userCartItemsInformation = getUserCartItemsAPIResponse.data.userCartItems

            // Get subtotal, shipping, taxes and total set as a state to display when rendering this component

            // get the subtotal for this order
            let subTotal = 0

            // for(let i=0; i < userCartItemsInformation.length; i++  ){
            //     subTotal = subTotal + userCartItemsInformation[i].price

            // }
            // for (const userCartItem of userCartItemsInformation) {
            //     subTotal = subTotal + userCartItem.price
            // }

            userCartItemsInformation.forEach((userCartItem)=>(
                subTotal = subTotal + (userCartItem.price * userCartItem.quantity)
            ))
                console.log("here is the value for the sub total ", subTotal)
            let tax = 13 // temporary because I don't know how it works.

            let total = subTotal + tax + parseInt(this.state.shippingRate)
            this.setState({subTotal, tax, total})
    }
   

    // this will be the function where we save the new updated quantity they did from the child component of ShoppingCartProductView -> InputPage component. 
    goToShippingDetails = async () => {
        $(".checkout-tab-shopping-cart").removeClass('active')
        $(".checkout-tab-payment-options").removeClass('active')

        $(".checkout-tab-shipping-details").addClass('active')

        this.setState({shopping_cart_complete: true}); // this is used to tell the program to now display the next button if they go back using the tab.It breaks. This is my alternative solution.
        await this.setState({displayQuantityAndDescription: false})
        await this.componentDidMount()
        // the above line is where I left off. Go ask on discord why current is always null when using react.createRef()
        // Is this even worth wasting time for? Is there a better and easier alternative that gives the same value as this technique?
        // Step back and think about this and use all the tatics you learned from those programming experience text files if you want to
        // become the best programmer. Get into this habit and you will be a pro debugger and a pro implementer/coder. -- SUPER DUPER IMPORTANT --


        const instance = Axios.create({
            headers: { 'Authorization': "Bearer " + localStorage.getItem('token') }
        });
        let getShippingRatesAPIUrl = this.props.API_URL + "/cart/rates"

        let getShippingRatesAPIResponse = await instance.get(getShippingRatesAPIUrl)

        console.log("here is the value for the api response ", getShippingRatesAPIResponse)
        console.log("here is the value for the the state ", this.state.displayQuantityAndDescription)
        let listOfShippingRates = getShippingRatesAPIResponse.data.shippingRatesCost
        let listOfShippingRatesInOptionTags = listOfShippingRates.map((shippingRate, index) => (
            <option  key={index} value={shippingRate.price}>{shippingRate.name + ": $" + shippingRate.price}</option>
        ))
        this.setState({listOfShippingRatesInOptionTags})
    }

    storeShoppingCartProductViewToState = async (firebaseImageURL, userCartItemName, userCartItemDescription, userCartItemPrice, userCartItemQuantity, userCartItemId) => {
            console.log("here is the key value ", userCartItemId)    
        let userCartItem = <ShoppingCartProductView
                key={userCartItemId}
                productId={userCartItemId}
                productFirebaseImageUrl={firebaseImageURL}
                productName={userCartItemName}
                productDescription={userCartItemDescription}
                productPrice={userCartItemPrice}
                productQuantity={userCartItemQuantity}
                // updateQuantityFunction={this.updateQuantityFunction}
                reCalculateCost={this.reCalculateCost}
                displayQuantityAndDescription={this.state.displayQuantityAndDescription} //now our parent component can call the functions of a child component to change it's state

            />
            let currentListOfUserCartItems = [...this.state.userCartItemsComponent]
            currentListOfUserCartItems.push(userCartItem)
         this.setState({userCartItemsComponent: currentListOfUserCartItems})

    }

    go_to_payment_options = (event) => {
        
        // This is just for getting passed the shipping details to test the payment. -- TEMPORARY --
        let validation_dialog =  <FadeIn><Dialog maxWidth="10000px" style={{width: "100%"}} open={true} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title set-price-dialog-header">
            Validation Success
        </DialogTitle>
        <DialogContent style={{ width: "25rem" }}>
           <p>The information you have provided is valid!</p>
        </DialogContent>
        <DialogActions>
             <a data-toggle="tab" href="#contact-classic" role="tab"
                    aria-controls="contact-classic" aria-selected="false">
            <Button onClick={() => this.setState({dialog_content: null})} color="primary">
                Okay
            </Button>
            </a>
        </DialogActions>
    </Dialog>        
    </FadeIn>


        $(".checkout-tab-shipping-details").removeClass('active')
        $(".checkout-tab-payment-options").addClass('active')
       
        this.setState({shipping_details_complete: true, dialog_content: validation_dialog})

        

        // let list_of_shipping_validation = []
        // if(this.state.firstName === ""){
        //     list_of_shipping_validation.push("first name")
        // }
        //  if(this.state.lastName === ""){
        //     list_of_shipping_validation.push("last name")

        // }
        //  if(this.state.address === ""){
        //     list_of_shipping_validation.push("address")

        // }
        //  if(this.state.country === ""){
        //     list_of_shipping_validation.push("country")
            
        // }
        //  if(this.state.province === ""){
        //     list_of_shipping_validation.push("province")
            
        // }
        //  if(this.state.city === ""){
        //     list_of_shipping_validation.push("city")
            
        // }
        //  if(this.state.postalCode === ""){
        //     list_of_shipping_validation.push("postal code")
            
        // }
        //  if(this.state.phoneNumber === ""){
        //     list_of_shipping_validation.push("phone number")
            
        // }

        // let list_of_billing_validation = []
        // if(this.state.isBillingAddressSameAsShipping === false){

        //     if(this.state.firstNameForBilling === ""){
        //         list_of_billing_validation.push("first name")
        //     }
        //      if(this.state.lastNameForBilling === ""){
        //         list_of_billing_validation.push("last name")

        //     }
        //      if(this.state.addressForBilling === ""){
        //         list_of_billing_validation.push("address")
                
        //     }
        //      if(this.state.countryForBilling === ""){
        //         list_of_billing_validation.push("country")
                
        //     }
        //      if(this.state.provinceForBilling === ""){
        //         list_of_billing_validation.push("province")
                
        //     }
        //      if(this.state.cityForBilling === ""){
        //         list_of_billing_validation.push("city")
                
        //     }
        //      if(this.state.postalCodeForBilling === ""){
        //         list_of_billing_validation.push("postal code")
                
        //     }
        //      if(this.state.phoneNumberForBilling){
        //         list_of_billing_validation.push("phone number")
                
        //     }

           
        // }

        // if(list_of_billing_validation.length > 0 || list_of_shipping_validation > 0){
            
        //     let validation_dialog =  <FadeIn><Dialog maxWidth="10000px" style={{width: "100%"}} open={true} aria-labelledby="form-dialog-title">
        //         <DialogTitle id="form-dialog-title set-price-dialog-header">
        //             Validation Error
        //         </DialogTitle>
        //         <DialogContent style={{ width: "25rem" }}>
        //             <p>Please make sure the following is filled in for shipping details:</p>
        //             <ul>
        //                 {list_of_shipping_validation.map((shipping_validation) => <li>{shipping_validation}</li>)}
        //             </ul>
        //             <p>Please make sure the following is filled in for billing details:</p>
        //             <ul>
        //                 {list_of_billing_validation.map((list_of_billing_validation) => <li>{list_of_billing_validation}</li>)}
        //             </ul>
        //         </DialogContent>
        //         <DialogActions>
        //             <Button onClick={() => this.setState({dialog_content: null})} color="primary">
        //                 Okay
        //             </Button>
        //         </DialogActions>
        //     </Dialog>        
        //     </FadeIn>

        //     this.setState({dialog_content: validation_dialog})

        
        // }
        // else{
        //     let validation_dialog =  <FadeIn><Dialog maxWidth="10000px" style={{width: "100%"}} open={true} aria-labelledby="form-dialog-title">
        //     <DialogTitle id="form-dialog-title set-price-dialog-header">
        //         Validation Success
        //     </DialogTitle>
        //     <DialogContent style={{ width: "25rem" }}>
        //        <p>The information you have provided is valid!</p>
        //     </DialogContent>
        //     <DialogActions>
        //          <a data-toggle="tab" href="#contact-classic" role="tab"
        //                 aria-controls="contact-classic" aria-selected="false">
        //         <Button onClick={() => this.setState({dialog_content: null})} color="primary">
        //             Okay
        //         </Button>
        //         </a>
        //     </DialogActions>
        // </Dialog>        
        // </FadeIn>


        //     $(".checkout-tab-shipping-details").removeClass('active')
        //     $(".checkout-tab-payment-options").addClass('active')
           
        //     this.setState({shipping_details_complete: true, dialog_content: validation_dialog})
       
        // }
        

    }

    credit_card_state_handler = (credit_card_number) => {
        console.log("hey we made it ", credit_card_number)
        this.setState({credit_card_number})
    }

    credit_card_expire_date_state_handler = (credit_card_expire_date) => {
        let split_month_and_year_exp = credit_card_expire_date.split("/")
        let credit_card_month_exp_date = split_month_and_year_exp[0]
        let credit_card_year_exp_date = split_month_and_year_exp[1]

        this.setState({ credit_card_month_exp_date, credit_card_year_exp_date})
    }

    credit_card_cvc_number_state_handler = (credit_card_CVC_number) => {
        this.setState({credit_card_CVC_number})
    }

    render() {
        console.log("here is the value for the shipping rate ", this.state.shippingRate)
        return (
            <React.Fragment>
                {this.state.dialog_content}
                <FadeIn>
                {this.state.hideUserShoppingCart ? <FadeIn><Dialog open={true} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title set-price-dialog-header">
				 Error Message{" "}
			    </DialogTitle>
                    <DialogContent>
                      <DialogContentText >
                                <p>You must be logged in to view your shopping cart. You are now being redirected to the log in page.</p>
                            </DialogContentText>
                            <NavLink to="/login"><Button style={{ float: "right" }} id="set-price-close-button"  color="primary">
                                Okay
                    </Button></NavLink>
                </DialogContent>
            </Dialog> </FadeIn> : null}
        <div style={{display: this.state.hideUserShoppingCart}}class="classic-tabs">
            <ul class="nav tabs-cyan checkout-nav-ul-list row" id="myClassicTab" role="tablist">
                <li class="nav-item col-sm ">
                <a class="nav-link  waves-light active show checkout-navigation-link checkout-tab-shopping-cart" id="profile-tab-classic" data-toggle="tab" href="#profile-classic"
                    role="tab" aria-controls="profile-classic" aria-selected="true">1. Shopping Cart</a>
                </li>
                <li class="nav-item col-sm ">
                <a class="nav-link waves-light checkout-navigation-link checkout-tab-shipping-details" id="follow-tab-classic" data-toggle="tab" href="#follow-classic" role="tab"
                    aria-controls="follow-classic" aria-selected="false" >2. Shipping Details</a>
                </li>
                <li class="nav-item col-sm">
                {/* <a onClick={this.go_to_payment_options} class="nav-link waves-light checkout-navigation-link checkout-tab-payment-options" id="contact-tab-classic" data-toggle="tab" href="#contact-classic" role="tab"
                    aria-controls="contact-classic" aria-selected="false">3. Payment Options</a>
                </li> */}
                <a onClick={this.go_to_payment_options} class="nav-link waves-light checkout-navigation-link checkout-tab-payment-options" id="contact-tab-classic"  role="tab" aria-controls="contact-classic" aria-selected="false">3. Payment Options</a>
                </li>
            </ul>
            <div class="tab-content border-right border-bottom border-left rounded-bottom" id="myClassicTabContent">
            
                <div class="tab-pane fade active show container" id="profile-classic" role="tabpanel" aria-labelledby="profile-tab-classic">
                    <div className="row shopping-cart-row">
                        <div className="col-sm">
                            <h3 >Shopping Cart</h3>
                            <hr />
                                {this.state.userCartItemsComponent ? this.state.userCartItemsComponent.map((userCartItem, index) => userCartItem) : null}
                            <hr />
                            <div class="go-to-shipping-details-button-group">
                        {this.state.shopping_cart_complete === false ? <a onClick={this.goToShippingDetails} data-toggle="tab" href="#follow-classic" role="tab"
                aria-controls="follow-classic" aria-selected="false"><MDBBtn href="#" color="primary">
                            Next
                        </MDBBtn></a> : null}
                            <MDBBtn
                                href="https://www.mdbootstrap.com"
                                target="_blank"
                                color="secondary"
                            >
                                Cancel
                            </MDBBtn>
                            </div>
                        </div>

                        <div className="col-sm">
                            <h3 >Summary</h3>
                            <hr />
                            <h5><b>ENTER COUPON CODE</b></h5>
                            <hr />
                            <div className="row">
                                <h6 className="col-sm">SUBTOTAL</h6>
                                <h6 className="col-sm">${this.state.subTotal}</h6>
                            </div>
                            <div className="row">
                                <h6 className="col-sm">SHIPPING</h6>
                                <h6 className="col-sm">FREE</h6>
                            </div>
                            <div className="row">
                                <h6 className="col-sm">TAXES</h6>
                                <h6 className="col-sm">${this.state.tax}</h6>
                            </div>
                            <hr />
                            <div className="row">
                                <h4 className="col-sm">TOTAL</h4>
                                <h4 className="col-sm">${this.state.total}</h4>
                            </div>
                        </div>

                    </div>

                </div>

                <div class="tab-pane fade" id="follow-classic" role="tabpanel" aria-labelledby="follow-tab-classic">
                <div className="row shopping-cart-row">
                        <div className="col-sm">
                            <h3 >Shipping Details</h3>
                            <hr />
                            <div className="row">
                                <div className="col-sm">
                                    <input onChange={(event) => this.setState({firstName: event.target.value})} placeholder="First Name" type="text" id="exampleForm2" class="form-control shipping-details-form-control"/>
                                </div>
                                <div className="col-sm">
                                    <input  onChange={(event) => this.setState({lastName: event.target.value})} placeholder="Last Name" type="text" id="exampleForm2" class="form-control shipping-details-form-control"/>
                                </div>
                            </div>
                            <input onChange={(event) => this.setState({address: event.target.value})} placeholder="Address" type="text" id="exampleForm2" class="form-control shipping-details-form-control"/>
                            <input onChange={(event) => this.setState({address2: event.target.value})} placeholder="Address 2" type="text" id="exampleForm2" class="form-control shipping-details-form-control"/>
                            <div className="row">
                                <div className="col-sm">
                                    <select class="browser-default custom-select">
                                        <option selected>Country</option>
                                        <option onClick={(event) => this.setState({country: event.target.value})} value="Canada">Canada</option>
                                    </select>
                                </div>
                                <div className="col-sm">
                                    <select class="browser-default custom-select">
                                        <option selected>Province</option>
                                        <option onClick={(event) => this.setState({province: event.target.value})} value="Ontario">Ontario</option>
                                    </select>
                                </div>
                                <div className="col-sm">
                                    <input onChange={(event) => this.setState({city: event.target.value})} placeholder="City" type="text" id="exampleForm2" class="form-control shipping-details-form-control"/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm">
                                    <input onChange={(event) => this.setState({postalCode: event.target.value})} placeholder="Zip/Postal Code" type="text" id="exampleForm2" class="form-control shipping-details-form-control"/>
                                </div>
                                <div className="col-sm">
                                    <input onChange={(event) => this.setState({phoneNumber: event.target.value})} placeholder="Phone Number" type="text" id="exampleForm2" class="form-control shipping-details-form-control"/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm">
                                    <input onChange={(event) => this.setState({email_address: event.target.value})} placeholder="Email Address" type="text" id="exampleForm2" class="form-control shipping-details-form-control"/>
                                </div>
                                
                            </div>
                            <hr />
                            <select onChange={(event) => this.setState({shippingRate: event.target.value}, this.reCalculateCost)} class="browser-default custom-select">
                                        <option selected>Shipping Method</option>
                                        {this.state.listOfShippingRatesInOptionTags.map((shippingRate) => shippingRate)}
                            </select>
                            <hr />
                            <div class="form-check">
                                <input onClick={this.unCheckBillingAddressSameAsShipping} type="checkbox" class="billingAddress-checkbox" id="materialUnchecked" />
                                <label class="form-check-label"  for="materialUnchecked">Billing Address same as Shipping Address</label>
                            </div>

                            {/* Billing Address */}
                            {this.state.isBillingAddressSameAsShipping === false ? <React.Fragment><h3>Billing Details</h3>
                            <hr />
                            <div className="row">
                                <div className="col-sm">
                                    <input onChange={(event) => this.setState({firstNameForBilling: event.target.value})} placeholder="First Name" type="text" id="exampleForm2" class="form-control shipping-details-form-control"/>
                                </div>
                                <div className="col-sm">
                                    <input  onChange={(event) => this.setState({lastNameForBilling: event.target.value})} placeholder="Last Name" type="text" id="exampleForm2" class="form-control shipping-details-form-control"/>
                                </div>
                            </div>
                            <input onChange={(event) => this.setState({addressForBilling: event.target.value})} placeholder="Address" type="text" id="exampleForm2" class="form-control shipping-details-form-control"/>
                            <input onChange={(event) => this.setState({address2ForBilling: event.target.value})} placeholder="Address 2" type="text" id="exampleForm2" class="form-control shipping-details-form-control"/>
                            <div className="row">
                                <div className="col-sm">
                                    <select class="browser-default custom-select">
                                        <option selected>Country</option>
                                        <option onClick={(event) => this.setState({countryForBilling: event.target.value})} value="Canada">Canada</option>
                                    </select>
                                </div>
                                <div className="col-sm">
                                    <select class="browser-default custom-select">
                                        <option selected>Province</option>
                                        <option onClick={(event) => this.setState({provinceForBilling: event.target.value})} value="Ontario">Ontario</option>
                                    </select>
                                </div>
                                <div className="col-sm">
                                    <input onChange={(event) => this.setState({cityForBilling: event.target.value})} placeholder="City" type="text" id="exampleForm2" class="form-control shipping-details-form-control"/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm">
                                    <input onChange={(event) => this.setState({postalCodeForBilling: event.target.value})} placeholder="Zip/Postal Code" type="text" id="exampleForm2" class="form-control shipping-details-form-control"/>
                                </div>
                                <div className="col-sm">
                                    <input onChange={(event) => this.setState({phoneNumberForBilling: event.target.value})} placeholder="Phone Number" type="text" id="exampleForm2" class="form-control shipping-details-form-control"/>
                                </div>
                            </div></React.Fragment> : null}

                            <div class="go-to-shipping-details-button-group">
                            <MDBBtn
                                href="https://www.mdbootstrap.com"
                                target="_blank"
                                color="secondary"
                            >
                                Cancel Order
                            </MDBBtn>
                            { this.state.shipping_details_complete === false  ? 
                        //     <a onClick={(e) => this.go_to_payment_options(e)} data-toggle="tab" href="#contact-classic" role="tab"
                        // aria-controls="contact-classic" aria-selected="false">
                            <MDBBtn onClick={(e) => this.go_to_payment_options(e)}  color="primary">
                                    Next
                                </MDBBtn>
                                // </a> 
                                : null}
                          
                            </div>
                        </div>

                        <div  className="col-sm shipping-details-summary">
                            <h3 >Summary</h3>
                            <hr/>
                            {this.state.userCartItemsComponent ? this.state.userCartItemsComponent.map((userCartItem, index) => userCartItem) : null}
                                
                            <hr />
                            <h5><b>ENTER COUPON CODE</b></h5>
                            <hr />
                            <div className="row">
                                <h6 className="col-sm">SUBTOTAL</h6>
                                <h6 className="col-sm">${this.state.subTotal}</h6>
                            </div>
                            <div className="row">
                                <h6 className="col-sm">SHIPPING</h6>
                                <h6 className="col-sm">${this.state.shippingRate === 0 ? "FREE" : this.state.shippingRate}</h6>
                            </div>
                            <div className="row">
                                <h6 className="col-sm">TAXES</h6>
                                <h6 className="col-sm">${this.state.tax}</h6>
                            </div>
                            <hr />
                            <div className="row">
                                <h4 className="col-sm">TOTAL</h4>
                                <h4 className="col-sm">${this.state.total}</h4>
                            </div>
                        </div>

                    </div>
                </div>

                <div class="tab-pane fade" id="contact-classic" role="tabpanel" aria-labelledby="contact-tab-classic">
                <div className="row shopping-cart-row">
                        <div className="col-sm">
                            <h3 >Payment Method</h3>
                            <hr />
                            {/* <StripeCheckout
                                stripeKey="pk_test_XFOhxgIGMjeRs6zmCJ0sHxrm000gfufxd7"
                                token={this.onToken}
                                billingAddress
                                shippingAddress
                                amount={this.state.total * 100}
                            /> */}
                                <Elements>
                                    <CheckoutForm 
                                        credit_card_state_handler={this.credit_card_state_handler}
                                        credit_card_expire_date_state_handler={this.credit_card_expire_date_state_handler}
                                        credit_card_cvc_number_state_handler={this.credit_card_cvc_number_state_handler}
                                        total={this.state.total}
                                    />
                                </Elements>
                            {/* One day try to integrate paypal here */}
                            <div class="go-to-shipping-details-button-group">
                        <MDBBtn onClick={this.submit_order} href="#" color="primary">
                                Pay Now
                            </MDBBtn>
                            <MDBBtn
                                href="https://www.mdbootstrap.com"
                                target="_blank"
                                color="secondary"
                            >
                                Cancel
                            </MDBBtn>
                            </div>
                        </div>

                        <div  className="col-sm shipping-details-summary">
                            <h3 >Summary</h3>
                            <hr/>
                            {this.state.userCartItemsComponent ? this.state.userCartItemsComponent.map((userCartItem, index) => userCartItem) : null}
                                
                            <hr />
                            <h5><b>ENTER COUPON CODE</b></h5>
                            <hr />
                            <div className="row">
                                <h6 className="col-sm">SUBTOTAL</h6>
                                <h6 className="col-sm">${this.state.subTotal}</h6>
                            </div>
                            <div className="row">
                                <h6 className="col-sm">SHIPPING</h6>
                                <h6 className="col-sm">${this.state.shippingRate === 0 ? "FREE" : this.state.shippingRate}</h6>
                            </div>
                            <div className="row">
                                <h6 className="col-sm">TAXES</h6>
                                <h6 className="col-sm">${this.state.tax}</h6>
                            </div>
                            <hr />
                            <div className="row">
                                <h4 className="col-sm">TOTAL</h4>
                                <h4 className="col-sm">${this.state.total}</h4>
                            </div>
                        </div>

                    </div>
                </div>
            
            </div>
        </div>
        </FadeIn>
        </React.Fragment>

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
)(UserShoppingCart); 