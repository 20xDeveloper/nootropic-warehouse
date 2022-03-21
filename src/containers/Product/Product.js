import React, { Component } from 'react';
import { connect } from 'react-redux';
import qs from "query-string";
import Axios from "axios"
import * as firebase from "firebase"
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';
// import Rating from "react-rating"
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Review from "../../components/Review/Review"
import * as actionTypes from "../../store/actions";

import { ToastContainer, toast } from "react-toastify";


// You might want to take a look at the redirect component. It might be more useful than NavLink in your context
import { NavLink, Redirect } from "react-router-dom"; //make sure to import all the components.
import "./Product.scss";
import FadeIn from 'react-fade-in';


// Dialog dependencies
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

// Circle animation for loading dialog
import Spinner from 'react-bootstrap/Spinner';

const initialState = {
    productName: "",
    productReviewStars: null,
    productPrice: null,
    productDescription: "",
    similarProducts: [], //we are somehow going to have to do this
    productListOfReviews: [],
    primary_image: null,
    product_images: null,
    reviews: [],
    listOfProductImagesComponents : [],

    // this might be the only state we need for product information
    productInformation: null,

    review_description: null,
    average_rating_for_this_product: null,
    reviews_from_database: null,
    list_of_button_JSX: null,
    list_of_similar_products_in_JSX_format: [],
    redirect: null,
    offset: 0,
    limit: 5,
    list_of_pagination_buttons: []

}

class Product extends Component {
    state = {
        productName: "",
        productReviewStars: null,
        productPrice: null,
        productDescription: "",
        similarProducts: [], //we are somehow going to have to do this
        productListOfReviews: [],
        primary_image: null,
        product_images: null,
        reviews: [],
        listOfProductImagesComponents : [],

        // this might be the only state we need for product information
        productInformation: null,

        review_description: null,
        average_rating_for_this_product: null,
        reviews_from_database: null,
        list_of_button_JSX: null,
        list_of_similar_products_in_JSX_format: [],
        redirect: null,
        offset: 0,
        limit: 5,
        list_of_pagination_buttons: []

    }

    async componentDidMount(){

        // Create the loading dialog
        let dialog_content = <FadeIn><Dialog maxWidth="10000px" style={{width: "100%"}} open={true} aria-labelledby="form-dialog-title">
      <DialogContent>
       <Spinner variant="info" animation="border"/>
     
           

           
        </DialogContent>

    </Dialog>        
    </FadeIn>
    this.setState({dialog_content})

        // store the query parameter in a variable
        let productName = qs.parse(this.props.location.search, {
			ignoreQueryPrefix: true
        }).productName;

        let getProductInformationApiUrl = this.props.API_URL + "/products/search"
        let data = {
            searchInput: productName,
            useLikeQuery: false
        } 

        let getProductInformationApiResponse = await Axios.post(getProductInformationApiUrl, data)

         
        let productInformation = getProductInformationApiResponse.data.searchProductsResults[0]
        let product_images = getProductInformationApiResponse.data.this_product_images;
        // let primary_image = getProductInformationApiResponse.data.primary_image
        let primary_image;
        let list_of_similar_products = getProductInformationApiResponse.data.list_of_similar_products_details

        // Create the list of product images with JSX
        let list_of_product_images_in_JSX_form = []
        let number_of_pages_for_carousel = 0;
        for(const product_image of product_images){
            if(product_image.primary){
                let firebase_image_url = await this.get_product_image_from_fire_base(product_image.firebaseImageURL)
                console.log("secret ", firebase_image_url)
                 primary_image = <div className="carousel-item active product-images-carousel">
                <img class="d-block w-100 product-image" src={firebase_image_url} alt="First slide"/>
            </div>
            number_of_pages_for_carousel++;
            }else{
                let firebase_image_url = await this.get_product_image_from_fire_base(product_image.firebaseImageURL)
                console.log("secret ", firebase_image_url)
                list_of_product_images_in_JSX_form.push(<div className="carousel-item product-images-carousel">
                    <img class="d-block w-100 product-image" src={firebase_image_url} alt="First slide"/>
                </div>)
            number_of_pages_for_carousel++;

            }
        }

        // Create the list of buttons for the carousel
        let list_of_button_JSX = []
        for(let i = 1; i <= number_of_pages_for_carousel; i++){
            list_of_button_JSX.push(<li data-target="#carousel-example-1z" data-slide-to={i} class={i === 1 ? "active" : ""}></li>)

        }

        await this.setState({productInformation, productName: productInformation.name, productPrice: productInformation.price, productDescription: productInformation.description, listOfProductImagesComponents: list_of_product_images_in_JSX_form, primary_image, list_of_button_JSX  })


        await this.get_all_reviews_for_this_product()

        if(this.state.reviews_from_database !== null){
            this.calculate_average_rating();
        }


        console.log("here is hte list of similar_products ", list_of_similar_products)
        // Make the list of similar products with JSX
        let list_of_similar_products_in_JSX_format = []

        for(const similar_product of list_of_similar_products){
            let product_fire_base_image_url = await this.get_product_image_from_fire_base(similar_product.firebaseImageURL)
            let similar_product_in_JSX_format = 
           <a href={this.props.website_URL + "/product?productName=" + similar_product.name}><div class="similar-product-wrapper">
                <div class="product-wrapper">
                    {/* <div class="similar-product-details-container"> */}
                        <img class="d-block similar-product " src={product_fire_base_image_url} alt="First slide"/>
                        <div class="similar-product-details-wrapper">
                        <h4 style={{color: "black"}}>{similar_product.name}</h4>
                        <Rating
                            name="customized-empty"
                            defaultValue={similar_product.average_rating}
                            precision={0.5}
                            readOnly
                            emptyIcon={<StarBorderIcon fontSize="inherit" />}
                        /><br />
                        <h4 style={{color: "black"}}>${similar_product.price}</h4>
                        </div>
                    {/* </div> */}
                </div>
            </div>
        </a>
            list_of_similar_products_in_JSX_format.push(similar_product_in_JSX_format)
        }

        this.setState({list_of_similar_products_in_JSX_format, dialog_content: null})

          
    }

