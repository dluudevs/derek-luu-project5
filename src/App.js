import React, { Component } from 'react';
import axios from 'axios';
import Qs from 'qs';
import Header from './Header.js';
import Body from './Body.js';
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
      userQuery: '',
      results: [
                  {
                    image: {},
                    original_release_date: "1990-03-09 09:00"
                  }
                ]
      //return error while other components are waiting for data, create an init method that appends to screen when promise is fulfiled and stores the array in results
    }
  }

  componentWillMount(){

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
          filter: `name:zelda,platforms:94|146|145|157`,
          // Filter will find games that have at least one of values in the query
          // sort: 'original_release_date:desc,'
          //to get rid of unreleased games, have another method that filters out games that have null in origial_release_date
          limit: 5
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
  
  handleChange = event => {
    this.setState({
      userQuery: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault();
    this.findGames(this.state.userQuery);
  }

  //create method to find platform and only display the name of the platforms i asked for 
  findPlatform = (e) => {
    e.preventDefault();
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
          filter: `name:${this.state.userQuery},platforms:94|146|145|157`,
          // Filter will find games that have at least one of values in the query
          // sort: 'original_release_date:desc',
          //to get rid of unreleased games, have another method that filters out games that have null in origial_release_date
          limit: 5
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

  render() {
    return (
      <div>
        <Header handleChange={this.handleChange} handleSubmit={this.handleSubmit} userQuery={this.state.userQuery}/>
        <Body results={this.state.results} findPlatform={this.findPlatform}/>
      </div>
    );
  }
  //bind this.state.userQuery to SearchBar's input


  
}

// Platform - dont print platform for now. print genre instead. this is a stretchgoal after firebase
//go into games (array)
  //iterate through each game (object)
  //go inside the platform property (array)
    //iterate through that array, if the ID is equal to one of the ones in my array. print, else iterate to the next one
    //i believe all you need to do is get inside the platforms array and print
    //maybe create a new array of the values that match another array and print those    

export default App;

//Testing area


//platform id
  //PC: 94
  //ps4: 146
  //xone: 145
  //Switch: 157



