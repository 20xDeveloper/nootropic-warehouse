import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  MDBRow, MDBCol, MDBCard, MDBCardImage, MDBCardBody, MDBBadge } from "mdbreact";
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';


function mapStateToProps(state) {
    return {
        website_URL: state.website_URL

    };
}

class BestSellerProductCard extends Component {
    render() {
        return (
            <MDBCol lg="3" md="6" className="mb-lg-0 mb-4 wow fadeInLeft">
                <a href={this.props.website_URL + "/product?productName=" + this.props.productName}>
                <MDBCard className="align-items-center">
                    <MDBCardImage
                    src={this.props.productImage}
                    top
                    alt="sample photo"
                    overlay="white-slight"
                    />
                    <MDBCardBody className="text-center">
                    <a href="#!" className="grey-text">
                        <h5>{this.props.productCategory}</h5>
                    </a>
                    <h5>
                        <strong>
                        <a href="#!" className="dark-grey-text">
                            {this.props.productName}
                            {/* <MDBBadge pill color="danger">
                            NEW
                            </MDBBadge> */}
                        </a>
                        </strong>
                    </h5>
                    <Rating
                              name="customized-empty"
                              defaultValue={this.props.product_average_rating}
                              precision={0.5}
                              readOnly
                              emptyIcon={<StarBorderIcon fontSize="inherit" />}
                          />
                    <h4 className="font-weight-bold blue-text">
                        <strong>${this.props.productPrice}</strong>
                    </h4>
                    </MDBCardBody>
                </MDBCard>
                </a>
            </MDBCol>
        );
    }
}

export default connect(
    mapStateToProps,
)(BestSellerProductCard);