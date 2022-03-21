import React from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';
import { Route, NavLink, Switch, Redirect } from "react-router-dom"; //make sure to import all the components.

const CardExample = (props) => {
  return (
    <MDBCol style={{ marginTop: "3em" }}>
      <MDBCard style={{ width: "12rem", height: "20rem" }}>
        <MDBCardImage className="img-fluid" src={props.productImage} waves />
        <MDBCardBody>
          <MDBCardTitle style={{textAlign: "center"}}>{props.productName}</MDBCardTitle>
          <MDBCardText style={{textAlign: "center"}}>
            ${props.productPrice}
          </MDBCardText>
    <NavLink to={"/product?productName=" + props.productName}>

          <MDBBtn style={{textAlign: "center"}} href="#">Buy Now</MDBBtn>
    </NavLink>

        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  )
}

export default CardExample;