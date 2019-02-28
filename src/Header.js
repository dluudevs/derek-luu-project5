import React, {Component} from 'react';
import SearchBar from './SearchBar';

const Header = (props) => {

    return(
        <header>
            <div className="wrapper">
                <nav className="flex_row">
                    <h1>ShouldIGetIt</h1>
                    <SearchBar handleChange={props.handleChange}/>
                </nav>
            </div>
        </header>
    )
}


export default Header;