    get_product_image_from_fire_base = async (product_fire_base_image_url) => {
         // Get a reference to the storage service, which is used to create references in your storage bucket
         var storage = firebase.storage();
        
         // Create a storage reference from our storage service
         var storageRef = storage.ref();
         
           // THIS IS HOW YOU RETRIEVE AN IMAGE
           let imageURL = await storageRef.child(product_fire_base_image_url).getDownloadURL()
           return imageURL;
           //    .then(imageURL => {
        //     return imageURL
             // this.storeProductInfomrationInStateWithImage(productInformation.name, productInformation.price, productInformation.description, imageURL)
            //  this.storeProductInfomrationInStateWithImage(imageURL)
        //    }).catch(function (error) {
        //      console.log("error message from firebase ", error)
        //    })
    }

    get_all_reviews_for_this_product = async () => {
        let getReviewsForThisProductApiUrl = this.props.API_URL + "/reviews" 
        let data2 = {
          productIdForTheProductWeAreViewing: this.state.productInformation.id
        }
        let getReviewsForThisProductApiResponse = await Axios.post(getReviewsForThisProductApiUrl, data2)
        let reviews = getReviewsForThisProductApiResponse.data.allReviewsForThisProduct
        console.log("1 sdfsdf", reviews)
        if(reviews.length > 0){
                  let listOfReviewsComponent = await reviews.map((review, index) => (
                      <Review 
                          name={review.reviewerName}
                          createdAt={review.createdAt}
                          rating={review.rating}
                          reviewDescription={review.description}
                      />
          ))

          // Create the list of pagination buttons
          let this_many_pagination_buttons = listOfReviewsComponent.length / 5
          let list_of_pagination_buttons = []
          for(let i = 1; i <= this_many_pagination_buttons; i++){
            let pagination_button = <Button onClick={() => this.paginate_reviews(i)} variant="light">{i}</Button>
            list_of_pagination_buttons.push(pagination_button)
        }
          await this.setState({reviews: listOfReviewsComponent, reviews_from_database: reviews, list_of_pagination_buttons})
        } 
    }

    paginate_reviews = async (page_number) => {
        console.log("here is the page_number ", page_number)
        let updated_offset = this.state.limit * (page_number - 1)
        await this.setState({offset: updated_offset})
    }

