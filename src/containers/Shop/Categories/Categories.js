import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  MDBRow, MDBCol, MDBCard, MDBCardImage, MDBCardBody, MDBBadge } from "mdbreact";
import axios from "axios";
import Category from "./Category/Category"
import * as firebase from "firebase"
import FadeIn from 'react-fade-in';



function mapStateToProps(state) {
    return {
        API_URL: state.API_URL
    };
}

class Categories extends Component {
  state = {
    listOfCategories: []
  }

    async componentDidMount(){
        let getCategoriesAPIUrl = this.props.API_URL + "/category"
        let data = {
          shopId: 12
        }
        let getCategoryAPIResponse = await axios.post(getCategoriesAPIUrl, data)
        console.log("get category api response ", getCategoryAPIResponse)
        let categories = getCategoryAPIResponse.data.categories

         // Initializing firebase
         // Get a reference to the storage service, which is used to create references in your storage bucket
         var storage = firebase.storage();
        
         // Create a storage reference from our storage service
         var storageRef = storage.ref();
         console.log("firebase image url for category ", categories[0].firebaseImageURL)

        const storeCategories = await categories.map((category, index) => (
          storageRef.child(category.firebaseImageURL).getDownloadURL().then(imageURL => {
        
      
            this.storeCategoriesIntoStateWithImage(category.name, imageURL, index)
    
          }).catch(function (error) {
            console.log("error message from firebase ", error.message)
          })


         
        ));

  
    }

    storeCategoriesIntoStateWithImage = (categoryName, imageURL, index) => {
        let category = <Category
        key={index}
          categoryName={categoryName}
          categoryFirebaseImageURL={imageURL}
        />
      let currentListOfCategories = this.state.listOfCategories //it has an s at the end. it's referring to the state NOT the variable i declared at the start of this fucntion
      currentListOfCategories.push(category)
      this.setState({listOfCategories: currentListOfCategories})
    }

    render() {
      let categories = this.state.listOfCategories;
      console.log("categories , ", categories)
        return (
          <FadeIn>
            <section class="text-center my-5 wow fadeInLeft">
            
              <h2 class="h1-responsive font-weight-bold text-center my-5">Categories</h2>
              <p class="grey-text text-center w-responsive mx-auto mb-5">Lorem ipsum dolor sit amet, consectetur
                adipisicing elit. Fugit, error amet numquam iure provident voluptate esse quasi, veritatis totam voluptas
                nostrum quisquam eum porro a pariatur veniam.</p>
                {/* <Category/> */}
            
              <div class="row">
            
             
            
              {categories.map(category => category)}
                
            
                
            
              </div>
            
            </section>
            </FadeIn>

        );
    }
}

export default connect(
    mapStateToProps,
)(Categories);