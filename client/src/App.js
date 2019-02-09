import React, { Component } from 'react';
import {Route,Switch} from 'react-router-dom'

import './App.css';
import './components/assets/mdb/css/mdb.min.css'

import './components/assets/mdb/css/bootstrap.min.css'
import Header from './components/Layout/Header/Header.jsx'
import Footer from './components/Layout/Footer/Footer.jsx'
import Router from './routes'



class App extends Component {
  render() {
    return (
      <div className="App">
         
         <Route component={Header}/>
         <Route component={Router}/>
         <Route component={Footer}/>
         {/* <Footer/> */}
           </div>
    );
  }
}

export default App;