    storeProductInfomrationInStateWithImage = async (firebase_image_url ) => {
       
        return firebase_image_url;
        // this.setState({listOfProductImagesComponents: list_of_product_images_in_JSX_form, primary_image})




      

        // if(productInformation.imageUrl){
        //     // THIS IS UNFINISHED. WE NEED TO CREATE A PRODUCT WITH MULTIPLE IMAGES IN THE DATABASE TO TEST THIS
        //     // Get the product images for the carousel to display the list of product images
        //     let listOfProductImages = 
        //     // <div class={listOfProductImages.length === 0 ? "carousel-item active" : "carousel-item"}>
        //     <div className="carousel-item active">
        //         <img style={{height: "100%", width: "100%"}} class="d-block w-100" src={productInformation.imageUrl} alt="First slide"/>
        //     </div>
        //     this.setState({ listOfProductImagesComponents: listOfProductImages})
        // }
            
    }

    componentWillUnmount(){
        this.setState(initialState)
    }

    addToCart = async () => {

        // Check if user is logged in before going any further
        if(localStorage.getItem("token")){
            // store the cart information for this user in the database
            // so when they log in back to their account they will have their cart items
            let addCartItemAPIUrl = this.props.API_URL + "/cart/add"
            let data = {
                productId: this.state.productInformation.id
            }

            const instance = Axios.create({
                headers: { 'Authorization': "Bearer " + localStorage.getItem('token') }
            });

            console.log("just making sure we have the product id ", this.state.productInformation.id)
            let addCartItemAPIResponse = await instance.post(addCartItemAPIUrl, data)
            console.log("here is the api response ", addCartItemAPIResponse)

            this.props.updateCartItems() // Needed to update the number that displays how many items you have in your cart on the header

        }else {
            let redirectToLogInPageDialog = <Dialog open={true} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title set-price-dialog-header">
             Error Message{" "}
            </DialogTitle>
                <DialogContent>
                  <DialogContentText >
                            <p>You must be logged in to add an item to your cart.</p>
                        </DialogContentText>
                        <Button style={{ float: "right" }} id="set-price-close-button" onClick={(event) => this.setState({redirectToLogInPageDialog: null})} color="primary">
                            Cancel
                        </Button>
                        <NavLink to="/login"><Button style={{ float: "right" }} id="set-price-close-button"  color="primary">
                            Log In
                        </Button></NavLink>
                </DialogContent>
        </Dialog>

        this.setState({redirectToLogInPageDialog})
        }

       
    }

    display_add_review_form_dialog = async () => {
        let dialog_content =  <FadeIn><Dialog maxWidth="10000px" style={{width: "100%"}} open={true} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title set-price-dialog-header">
            Add a review
        {/* <Button id="set-price-close-button" onClick={handleClose} color="primary">
                <i class="fa fa-window-close fa-2x" aria-hidden="true" />
            </Button> */}
        </DialogTitle>
        <DialogContent style={{ width: "25rem" }}>
        {/* <DialogContentText>
                <p>
                    Confirm the customer information used with this project.
                </p>
            </DialogContentText> */}
           
            <div class="form-group project-copy-form-group">
                <Rating
            name="customized-empty"
            // defaultValue={average_rating_for_this_product}
            precision={0.5}
            onChange={(event, newValue) => {
                this.setState({selected_rating: newValue})
              }}
            emptyIcon={<StarBorderIcon fontSize="inherit" />}
        />
            </div>
            <div class="form-group project-copy-form-group">
                <textarea
                    rows="4"
                    // style={{width: "50%"}}
                    // cols="25"
                    class="form-control  project-copy-input"
                    onChange={event =>
                        this.setState({review_description: event.target.value})
                    }
                    placeholder="What did you think about the product?"
                />
            </div>
           
        </DialogContent>
        <DialogActions>
            {/* <Button onClick={getProjectInfoToCopyThisProject} color="primary">
                Submit
            </Button>
            <Button onClick={handleClose} color="primary">
                Cancel
            </Button> */}
            <Button onClick={this.add_review } color="primary">
                Submit
            </Button>
            <Button onClick={() => this.setState({dialog_content: null})} color="primary">
                Cancel
            </Button>

        </DialogActions>
    </Dialog>        
    </FadeIn>

        this.setState({dialog_content});

    }

