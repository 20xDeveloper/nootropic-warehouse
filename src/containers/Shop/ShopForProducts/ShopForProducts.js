import React, { Component } from 'react';
import { connect } from 'react-redux';
import qs from "query-string";
import Axios from "axios"
import Banner from "../../../components/Banner/Banner"
import * as firebase from "firebase"
import ProductCard from "../../../components/ProductCard/ProductCard"
import NewsLetter from "../../../components/NewsLetter/NewsLetter"
import equal from "deep-equal"
import FadeIn from 'react-fade-in';




function mapStateToProps(state) {
    return {
        API_URL: state.API_URL
    };
}

class ShopForProducts extends Component {
    state = {
        products: [],
        banner: null,
        categoryName: "",
        userSearchInput: ""
    }

    async componentDidMount(){
        // store the query parameter in a variable
        let categoryName = qs.parse(this.props.location.search, {
			ignoreQueryPrefix: true
        }).category;

        // we will be using this in other functions 
        this.setState({categoryName})

        // Get a reference to the storage service, which is used to create references in your storage bucket
        var storage = firebase.storage();
        
        // Create a storage reference from our storage service
        var storageRef = storage.ref();

        // Set the banner
        let getBannerAPIUrl = this.props.API_URL + "/banner"
        let data = {
            categoryName: categoryName
        }

        let getBannerAPIResponse = await Axios.post(getBannerAPIUrl, data)
        let bannerInformation = getBannerAPIResponse.data.bannerInformation
        console.log("get banner api response ", getBannerAPIResponse)

        // THIS IS HOW YOU RETRIEVE AN IMAGE
        storageRef.child(bannerInformation.firebaseImageURL).getDownloadURL().then(imageURL => {
            
            this.storeBannerComponentInState(bannerInformation.bannerHeader, bannerInformation.bannerDescription, imageURL)
    
        }).catch(function (error) {
            console.log("error message from firebase ", error)
        })

            let getAllProductsInTheNootropicCategoryAPIUrl = this.props.API_URL + "/products/category"
            let data2 = {
                categoryName: categoryName
            }
            let getAllProductsInTheNootropicCategoryAPIResponse = await Axios.post(getAllProductsInTheNootropicCategoryAPIUrl, data2)

            const products = getAllProductsInTheNootropicCategoryAPIResponse.data.category_products_with_image;
            
            const storeProducts = await products.map((product, index) => (
                // THIS IS HOW YOU RETRIEVE AN IMAGE
                storageRef.child(product.primary_image).getDownloadURL().then(imageURL => {
            
                    this.storeProductsIntoStateWithImage(categoryName, product.name, product.price, imageURL)
            
                }).catch(function (error) {
                    console.log("error message from firebase ", error)
                })
            ));
    }

    storeBannerComponentInState = async (bannerHeader, bannerDescription, firebaseImageUrl) => {
        let banner = <Banner 
            bannerHeader={bannerHeader}
            bannerDescription={bannerDescription}
            fireBaseImageUrl={firebaseImageUrl}
            extraStyles={{marginBottom: "3rem"}}
            //The below line is all for searching
            searchIncluded={true}
            searchFunction={this.searchForProducts}
            checkIfThePressedEnter={this.checkIfThePressedEnter}
            saveSearchInputValueFromChildComponent={this.saveSearchInputValueFromChildComponent}
        />
        this.setState({banner: banner})
    }

    checkIfThePressedEnter = async (event) => {
        var code = event.keyCode || event.which;
		if (code === 13) { //13 is the enter keycode
			this.searchForProducts()
			console.log("hello world")

		}
    }

    storeProductsIntoStateWithImage = async (productCategory, productName, productPrice, productImage) => {
        let product = <ProductCard
        productCategory={productCategory}
        productName={productName}
        productPrice={productPrice}
    
        productImage={productImage}
    
    
      />
        let currentListOfproducts = this.state.products //it has an s at the end. it's referring to the state NOT the variable i declared at the start of this fucntion
        currentListOfproducts.push(product)
        this.setState({products: currentListOfproducts})
    }

    saveSearchInputValueFromChildComponent = (event) => {
        this.setState({userSearchInput: event.target.value})
    }

    // for some reason when i type fast the results show duplicate
    searchForProducts = async (event) => {
        let searchForProductsAPIUrl = this.props.API_URL + "/products/search"
        let data = {
            searchInput: this.state.userSearchInput,
            useLikeQuery: true
        } 
        let searchForProductsAPIResponse = await Axios.post(searchForProductsAPIUrl, data)

        let newListOfProductsToDisplay = searchForProductsAPIResponse.data.searchProductsResults

            // Get a reference to the storage service, which is used to create references in your storage bucket
            var storage = firebase.storage();
            
            // Create a storage reference from our storage service
            var storageRef = storage.ref();

            // before we go into displaying the new product search results we must clear the products state
            this.setState({products: []})

            console.log("we made it in the if statement")

                await newListOfProductsToDisplay.map((product, index) => (
                    // THIS IS HOW YOU RETRIEVE AN IMAGE
                    storageRef.child(product.firebaseImageURL).getDownloadURL().then(imageURL => {
                
                        this.storeProductsIntoStateWithImage(this.state.categoryName, product.name, product.price, imageURL)
                
                    }).catch(function (error) {
                        console.log("error message from firebase ", error)
                    })
                ));
            


        
        console.log("search results ", searchForProductsAPIResponse)
    }

    render() {
        return (
            <React.Fragment>
                <FadeIn>
                {this.state.banner}
            <div style={{marginBottom: "13em", marginLeft: "1em" }} className="row">
                {this.state.products.map((product) =>
                    product
                )}
            </div>
                <NewsLetter/>
                </FadeIn>
            </React.Fragment>
        );
    }
}

export default connect(
    mapStateToProps,
)(ShopForProducts);