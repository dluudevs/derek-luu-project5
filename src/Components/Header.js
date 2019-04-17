import React, {Component} from 'react';
import SearchBar from './SearchBar';

class Header extends Component {
    constructor(){
        super();
    }

    render(){
        return(
                <header>
                    <div className="container_header wrapper">
                        <nav className="flex_row">
                            <h1 onClick={this.props.isNotLoading}><span className="controller"><i className="fas fa-gamepad fa-rotate-30"></i></span>ShouldIGetIt</h1>
                            <SearchBar handleSubmit={this.props.handleSubmit} userQuery={this.props.userQuery}/>
                        </nav>
                    </div>
                </header>
            )
            //instead of refresh on click, clear the array and show initial load (its faster)

    }
}

export default Header;
