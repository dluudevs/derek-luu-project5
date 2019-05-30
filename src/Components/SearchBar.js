import React, {Component} from 'react';

class SearchBar extends Component {
    constructor(){
        super();
        this.state = {
            userQuery: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            userQuery: e.target.value
        })
    }

    render (){
        return (
            // <form onSubmit={this.props.handleSubmit} className="flex_row">
            <form onSubmit={this.props.handleSubmit} className="flex_row">
                <span className="controller controller__mobile" onClick={this.props.isNotLoading}><i className="fas fa-gamepad fa-rotate-30"></i></span>
                <div className="input__wrapper">
                    <label htmlFor="query" className="visuallyHidden"></label>
                    <input type="text" placeholder="Search by game" id="query" required pattern="[a-zA-Z0-9\s\-]+" title="letters, numbers and spaces" onChange={this.handleChange} value={this.state.userQuery}/>
                    <button type="submit">Search</button>
                </div>
            </form>
        );
    }
}
export default SearchBar;