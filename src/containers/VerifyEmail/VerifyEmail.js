import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from "axios"
import "./VerifyEmail.scss"

function mapStateToProps(state) {
    return {

    };
}

class VerifyEmail extends Component {
    componentDidMount(){
        
        const instance = axios.create({
            headers: { 
                'Access-Control-Allow-Origin': "*" 
            }
        });

        // first
        const userId = this.props.match.params.id 
        console.log("here is the value for the id param ", userId)


        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        const url2 = 'https://terrain-cart.herokuapp.com/users/verify/' + userId
        instance.patch(proxyurl + url2).then(response => {
            //second
            console.log("here is the value for the response variable ", response)
        }).catch(err => {
            console.log(err)
        })

}

    render() {
        return (
            <div className="verify-container">
                <h2 className="item-a">You have successfully verified your email!


                </h2>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(VerifyEmail);