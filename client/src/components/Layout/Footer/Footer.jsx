import React, { Component } from 'react';
 import {Link} from 'react-router-dom'

export default class Footer extends Component{
    render(){
 const FTstyle={
     marginTop:"200px"

 }
    return(
        <div>
                        {/* <!-- Footer --> */}
                
            <footer style={FTstyle} className="page-footer font-small unique-color-dark">

            <div>

            {/* <!-- Footer Links --> */}
            <div className="container text-center text-md-left mt-5 p-2">

            {/* <!-- Grid row --> */}
            <div className="row mt-3">

                {/* <!-- Grid column --> */}
                <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">

                {/* <!-- Content --> */}
                <h6 className="text-uppercase font-weight-bold p-2"> 
                &#x26f6; ProjectBox</h6>
                                </div>
                {/* <!-- Grid column --> */}

                {/* <!-- Grid column --> */}
                <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">

                {/* <!-- Links --> */}
                <h6 className="text-uppercase font-weight-bold">Service</h6>
                <hr className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style={{width: "60px"}}/>
                <p>
                    <Link to="/solution">Solution</Link>
                </p>
                <p>
                    <Link to="/c">Customer</Link>
                </p>
                <p>
                    <Link to="/faq">FAQ</Link>
                </p>

                <p>
                    <Link to="/faq">help</Link>
                </p>
                
                

                </div>
                {/* <!-- Grid column --> */}

                {/* <!-- Grid column --> */}
                <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">

                {/* <!-- Links --> */}
                <h6 className="text-uppercase font-weight-bold">Resources</h6>
                <hr className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style={{width: "60px"}}/>
                <p>
                    <a href="#!">Your Account</a>
                </p>
                <p>
                    <a href="#!">Add project</a>
                </p>
                <p>
                    <a href="#!">Students</a>
                </p>
                <p>
                    <a href="#!">Documentation</a>
                </p>

                </div>
                {/* <!-- Grid column --> */}

                {/* <!-- Grid column --> */}
                <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">

                {/* <!-- Links --> */}
                <h6 className="text-uppercase font-weight-bold">Company</h6>
                <hr className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style={{width: "60px"}}/>
                <p>
                    <Link to='/ab'>About Us</Link>
                </p>
                
                <p>
                    <Link to='/ab'>Team</Link>
                </p>
                
                <p>
                    <Link to='/ab'>Contact Us</Link>
                </p>
                
                <p>
                    Connect
                    </p>
                    
                    
                    {/* <!-- Facebook --> */}
                    <a className="fb-ic">
                    <i className="fa fa-facebook white-text mr-4"> </i>
                    </a>
                    {/* <!-- Twitter --> */}
                    <a className="tw-ic">
                    <i className="fa fa-twitter white-text mr-4"> </i>
                    </a>
                    {/* <!-- Google +--> */}
                    <a className="gplus-ic">
                    <i className="fa fa-google-plus white-text mr-4"> </i>
                    </a>
                    {/* <!--Linkedin --> */}
                    <a className="li-ic">
                    <i className="fa fa-linkedin white-text mr-4"> </i>
                    </a>
                    {/* <!--Instagram--> */}
                    <a className="ins-ic">
                    <i className="fa fa-instagram white-text"> </i>
                    </a>

                </div>
                {/* <!-- Grid column --> */}
                </div>
                {/* <!-- Grid column --> */}

            </div>
            {/* <!-- Grid row --> */}

            </div>
            {/* <!-- Footer Links --> */}

            {/* <!-- Copyright --> */}
            <div className="footer-copyright text-center py-3">© 2018 Copyright &nbsp; with <span style={{color:'red',fontSize:'20px'}}>&hearts; &nbsp;</span>
            <a href="https://kondipress">by Kondipress</a>
            </div>
            {/* <!-- Copyright --> */}

            </footer>
            {/* <!-- Footer --> */}

        </div>
    )
}
}

// export default Footer;