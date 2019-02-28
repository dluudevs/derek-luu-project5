import React, { Component } from 'react';
import axios from 'axios';
import Qs from 'qs';
import Header from './Header.js';
import './App.css';
//import is a two way street - you only have to import once 
    //you also import any modules that file has

const apiKey = '1707fe563bfae1485271371502c54d58b9ec022d';
const apiURL_games = 'https://www.giantbomb.com/api/games';
const proxyURL = 'https://proxy.hackeryou.com'

class App extends Component {
  
  constructor(){
    super();
    this.state = {
      userInput: ''
    }
  }
  
  handleChange = event => {
    console.log(event.target.value);
  }

  //call to find games
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
          filter: 'name:zelda'
        }
      }
    })
      .then((object) => {
        console.log(object);
      })
  }

  render() {
    return (
      <div>
        <Header handleChange={this.handleChange}/>
      </div>
    );
  }
  
}

export default App;

//Testing area

const findGames = () => {
  axios({
    url: proxyURL,
    method: 'GET',
    dataResponse: 'json',
    paramsSerializer: function(params) {
      return Qs.stringify(params, { arrayFormat: 'brackets' });
    },
    params: {
      reqUrl: apiURL_games,
      params: {
        api_key: apiKey,
        format: 'json',
        filter: 'name:zelda'
      }
    }
  })
  .then((object) => {
      console.log(object);
  })
}

findGames();

//Parts:
  //header component
    //search bar {Component}
      // search icon (submit button) {component}
      // text input {component}
  //output
    //  