import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./banner.scss"

function mapStateToProps(state) {
    return {

    };
}

// for the background image of the banner. you will have to manually enter that in the banner.scss file

class Banner extends Component {
    render() {
        let propStyles = this.props.extraStyles
        let backgroundImage = this.props.fireBaseImageUrl ? {backgroundImage: `url(${this.props.fireBaseImageUrl})`} : null
        let styles = {...backgroundImage, ...propStyles }
        return (
            // the class that you see. that is for the old banners that i created. i don't use that anymore
            <div style={{...styles}} class={"banner " + this.props.bannerClassNameToGetBackgroundImageThroughCSS}>
                <div class="wow fadeInDown container">
                        <h1>{this.props.bannerHeader}</h1>
                        <p>{this.props.bannerDescription}</p>
                        {this.props.searchIncluded ?
                        <React.Fragment>
                        <div class="form-inline active-purple-4">
                            <input  onKeyPress={this.props.checkIfThePressedEnter} onInput={this.props.saveSearchInputValueFromChildComponent} class="form-control form-control-sm mr-3 w-75 search-product-input-field" type="text" placeholder="Search"
                                aria-label="Search"/>
                            <i onClick={this.props.searchFunction} class="fas fa-search" aria-hidden="true"></i>
                        </div></React.Fragment> : null}
                </div>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(Banner);