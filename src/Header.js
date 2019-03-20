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
                            <h1><span className="controller"><i class="fas fa-gamepad fa-rotate-30"></i></span>ShouldIGetIt</h1>
                            <SearchBar handleChange={this.props.handleChange} handleSubmit={this.props.handleSubmit} userQuery={this.props.userQuery}/>
                        </nav>
                    </div>
                </header>
            )

    }
}

export default Header;
