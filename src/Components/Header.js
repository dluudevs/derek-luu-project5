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
                            <h1 title="Clear search results" onClick={this.props.isNotLoading}><span className="controller"><i className="fas fa-gamepad fa-rotate-30"></i></span>ShouldIGetIt</h1>
                            <SearchBar handleSubmit={this.props.handleSubmit} isNotLoading={this.props.isNotLoading}/>
                        </nav>
                    </div>
                </header>
            )

    }
}

export default Header;
