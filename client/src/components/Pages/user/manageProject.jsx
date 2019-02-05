import React, { Component } from 'react'

export default class manageProject extends Component {
  render() {
    return (
      <div>
                            <ul className="nav nav-pills px-5 py-4">  
                <li className="nav-item">
                    <Link className="nav-link active btn btn-outline-dark" to="/addproject">Add project</Link>
                </li>
                <li className="nav-item">
                    <a className="nav-link btn btn-outline-dark" href="#"> view project</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link btn btn-outline-dark" href="#">connect</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link disabled " href="#">Welcome Idris <span className="pink-text">&hearts;</span></a>
                </li>
                </ul>
      </div>
    )
  }
}
