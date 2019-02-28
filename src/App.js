import React, { Component } from 'react';
import axios from 'axios';
import Qs from 'qs';
import Header from './Header.js';
import './App.css';
//import is a two way street - you only have to import once 
    //you also import any modules that file imported

const apiKey = '1707fe563bfae1485271371502c54d58b9ec022d';
const apiURL_games = 'https://www.giantbomb.com/api/games';
const proxyURL = 'https://proxy.hackeryou.com'

class App extends Component {
  
  constructor(){
    super();
    this.state = {
      userQuery: ''
    }
  }
  
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
  findGames = () => {
    console.log(`this is the value from the text input ${this.state.userQuery}`);
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
          filter: `name:${this.state.userQuery}`
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
        <Header handleChange={this.handleChange} handleSubmit={this.handleSubmit} userQuery={this.state.userQuery}/>
      </div>
    );
  }
  
}

export default App;

//Testing area

// const findGames = () => {
//   axios({
//     url: proxyURL,
//     method: 'GET',
//     dataResponse: 'json',
//     paramsSerializer: function(params) {
//       return Qs.stringify(params, { arrayFormat: 'brackets' });
//     },
//     params: {
//       reqUrl: apiURL_games,
//       params: {
//         api_key: apiKey,
//         format: 'json',
//         filter: 'name:zelda'
//       }
//     }
//   })
//   .then((object) => {
//       console.log(object);
//   })
// }

// findGames();
