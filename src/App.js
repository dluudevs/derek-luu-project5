import React, { Component } from 'react';
import Header from './Components/Header.js';
import Body from './Components/Body.js';
import './App.css';
import './firebase.js';
//import is a two way street - you only have to import once 
    //you also import any modules that file imported

//TODO:

    //create a modal to display more information about the game if the user is interested
    //modal will contain images and videos
      //carousel of images
      //external link to gameplay video
        //make own video player for the video

    //load 5 results initially and then add more as the user scrolls down?
      //this will help in ensuring all the models are consistent
      //might require async and hold data for 5 items in a time for efficiency purposes
    
    //firebase
    //start off with user auth right off the bat
    //publi database and user database
    
    //firebase list should appear on the right and be fixed 
    //adjust the size of the cards if necessary
    

    // user profile
      //watchlist
      //recent searches

  //when the user clicks on the h1, clear the results in Body.js (need redux for this or move the results to the parent App.js)
    
class App extends Component {
  
  constructor(){
    super();

    this.state = {
      userQuery: '',
      loading: false
    }
  }

  handleSubmit = event => {
    event.preventDefault();
    const input = document.querySelector('#query').value
    this.setState({
      loading: true,
      userQuery: input
    });
  }
  //set userQuery to state only after submit button is pressed, allows Body to take advantage of componentDidUpdate

  isNotLoading = () => {
    this.setState({
      loading: false
    })
    console.log('isNotLoading was called');
  }


  render(){
    return (
      <div>
        <Header handleSubmit={this.handleSubmit} isNotLoading={this.isNotLoading}/>
        <Body userQuery={this.state.userQuery} loading={this.state.loading}/>
      </div>
    );
  }

}

export default App;