    add_review = async () => {
        console.log("here is the value for the user_data", this.state.user_data)
        if(localStorage.getItem != null){
            if(this.state.selected_rating >= 0.5 ){
                let add_review_API_URL = this.props.API_URL + "/reviews/add-review";
                let data = {
                    userId: this.props.user_data.id,
                    rating: this.state.selected_rating,
                    productId: this.state.productInformation.id,
                    description: this.state.review_description
                }
       
              
                let add_review_API_response = await Axios.post(add_review_API_URL, data)
                console.log("here is the error message from the api reasponse ", add_review_API_response)
    
                toast.success("You have successfully submitted a review!", {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                });
                // -- Get the list of updated reviews after you updated the database --
                this.get_all_reviews_for_this_product();
                this.setState({dialog_content: null})
            }else{
                toast.error("You must rate this review in order to submit it.", {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                });
            }
        }else{
            let dialog_content = <Dialog open={true} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title set-price-dialog-header">
                 Error Message{" "}
                </DialogTitle>
                    <DialogContent>
                      <DialogContentText >
                                <p>You must be logged in to add an item to your cart.</p>
                            </DialogContentText>
                            <Button style={{ float: "right" }} id="set-price-close-button" onClick={(event) => this.setState({dialog_content: null})} color="primary">
                                Cancel
                            </Button>
                            <NavLink to="/login"><Button style={{ float: "right" }} id="set-price-close-button"  color="primary">
                                Log In
                            </Button></NavLink>
                    </DialogContent>
            </Dialog>

            this.setState({dialog_content})
        }
        
        
        
        
        
    }

    calculate_average_rating = async () => {
        // -- declare total rating --
        let total_zero_and_half_star_rating = 0;
        let total_one_star_rating = 0;
        let total_one_and_half_star_rating = 0;
        let total_2_star_rating = 0;
        let total_2_and_half_star_rating = 0;
        let total_3_star_rating = 0;
        let total_3_and_half_star_rating = 0;
        let total_4_star_rating = 0;
        let total_4_and_half_star_rating = 0;
        let total_5_star_rating = 0;


        console.log("reviews from database ", this.state.reviews_from_database)
        // -- loop through each rating and increase the total rating accordingly --
        for(const review of this.state.reviews_from_database){
            switch(review.rating){
                case "0.5":
                total_zero_and_half_star_rating++;
                break;
                case "1":
                total_one_star_rating++;
                break;
                case "1.5":
                total_one_and_half_star_rating++;
                break;
                case "2":
                total_2_star_rating++;
                break;
                case "2.5":
                total_2_and_half_star_rating++;
                break;
                case "3":
                total_3_star_rating++;
                break;
                case "3.5":
                total_3_and_half_star_rating++;
                break;
                case "4":
                total_4_star_rating++;
                break;
                case "4.5":
                total_4_and_half_star_rating++;
                break;
                case "5":
                total_5_star_rating++;
                break;
            }
        }

        console.log("1", total_5_star_rating)
        

        // -- Get the average star rating --
        let average_rating_for_this_product = (5*total_5_star_rating + 4.5*total_4_and_half_star_rating + 4*total_4_star_rating + 3.5*total_3_and_half_star_rating + 3*total_3_star_rating + 2.5*total_2_and_half_star_rating + 2*total_2_star_rating + 1.5*total_one_and_half_star_rating + 1*total_one_star_rating + 0.5*total_zero_and_half_star_rating)  / (total_5_star_rating+total_4_and_half_star_rating+total_4_star_rating+total_3_and_half_star_rating+total_3_star_rating+total_2_and_half_star_rating+total_2_star_rating+total_one_and_half_star_rating+total_one_star_rating+total_zero_and_half_star_rating)
        console.log("HEY", parseFloat(average_rating_for_this_product))
        
        await this.setState({average_rating_for_this_product:  <Rating
            name="customized-empty"
            defaultValue={average_rating_for_this_product}
            precision={0.5}
            readOnly
            emptyIcon={<StarBorderIcon fontSize="inherit" />}
        />})
    }

    redirect_to_product_page = async (product_name) => {
        console.log("here is the product_name value ", product_name)
        let redirect = <Redirect to={"/product?productName=" + product_name} />;
        // await this.setState({ redirect: redirect });
        return redirect;
    }

