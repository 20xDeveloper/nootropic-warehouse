import React, { Component } from 'react'
import { connect } from 'react-redux'
import Carousel from '../../components/Carousel/Carousel'
import "./Home.scss"
import axios from "axios";
import BestSeller from "../../components/BestSeller/BestSeller"
import NewsLetter from "../../components/NewsLetter/NewsLetter"
import Banner from "../../components/Banner/Banner"
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';


// import Animate from '../../hoc/Animate'
import { MDBAnimation } from "mdbreact";
import * as firebase from "firebase"
import {  MDBRow, MDBCol, MDBCard, MDBCardImage, MDBCardBody, MDBBadge } from "mdbreact";
import FadeIn from 'react-fade-in';




export class Home extends Component {
    state = {
        bestSellers: [],
        on_sale_products_in_JSX: []
    }

    async componentDidMount(){
        try {
            // Set up the banner
            let getBestSellersAPIEndPoint = this.props.API_URL + "/products/best-seller" 
            let getBestSellersAPIResponse = await axios.get(getBestSellersAPIEndPoint)
        
          let bestSellers = getBestSellersAPIResponse.data.bestSellers_with_category_name_and_primary_image
          let on_sale_products = getBestSellersAPIResponse.data.on_sale_products_with_primary_image_and_average_rating

          // Create the list of best sellers using the "BestSellerProductCard" component
        //   let list_of_best_sellers_components = []

        //   for(const best_seller of bestSellers){
        //     let firebase_image_url = await this.get_product_image_from_fire_base(best_seller.primary_image)
                
        //     let best_seller_component = <BestSeller
        //           productCategory={best_seller.productCategory}
        //           productName={best_seller.productName}
        //           productPrice={best_seller.productPrice}
        //           productImage={firebase_image_url}
        //         />

        //     list_of_best_sellers_components.push(best_seller_component)
        //   }


        //   // get the list of on sale products and put them with JSX
        //   let on_sale_products_in_JSX = []
        //   console.log("here is the value for on_sale_products ", on_sale_products)
        //   for(const on_sale_product of on_sale_products){
        //       let product_fire_base_image_url = await this.get_product_image_from_fire_base(on_sale_product.primary_image)
        //       let on_sale_product_in_JSX = 
  
        //           <div class="on-sale-product-wrapper">
        //               <div class="on-sale-product-container">
        //                   <img class="d-block on-sale-product" src={product_fire_base_image_url} alt="First slide"/>
                          
        //               </div>
        //               <div class="on-sale-product-details-wrapper">
        //                   <h4>{on_sale_product.name}</h4>
        //                   <Rating
        //                       name="customized-empty"
        //                       defaultValue={on_sale_product.average_rating}
        //                       precision={0.5}
        //                       readOnly
        //                       emptyIcon={<StarBorderIcon fontSize="inherit" />}
        //                   /><br />
        //                   <h4>${on_sale_product.price}</h4>
        //                   </div>
        //           </div>
  
        //         on_sale_products_in_JSX.push(on_sale_product_in_JSX)
        //   }
  



        //    this.setState({bestSellers: list_of_best_sellers_components, on_sale_products_in_JSX})
         
        // Create the list of on sale products in a component
          let on_sale_products_in_component = []
          console.log("here is the value for on_sale_products ", on_sale_products)
          for(const on_sale_product of on_sale_products){
                  let firebase_image_url = await this.get_product_image_from_fire_base(on_sale_product.primary_image)
                
                    let on_sale_product_in_component = <BestSeller
                        productCategory={on_sale_product.product_category}
                        product_average_rating={on_sale_product.product_average_rating}
                        productName={on_sale_product.name}
                        productPrice={on_sale_product.price}
                        productImage={firebase_image_url}
                    />

                    on_sale_products_in_component.push(on_sale_product_in_component)
          }
  


          // remember we call it bestSellers is on sale products. just felt lazy to refactor all the code.
           this.setState({bestSellers: on_sale_products_in_component})
         
         
         
         
           console.log("here is the value for the on sale product ", this.state.on_sale_products_in_JSX)
        } catch (error) {
            console.log("here is the error message form get product information api request ", error.message)
         }
    }

    get_product_image_from_fire_base = async (product_fire_base_image_url) => {
      // Get a reference to the storage service, which is used to create references in your storage bucket
      var storage = firebase.storage();
     
      // Create a storage reference from our storage service
      var storageRef = storage.ref();
      
        // THIS IS HOW YOU RETRIEVE AN IMAGE
        let imageURL = await storageRef.child(product_fire_base_image_url).getDownloadURL()
        return imageURL;
  
 }

  

    render() {
        var bg = require('./images/cool-background.png')
        return (
            <React.Fragment>
                <FadeIn>
            <Carousel/>
            <div class="wow fadeInDown">
                <section className="home-best-seller-banner text-center  wow fadeInDown">
                    {/* <h2 className="h1-responsive font-weight-bold text-center my-5">
                        Our bestsellers
                    </h2> */}
                    {/* <p className="grey-text text-center w-responsive mx-auto mb-5">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit,
                        error amet numquam iure provident voluptate esse quasi, veritatis
                        totam voluptas nostrum quisquam eum porro a pariatur veniam.
                    </p> */}
                    {/* <div class="best-seller-image-wrapper"> */}
                        <div class="best-seller-image"></div>
                    {/* </div> */}
                    {/* <MDBRow>
                        {this.state.bestSellers ? this.state.bestSellers.map((bestSeller, index) => bestSeller) : null}
                        
                    </MDBRow> */}
                </section>
            </div>
            <Banner 
                bannerHeader="About Us"
                bannerDescription="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
                bannerClassNameToGetBackgroundImageThroughCSS="about-us-banner"
             />
            <div class="wow fadeInDown">
                <section className="home-best-seller-banner text-center my-5 wow fadeInDown">
                    <h2 className="h1-responsive font-weight-bold text-center my-5">
                        On Sale
                    </h2>
                    <p className="grey-text text-center w-responsive mx-auto mb-5">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit,
                        error amet numquam iure provident voluptate esse quasi, veritatis
                        totam voluptas nostrum quisquam eum porro a pariatur veniam.
                    </p>
                    {/* <div class="on-sale-products-container">
                {this.state.on_sale_products_in_JSX.length > 0 ? this.state.on_sale_products_in_JSX.map((on_sale_product, index) => {
                        // if(index === 0){
                        //     return <div class="on-sale-product-wrapper-primary">{on_sale_product}</div>
                                
                        // }else{
                            return <div class="on-sale-product-wrapper-primary">{on_sale_product}</div>
                        // }
                     }
                ) :  <div class="no-similar-products-wrapper"><p class="no-similar-products-label">There are no products that are similar.</p></div> }
                </div> */}
                    <MDBRow>
                        {this.state.bestSellers ? this.state.bestSellers.map((bestSeller, index) => bestSeller) : null}
                        
                    </MDBRow>
                </section>
            </div>
            <NewsLetter/>
            </FadeIn>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    API_URL: state.API_URL
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
