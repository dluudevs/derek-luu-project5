import React, { Component } from 'react';
import axios from 'axios';
import Qs from 'qs';
import Header from './Header.js';
import Body from './Body.js';
import Footer from './Footer.js';
import './App.css';
import './firebase.js';
//import is a two way street - you only have to import once 
    //you also import any modules that file imported

const apiURL_games = 'http://www.gamespot.com/api/games'
const apiURL_releases = 'http://www.gamespot.com/api/releases/'
const apiKey = '7c8c72eb22a85289937160cd744b4ef17f79669d';
const proxyURL = 'https://proxy.hackeryou.com'

//TODO:

    //error handling for random searches
    
    //create a modal to display more information about the game if the user is interested
    //modal should have at least one gameplay video and a review article
    
    //firebase
    //start off with user auth right off the bat
    //publi database and user database
    
    //firebase list should appear on the right and be fixed 
    //adjust the size of the cards if necessary
    
    //load 5 results initially and then add more as the user scrolls down?

    // user profile
      //watchlist
      //recent searches
    
class App extends Component {
  
  constructor(){
    super();

    this.state = {
      userQuery: '',
      loading: false
    }
  }
  //only set to state after submit button is clicked

  handleSubmit = event => {
    event.preventDefault();
    const input = document.querySelector('#query').value
    console.log(input);
    this.setState({
      loading: true,
      userQuery: input
    });
  }
  //set userQuery to state only after submit button is pressed, allows Body to take advantage of componentDidUpdate

  render(){
    return (
      <div>
        <Header handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>
        <Body results={this.state.results} userQuery={this.state.userQuery} loading={this.state.loading}/>
      </div>
    );
  }

}

export default App;



