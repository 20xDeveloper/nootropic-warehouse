import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./shop.scss"
import Categories from "./Categories/Categories"
import Carousel from '../../components/Carousel/Carousel'
import Axios from 'axios';
import ProductCard from '../../components/BestSeller/BestSeller'
import * as firebase from "firebase"
import Banner from "../../components/Banner/Banner"
import NewsLetter from "../../components/NewsLetter/NewsLetter"
import FadeIn from 'react-fade-in';




function mapStateToProps(state) {
    return {
        API_URL: state.API_URL
    };
}

class Shop extends Component {
    state = {
        products: []
    }

    async componentDidMount(){
        let getShopProductsAPIUrl = this.props.API_URL + "/products"
        let data = {
            shopId: 12
        }
        let getShopProductsAPIResponse = await Axios.post(getShopProductsAPIUrl, data)

        let thisShopProducts = getShopProductsAPIResponse.data.thisShopProducts
       
        // Get a reference to the storage service, which is used to create references in your storage bucket
        var storage = firebase.storage();
        
        // Create a storage reference from our storage service
        var storageRef = storage.ref();
      
        const storeTheProducts = thisShopProducts.map((product, index) => (
            storageRef.child(product.firebaseImageURL).getDownloadURL().then(imageURL => {
                this.storeProductsIntoStateWithImage(product.productCategory, product.productName, product.productPrice, imageURL)
                    
                  
                    }).catch(function (error) {
                        console.log("error message from firebase ", error)
                    })
                ));

    }

    storeProductsIntoStateWithImage = (productCategory, productName, productPrice, productImage) => {
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


    render() {
        return (
            <React.Fragment>
                <FadeIn>
            <div className="search-product-container wow fadeInDown">
                <h1 className="search-product-header">
                    Become your best version now!
                </h1>
                {/* <form class="form-inline active-purple-4">
                    <input class="form-control form-control-sm mr-3 w-75 search-product-input-field" type="text" placeholder="Search"
                        aria-label="Search"/>
                    <i class="fas fa-search" aria-hidden="true"></i>
                </form> */}
            </div>
            <Categories/>
            <Banner
                bannerHeader="What's unique about our products?"
                bannerDescription="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
                bannerClassNameToGetBackgroundImageThroughCSS="about-our-product"
                // searchIncluded={false}
           />
            <NewsLetter/>
            {/* {this.state.products ? this.state.products.map((product, index) => product) : null} */}
            </FadeIn>
            </React.Fragment>
        );
    }
}

export default connect(
    mapStateToProps,
)(Shop);