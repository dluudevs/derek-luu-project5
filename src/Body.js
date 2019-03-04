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

        return <div className="gameList">{gameList}</div>
        //must return for the function to end and render what is stored in gamesList array
    }

    showInitalGames = () => {
        const gameList = this.props.initialResults.map(game => {

            let dateString = game.release_date.substring(0, 10);

            if (game.image && game.description !== '') {
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
    
    render(){
        return(
                <main className="wrapper">
                        { 
                            this.props.results.length > 0 ?
                            this.showReleasedGames() : 
                            this.showInitalGames()
                        }
                </main>
        ); 
    }

}//Component


export default Body;
