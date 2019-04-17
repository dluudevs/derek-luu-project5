import React, {Component} from 'react';
import axios from 'axios';
import Qs from 'qs';
import MoreInfo from './MoreInfo';

//variables for API call
const apiURL_games = 'http://www.gamespot.com/api/games';
const apiURL_images = 'http://www.gamespot.com/api/images/';
const apiKey = '7c8c72eb22a85289937160cd744b4ef17f79669d';
const proxyURL = 'https://proxy.hackeryou.com';

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

//make a simple API call using the gameID from a searched game
//when the images are loaded, push all the image links into an object (gameImages) with the game ID as the key
    //the key will hold an array of all the images in string format
//once the modal is clicked, go to the object with the game ID and iterate over the array to append images

class Body extends Component {

    constructor(){
        super();
        this.state = {
            results: [],
            imageResults: {},
            date: today
        }
    }

    findGames = () => {
        axios({
            url: proxyURL,
            method: 'GET',
            dataResponse: 'json',
            paramsSerializer: function (params) {
                return Qs.stringify(params, { arrayFormat: 'brackets' });
            },
            params: {
                reqUrl: apiURL_games,
                params: {
                    api_key: apiKey,
                    format: 'json',
                    filter: `name:${this.props.userQuery}`,
                    // Filter will find games that have at least one of values in the query
                    sort: 'release_date:desc',
                }
            }
        })
        .then((object) => {
            const searchResults = object.data.results;
            this.setState({
                results: searchResults
            });
        })
        .then(() => this.findGameImages())
    }

    findGameImages = () => {

        axios({
            url: proxyURL,
            method: 'GET',
            dataResponse: 'json',
            paramsSerializer: function (params) {
                return Qs.stringify(params, { arrayFormat: 'brackets' });
            },
            params: {
                reqUrl: `https://www.gamespot.com/api/images/?api_key=7c8c72eb22a85289937160cd744b4ef17f79669d&format=json&filter=association%3A5000-${this.state.results[3].id}`,
            }
        })
        .then((object) => {
            const images = object.data.results;
            const originalImages = []
            
            images.forEach(image => {
                originalImages.push(image.original)
            })
            
            this.setState({
                imageResults: {...this.state.imageResults, [this.state.results[3].id]: originalImages } //spread previousState's array, add the new item and set state
            })
        })
    }

    showReleasedGames = () => {


        // const hasImages = Object.keys(this.state.imageResults).length > 0; //checks if the object is empty - results in a boolean value
        // //keys turns all the names in the object into an arrray. allowing us to use the length property 

        const gameList = this.state.results.map(game => {

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
                            <MoreInfo game={game} imageResults={this.state.imageResults} />
                            {/* {hasImages ? (<MoreInfo game={game} imageResults={this.state.imageResults} />) : null} */}
                        </div>
                    </div>
                );
            }

            // if () use game.description as a reference to check the number of characters
            // or use overflow hidden to hide all of text
                //if i go this route user will need visial cue to click read more, is the button enough?
        })

        return <div className="gameList">{gameList}</div>
        //must return for the function to end and render what is stored in gamesList array
    }

    initialLoad = () => {
        if(!this.props.loading){
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
        } else {
            return (
                <div>
                    <h2 className="loading">Searching . . .</h2>
                </div>
            )
        }
    } //this doesnt need to be called in componentDidUpdate because App sets state once handleSubmit fires, triggering render in Body 

    // mountMoreInfo = (game) => {
    //     return (
    //         <MoreInfo game={game} imageResults={this.state.imageResults} />
    //     )
    // }


    componentDidUpdate(prevProps, prevState){
        if(this.props.userQuery !== prevProps.userQuery){
            this.setState({
                results: []
            })
            //clear the results before pushing new results into state (triggers the loading state)
            this.findGames();
        }
    }

    render(){

        return(

                <main className="wrapper">
                        { 
                            this.state.results.length > 0 ?
                            this.showReleasedGames() : 
                            this.initialLoad()
                        }
                </main>

            ); 
    }

}//Component

export default Body;