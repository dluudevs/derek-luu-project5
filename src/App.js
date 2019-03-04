import React, { Component } from 'react';
import axios from 'axios';
import Qs from 'qs';
import Header from './Header.js';
import Body from './Body.js';
import Footer from './Footer.js';
import './App.css';
//import is a two way street - you only have to import once 
    //you also import any modules that file imported

const apiURL_games = 'http://www.gamespot.com/api/games'
const apiURL_releases = 'http://www.gamespot.com/api/releases/'
const apiKey = '7c8c72eb22a85289937160cd744b4ef17f79669d';
const proxyURL = 'https://proxy.hackeryou.com'

class App extends Component {
  
  constructor(){
    super();

    this.state = {
      
      userQuery: '',
      results: [],
      //results is responsible for passing data to components to render
      //return error while other components are waiting for data, create an init method that appends to screen when promise is fulfiled and stores the array in results
      initialResults: []
      //for initial load
    }
  }

  componentDidMount(){

    axios({
      url: proxyURL,
      method: 'GET',
      dataResponse: 'json',
      paramsSerializer: function (params) {
        return Qs.stringify(params, { arrayFormat: 'brackets' });
      },
      params: {
        reqUrl: apiURL_games,
        params: {
          api_key: apiKey,
          format: 'json',
          filter: 'release_date:2019-12-31'
          // Filter will find games that have at least one of values in the query
          //to get rid of unreleased games, have another method that filters out games that have null in origial_release_date
        }
      }
    })
    .then((object) => {
      const searchResults = object.data.results;
      console.log(searchResults);
      this.setState({
        initialResults: searchResults
      })
    });
  }


  // filterReleasedGames = gamesArray => {
  // }
  
  handleChange = event => {
    this.setState({
      userQuery: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault();
    this.findGames(this.state.userQuery);
  }

  //call to find games
  //TODO: sort to show the newest platforms first
  findGames = () => {
    axios({
      url: proxyURL,
      method: 'GET',
      dataResponse: 'json',
      paramsSerializer: function (params) {
        return Qs.stringify(params, { arrayFormat: 'brackets' });
      },
      params: {
        reqUrl: apiURL_games,
        params: {
          api_key: apiKey,
          format: 'json',
          filter: `name:${this.state.userQuery}`,
          // Filter will find games that have at least one of values in the query
          sort: 'release_date:desc',
        }
      }
    })
    .then((object) => {
      const searchResults = object.data.results;
      //release date
      console.log(searchResults);
      this.setState({
          results: searchResults
      });
    })
  }


  //doesn't really do anything special at this point,
  componentDidUpdate(prevProps, prevState){
    if(prevState.results !== this.state.results){
      this.setState({
        initialResults: []
      })
    }
  }

  render(){
    return (
      <div>
        <Header handleChange={this.handleChange} handleSubmit={this.handleSubmit} userQuery={this.state.userQuery}/>
        <Body results={this.state.results} initialResults={this.state.initialResults}/>
        <Footer />
      </div>
    );
  }

  

}

export default App;

//loading while being loaded - turnary opereator already used


//additional goals
  //user reviews button reviews appear right below the game that was selected
    //give user option to close reviews
  



