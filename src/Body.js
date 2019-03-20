import React, {Component} from 'react';

class Body extends Component {

    constructor(){
        super();
        this.state = {
            results: []
        }

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

        return <div className="gameList">{gameList}</div>
        //must return for the function to end and render what is stored in gamesList array
    }

    initialLoad = () => {
        return (
            <div>
                <h2 className="logo-font">How to use:</h2>
                <ul className="instructions">
                    <li>Thinking about getting a new game?</li>
                    <li>Not sure if its worth getting?</li>
                    <li>Search the game!</li>
                </ul>
            </div>
        )
    }

    render(){
        console.log("results on load", this.props.initialResults);
        console.log("results on search", this.props.results);
        return(

                <main className="wrapper">
                        { 
                            this.props.results.length > 0 ?
                            this.showReleasedGames() : 
                            this.initialLoad()
                        }
                </main>
                

                ); 
                //create a div, use state to "toggleClass". if the array.length is empty show the div, else hide it.
    }

}//Component


export default Body;
