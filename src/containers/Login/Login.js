import React, { Component } from 'react'
import { connect } from 'react-redux'
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import "./Login.scss"
import { Route, NavLink, Switch, Redirect, Link } from "react-router-dom"; //make sure to import all the components.
import Axios from "axios"
import * as actionTypes from "../../store/actions";
import FadeIn from 'react-fade-in';


export class Login extends Component {
    state = {
        submitted: false,
        error : "",
        email: "",
        password: ""

    }

    loginHandler = async (event) => {
        try{
            event.preventDefault();

            let loginAPIUrl = this.props.API_URL + "/users/login"
            let data = {
                email: this.state.email,
                password: this.state.password
            }
            let loginAPIResponse = await Axios.post(loginAPIUrl, data)

            localStorage.setItem("token", loginAPIResponse.data.token.token)
            // localStorage.setItem("user_ID", loginAPIResponse.data.user.id)

            this.setState({submitted: true})
            this.props.changeHeaderToDisplayLoggedOut(loginAPIResponse.data.user) // this is saving the user data. We need the user ID for other features of the app.
        }catch(error){
            this.setState({error: "The credentials you entered was invalid."})
        }
        


    }

    render() {
        let error = <p>{this.state.error}</p>
        let redirect = null;
        if (this.state.submitted) {
            redirect = <Redirect to="/" />; //if they submitted the post you redirect them to the home page.
        }
        return (
            <FadeIn>
               <MDBContainer style={{maxWidth: "25%"}}>
                   <div style={{height: "35em"}}>
                   {redirect}
                {/* <MDBRow>
                    <MDBCol md="6"> */}
                    <form className="login">
                        {error}
                        <p className="h4 text-center mb-4">Sign in</p>

                        <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                        Your email
                        </label>
                        <input
                        type="email"
                        id="defaultFormLoginEmailEx"
                        className="form-control"
                        onChange={( event ) => this.setState( { email: event.target.value } )}
                        />
                        <br />
                        <label htmlFor="defaultFormLoginPasswordEx" className="grey-text">
                        Your password
                        </label>
                        <input
                        type="password"
                        id="defaultFormLoginPasswordEx"
                        className="form-control"
                        onChange={( event ) => this.setState( { password: event.target.value } )}
                        />
                        <div className="text-center mt-4">
                        <MDBBtn onClick={this.loginHandler} color="indigo" type="submit">Login</MDBBtn>
                        </div>
                        <p style={{color: "black", marginTop: "2em"}}>Don't have an account?</p> <button style={{backgroundColor: "none", color: "black"}}><NavLink to="/signup" exact>Sign up here</NavLink></button>
                    </form>
                    </div>
                    {/* </MDBCol>
                </MDBRow> */}
                </MDBContainer> 
                </FadeIn>
        )
    }
}

const mapStateToProps = (state) => ({
    API_URL: state.API_URL
})

const mapDispatchToProps = dispatch => {
	return {
     changeHeaderToDisplayLoggedOut: (user_data) => dispatch({type: actionTypes.CHANGE_HEADER_TO_DISPLAY_LOGGED_OUT, user_data }),
	};
};


export default connect(mapStateToProps, mapDispatchToProps)(Login)
