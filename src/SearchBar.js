import React, {Component} from 'react';

class SearchBar extends Component {
    constructor(){
        super();
        this.state = {}
    }

    render (){
        return (
            // <form onSubmit={this.props.handleSubmit} className="flex_row">
            <form onSubmit={this.props.handleSubmit} className="flex_row">
                <div className="container_textInput">
                    <label htmlFor="query" className="visuallyHidden"></label>
                    <input type="text" placeholder="Search by game" id="query" required/>
                </div>
                <button type="submit">Search</button>
            </form>
        );
    }
}

//props drilling (drill to lowest level)
    //searchBar gets handleChange method from header
    //header gets handleChange method from app.js
//when searchBar is passing data it goes directly to where the method was created (App.js)
export default SearchBar;