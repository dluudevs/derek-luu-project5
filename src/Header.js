import React from 'react';
import SearchBar from './SearchBar';

const Header = (props) => {

    return(
        <header>
            <div className="container_header wrapper">
                <nav className="flex_row">
                    <h1>ShouldIGetIt</h1>
                    <SearchBar handleChange={props.handleChange} handleSubmit={props.handleSubmit} userQuery={props.userQuery}/>
                </nav>
            </div>
        </header>
    )
}

export default Header;
