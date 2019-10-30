import React, { Component } from 'react';
import Header from './Components/Header.js';
import Body from './Components/Body.js';
import './App.css';
import './firebase.js';
//import is a two way street - you only have to import once 
    //you also import any modules that file imported
    
class App extends Component {
  constructor(){
    super();

    this.state = {
      userQuery: '',
      loading: false,
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

  //refreshes the page
  isNotLoading = () => {
    this.setState({
      loading: false,
      userQuery: ''
    })
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



