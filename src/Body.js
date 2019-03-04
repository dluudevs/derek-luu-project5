import React, {Component} from 'react';

class Body extends Component {

    constructor(){
        super();

        //set today's date; use date to filter results for games that are not released
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1; //January is 0!
        let yyyy = today.getFullYear();

        if (dd < 10) {
            dd = '0' + dd;
        }

        if (mm < 10) {
            mm = '0' + mm;
        }

        today = yyyy + '-' + mm + '-' + dd
        //Source: https://stackoverflow.com/questions/1531093/how-do-i-get-the-current-date-in-javascript

        this.state = {
            date: today,
        }
    }

    showReleasedGames = () => {
        const gameList = this.props.results.map(game => {

            let dateString = game.release_date.substring(0, 10);
            let gameDate = new Date(dateString);
            let stateDate = new Date(this.state.date)

            if (game.image && gameDate < stateDate && game.description !== '') {
                return (
                    <div className="card flex_row" key={game.id}>
                        <div className="img_container">
                            <img src={game.image.original} alt={`Cover of ${game.name}`} />
                        </div>
                        <div className="text_container">
                            <h2>{game.name}</h2>
                            <h3>{`Release Date: ${dateString}`}</h3>
                            <p className="description">{game.description}</p>
                        </div>
                    </div>
                );
            }
        })
    }

    showGames = () => {

        const gameList = this.props.results.map(game => {

            let dateString = game.release_date.substring(0, 10);
            let gameDate = new Date(dateString);
            let stateDate = new Date(this.state.date)

            if(game.image && gameDate < stateDate && game.description !== ''){
                return (    
                    <div className="card flex_row" key={game.id}>
                        <div className="img_container">
                            <img src={game.image.original} alt={`Cover of ${game.name}`} />
                        </div>
                        <div className="text_container">
                            <h2>{game.name}</h2>
                            <h3>{`Release Date: ${dateString}`}</h3>
                            <p className="description">{game.description}</p>
                        </div>
                    </div>
                );
            }
        })

        return (<div className="gameList">{gameList}</div>)
    };

    //if initial.length > 1, render initial load
        //else load userquery

        //on componentdidmount, clear initial to empty 


    render(){
        return(
                <main className="wrapper">
                        { 
                            this.props.results.length > 0 ?
                            this.showGames() : 
                            <p>Loading Games...</p>
                        }
                </main>
        ); 
    }

}//Component

//render the inital load
//componentDidUpdate, if the searchquery change, on click run a different render method

// results may return more than 5, but append 5 at a time. use a condition so it isnt trying to append if there is less than 5 results
//filter results for only items with a value in original_game_rating

export default Body;

//limit to 5 results only
//filter through items that are not released yet
