import React from 'react';

const SearchBar = (props) => {
// whenever props is being passed to a component - it acts very similar to arguments
    //props is basically an object being called, the name that the parent is assigning it is the name of the METHOD - that's how you would call it.
    return (
        <form onSubmit={props.handleSubmit}>
            <label htmlFor="query" className="visuallyHidden"></label>
            <input type="text" placeholder="Search by game title" id="query" onChange={props.handleChange} value={props.userQuery}/>
            <button type="submit">Search</button>
        </form>
    );
}

//searchBar gets handleChange method from header
//header gets handleChange method from app.js
//this is called props drilling (drill to lowest level)
//when searchBar is passing data it goes directly to where the method was created (App.js)
export default SearchBar;