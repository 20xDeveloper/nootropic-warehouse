import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import "./footer.css"
import StickyFooter from 'react-sticky-footer';


export class index extends Component {
    static propTypes = {
        prop: PropTypes
    }

    render() {
        return (
                        <StickyFooter
               
              >
            {/* <footer class="page-footer font-small special-color-dark pt-4">
            
              <div class="container">
            
                <ul class="list-unstyled list-inline text-center">
                  <li class="list-inline-item">
                    <a class="btn-floating btn-fb mx-1">
                      <i class="fab fa-facebook-f"> </i>
                    </a>
                  </li>
                  <li class="list-inline-item">
                    <a class="btn-floating btn-tw mx-1">
                      <i class="fab fa-twitter"> </i>
                    </a>
                  </li>
                  <li class="list-inline-item">
                    <a class="btn-floating btn-gplus mx-1">
                      <i class="fab fa-google-plus-g"> </i>
                    </a>
                  </li>
                  <li class="list-inline-item">
                    <a class="btn-floating btn-li mx-1">
                      <i class="fab fa-linkedin-in"> </i>
                    </a>
                  </li>
                  <li class="list-inline-item">
                    <a class="btn-floating btn-dribbble mx-1">
                      <i class="fab fa-dribbble"> </i>
                    </a>
                  </li>
                </ul>
            
              </div>
            
              <div class="footer-copyright text-center py-3">© 2018 Copyright:
                <a href="https://mdbootstrap.com/education/bootstrap/"> MDBootstrap.com</a>
              </div>
            
            </footer> */}
            </StickyFooter>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default index
