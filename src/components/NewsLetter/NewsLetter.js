import React, { Component } from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return {

    };
}

class NewsLetter extends Component {
    render() {
        return (
            <div  class="home-news-letter">
                <div class=" container wow fadeInLeft">
                    <div class="row">
                        <div class="col-md-6">
                            <h1>News Letter</h1>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                        </div>
                        <div class="col-md-6">

                            <div class="md-form input-group">
                            <input type="text" class="form-control" placeholder="Enter your email address" aria-label="Recipient's username with two button addons"
                                aria-describedby="MaterialButton-addon4"/>
                                
                            </div>
                            <div style={{textAlign: "center"}}>
                                <div style={{display: "inline-block"}} class="input-group-append" id="MaterialButton-addon4">
                                        <button class="btn btn-md btn-primary m-0 px-3" type="button">Subscribe</button>
                                    </div>
                            </div>
                        </div>

                    </div>
                </div>
                </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(NewsLetter);