    render() {
        let average_rating = this.state.average_rating_for_this_product
        return (
            <React.Fragment>
                <FadeIn>
                {/* I don't know why I have two different redirect states when I could have just one for both cases */}
                {this.state.redirectToLogInPageDialog}
            <div className="row wow fadeInDown">

                <div id="carousel-example-1z" class="carousel slide carousel-fade w-50 h-150 col-sm" data-ride="carousel">
                    <ol class="carousel-indicators">
                       {this.state.list_of_button_JSX ? this.state.list_of_button_JSX.map((next_page_button) =>
                        next_page_button
                    ) : null}
                        {/* <li data-target="#carousel-example-1z" data-slide-to="0" class="active"></li>
                        <li data-target="#carousel-example-1z" data-slide-to="1"></li>
                        <li data-target="#carousel-example-1z" data-slide-to="2"></li> */}
                    </ol>
                    <div class="carousel-inner" role="listbox">
                    {this.state.primary_image}
                    {this.state.listOfProductImagesComponents.map((productImageComponent) =>
                        productImageComponent
                     ) }
                    {/* {this.state.listOfProductImagesComponents} */}
                    </div>
                    <a class="carousel-control-prev" href="#carousel-example-1z" role="button" data-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next" href="#carousel-example-1z" role="button" data-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                    </a>
                </div>
                <div className="col-sm">
                    <h2 style={{marginTop: "3rem"}}>{this.state.productName}</h2>
                    {this.state.average_rating_for_this_product}
                    {/* <Rating 
                        initialRating={2.5}
                        readonly
                    /> */}
                    <hr />
                    <h3>${this.state.productPrice}</h3>
                    <hr />
                    <p>{this.state.productDescription}</p>
                        {/* <hr style={{, marginTop: "5rem"}}width="25%"/> */}
                        <MDBBtn onClick={this.addToCart} style={{ marginTop: "5rem" }} href="#">Add To Cart</MDBBtn>
                </div>
            </div>
            <hr/>
            <div class="wow fadeInLeft">
            {/* {this.state.redirect} */}
            {/* <Redirect to="/product?productName=Mind Lab Pro" /> */}

                <h2 style={{textAlign: "center"}}>Similar Products</h2>
                <div class="similar-products-container">
                {this.state.list_of_similar_products_in_JSX_format.length > 0 ? this.state.list_of_similar_products_in_JSX_format.map((similar_product, index) => {
                        // if(index === 0){
                        //     return <div class="similar-product-wrapper-primary">{similar_product}</div>
                                
                        // }else{
                            // return <div onClick={() => this.redirect_to_product_page(similar_product)} class="similar-product-wrapper">{similar_product}</div>
                        // }
                        return similar_product
                     }
                ) :  <div class="no-similar-products-wrapper"><p class="no-similar-products-label">There are no products that are similar.</p></div> }
                </div>
            </div>
            <hr />
            
            <h1 style={{marginBottom: "2rem", marginLeft: "1.5em"}}>Reviews {localStorage.getItem("token") ? <i onClick={this.display_add_review_form_dialog} class="fa fa-plus plus-icon" style={{float: "right", marginRight: "2em"}}></i> : null}</h1>
                {this.state.dialog_content}
                {this.state.reviews.length > 0 ? <div className="container">
                { this.state.reviews.slice(this.state.offset).map((review, index) => {
                     if(index >= this.state.limit){
                        return null;
                     }else{
                         return review;
                     }
                    }
                )}
            </div>
                 : <div class="no-reviews-wrapper"><p class="no-reviews-label">There are no reviews for this product. Be the first one to leave a review!</p><i onClick={this.display_add_review_form_dialog} class="fa fa-plus plus-icon" style={{float: "right"}}></i></div> }
            <div class="pagination_button_wrapper">
            {this.state.list_of_pagination_buttons.length > 0 ? this.state.list_of_pagination_buttons.map((pagination_button) => pagination_button) : null}

            </div>
            </FadeIn>
            </React.Fragment>
        );
    }
}


const mapStateToProps = state => {
	return {
        API_URL: state.API_URL,
        userCartItems: state.userCartItems,
        user_data: state.user_data,
        website_URL: state.website_URL
        
	};
};

const mapDispatchToProps = dispatch => {
	return {
		updateCartItems: updatedCartItems =>
			dispatch({
                type: actionTypes.ADD_TO_CART,
				updatedCartItems: updatedCartItems
			})
	};
};

// export default connect(mapStateToProps, mapDispatchToProps)(Home)
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Product);
