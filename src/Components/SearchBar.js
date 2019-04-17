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
                    <input type="text" placeholder="Search by game" id="query" required pattern="[a-zA-Z0-9\s]+" title="letters, numbers and spaces"/>
                </div>
                <button type="submit">Search</button>
            </form>
        );
    }
}
export default SearchBar;