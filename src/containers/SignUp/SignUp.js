import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import "./SignUp.scss"
import Axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import FadeIn from 'react-fade-in';




function mapStateToProps(state) {
    return {
        API_URL: state.API_URL
    };
}

class SignUp extends Component {
    state = {
        name: "",
        email: "",
        confirmEmail: "",
        password: "",
        confirmPassword: ""
    }
    signUpHandler = async (event) => {
        console.log("we made it")
        event.preventDefault()
        // if(this.state.email !== this.state.confirmEmail){
        //     toast.error("the email you confirmed did not match", {
        //         position: "bottom-center",
        //         autoClose: 5000,
        //         hideProgressBar: false,
        //         closeOnClick: true,
        //         pauseOnHover: true,
        //         draggable: true
        //     });
           
            // we are doing this because we are hashing the password
            // so using len validation property in sequelize wont work
            // so we just manually did it
        // }else 
        if(this.state.password.length < 5){ 
            toast.error("Password must be atleast 5 character.", {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
        }else if(this.state.confirmPassword !== this.state.password){
            toast.error("The password you entered does not match.", {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
        }else{
            let signUpApiUrl = this.props.API_URL + "/users"
            let data = {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                shopId: 12
            }
            let signUpApiResponse = await Axios.post(signUpApiUrl, data)
            console.log("sign up response ", signUpApiResponse)
            if(signUpApiResponse.data.token){
                toast.success("You have successfully created an account!", {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                });
            }else{
                toast.error(signUpApiResponse.data.validationError, {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                });
            }
        }
    }

    render() {
        return (
            <FadeIn>
        <MDBContainer>
        <MDBRow>
        <MDBCol md="3"></MDBCol>
            <MDBCol md="6">
        <ToastContainer position="bottom-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnVisibilityChange draggable pauseOnHover />
            <div style={{height: "35em", marginTop: "3em"}}>
            <form className="sign-up-form">
                {this.state.error}
                <p className="h4 text-center mb-4">Sign up</p>
                <label htmlFor="defaultFormRegisterNameEx" className="grey-text">
                name
                </label>
                <input
                type="text"
                id="defaultFormRegisterNameEx"
                className="form-control"
                onChange={(event) => this.setState({name: event.target.value})}
                />
                <br />
                <label htmlFor="defaultFormRegisterEmailEx" className="grey-text">
                email
                </label>
                <input
                type="email"
                id="defaultFormRegisterEmailEx"
                className="form-control"
                onChange={(event) => this.setState({email: event.target.value})}

                />
                <br />
                {/* <label
                htmlFor="defaultFormRegisterConfirmEx"
                className="grey-text"
                >
                Confirm your email
                </label>
                <input
                type="email"
                id="defaultFormRegisterConfirmEx"
                className="form-control"
                onChange={(event)=> this.setState({confirmEmail: event.target.value})}
                />
                <br /> */}
                <label
                htmlFor="defaultFormRegisterPasswordEx"
                className="grey-text"
                >
                Password
                </label>
                <input
                type="password"
                id="defaultFormRegisterPasswordEx"
                className="form-control"
                onChange={(event) => this.setState({password: event.target.value})}
                />
                 <br />
                <label
                htmlFor="defaultFormRegisterPasswordEx"
                className="grey-text"
                >
                Confirm Password
                </label>
                <input
                type="password"
                id="defaultFormRegisterPasswordEx"
                className="form-control"
                onChange={(event) => this.setState({confirmPassword: event.target.value})}
                />
                <div className="text-center mt-4">
                <MDBBtn onClick={this.signUpHandler} color="unique" type="submit">
                    Register
                </MDBBtn>
                </div>
            </form>
            </div>
            </MDBCol>
            <MDBCol md="3"></MDBCol>

        </MDBRow>
        </MDBContainer>
        </FadeIn>
        );
    }
}

export default connect(
    mapStateToProps,
)(SignUp);