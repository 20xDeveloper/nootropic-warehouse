import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./category.scss"
import { Route, NavLink, Switch, Redirect } from 'react-router-dom'; //make sure to import all the components.


function mapStateToProps(state) {
    return {

    };
}

class Category extends Component {
    render() {
        return (
          <div class="card collection-card col-sm" style={{width: "20rem"}}>
          <NavLink to={"/shop/products?category=" + this.props.categoryName}>

          <div class="view zoom product-shopping-category">
            <img class="img-fluid product-shopping-category-image" src={this.props.categoryFirebaseImageURL}
              alt="Example photo"/>
            <div class="stripe dark">
              <a>
                <p>{this.props.categoryName} <i class="fas fa-chevron-right"></i></p>
              </a>
            </div>
          </div>
        </NavLink>

        </div>
           
        );
    }
}

export default connect(
    mapStateToProps,
)(Category);