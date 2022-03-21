import React, { Component } from 'react';
import { connect } from 'react-redux';
// import Rating from "react-rating"

import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';


function mapStateToProps(state) {
    return {

    };
}

class Review extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-sm">
                    {/* im planning on using name as first name and last name. but maybe i should fix that to make it better */}
                    <h3>{this.props.name}</h3>
                    <p>{this.props.createdAt}</p>
                    <Rating
          name="customized-empty"
          defaultValue={this.props.rating}
          precision={0.5}
          readOnly
          emptyIcon={<StarBorderIcon fontSize="inherit" />}
        />
                    {/* <Rating 
                        initialRating={this.props.rating}
                        readonly
                    /> */}
                    <hr style={{marginLeft: "50%", width: "100%", marginTop: "5%", marginBottom: "5%"}} />

                </div>
                <div className="col-sm">
                    <p>{this.props.reviewDescription}</p>
                </div>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(Review);