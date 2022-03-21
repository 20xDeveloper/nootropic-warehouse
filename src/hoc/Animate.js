import React from "react";
import { MDBAnimation } from "mdbreact";

const AnimationPage = (props) => {
    return (
        <MDBAnimation type={props.type} infinite>
            <img className="img-fluid" alt="" src="https://mdbootstrap.com/img/logo/mdb-transparent-250px.png" />
        </MDBAnimation>
    );
};

export default AnimationPage;