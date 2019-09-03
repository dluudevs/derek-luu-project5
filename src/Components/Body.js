import React, {Component} from 'react';
import axios from 'axios';
import Qs from 'qs';
import MoreInfo from './MoreInfo';
import AOS from 'aos';
import 'aos/dist/aos.css';

//variables for API call
const apiURL_games = 'http://www.gamespot.com/api/games';
const apiURL_releases = 'http://www.gamespot.com/api/releases';
const apiKey = '7c8c72eb22a85289937160cd744b4ef17f79669d';
const proxyURL = 'https://proxy.hackeryou.com';
const giantBomb_games = 'https://www.giantbomb.com/api/games/';
const giantBomb_apiKey = 'ce9caeb2d1ceee6ab55a95ebb2e6d7961f9e001d'

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

class Body extends Component {
    constructor(){
        super();
        this.state = {
            onLoadResults: [],
            results: [],
            imageResults: {},
            date: today
        }
    };

    clearResults = () => {
        this.setState({
            results: []
        })
    }

    filterResults = game => {
        const dateString = game.release_date.substring(0, 10);
        const gameDate = new Date(dateString);
        const stateDate = new Date(this.state.date)
        //create date objects for comparison purposes

        return game.image && gameDate < stateDate && game.description !== ''
    };

    findGameImages = (gameId) => {
        axios({
            url: proxyURL,
            method: 'GET',
            dataResponse: 'json',
            paramsSerializer: function (params) {
                return Qs.stringify(params, { arrayFormat: 'brackets' });
            },
            params: {
                reqUrl: `https://www.gamespot.com/api/images/?api_key=7c8c72eb22a85289937160cd744b4ef17f79669d&format=json&filter=association%3A5000-${gameId}`,
            }
        })
        .then((object) => {
            const images = object.data.results;
            const originalImages = images.map(image => image.original)
            this.setState({
                imageResults: { ...this.state.imageResults, [gameId]: originalImages } //spread previousState's array, add the new item and set state
            })
        })
    };  

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
            const searchResults = object.data.results.filter(this.filterResults)
            //filter the results before setting it to state so subsequent API calls that access state are consistent with game results
            if (searchResults.length){
                this.setState({
                    results: searchResults
                });
            } else {
                this.setState({
                    results: false
                })
            }
        })
        .then(() => {
            if(this.state.results){
                this.state.results.forEach(game => this.findGameImages(game.id))
            }
        })
    };

    findGamesOnLoad = () => {
        axios({
            url: proxyURL,
            method: 'GET',
            dataResponse: 'json',
            paramsSerializer: function (params) {
                return Qs.stringify(params, { arrayFormat: 'brackets' });
            },
            params: {
                reqUrl: giantBomb_games,
                params: {
                    api_key: giantBomb_apiKey,
                    format: 'json',
                    limit: 6,
                    filter: `expected_release_year:${yyyy}`,
                    // Filter will find games that have at least one of values in the query
                    sort: 'date_added:desc',
                }
            }
        })
        .then(object => {
            const searchResults = object.data.results.filter(game => game.name && game.image)
            if (searchResults.length) {
                this.setState({
                    onLoadResults: searchResults
                });
            } else {
                this.setState({
                    onLoadResults: false,
                })
            }
            console.log(searchResults)
        })
    }

    showReleasedGames = () => {
        if(!this.props.loading){
           const gameList = this.state.onLoadResults.map(game => {
               return (
                   <div>
                        <h2>{game.name}</h2>
                   </div>
               )
           })
            return <div>{gameList}</div>
        } else {
            const gameList = this.state.results.map(game => {
                let dateString = game.release_date.substring(0, 10);

                return (
                    <div className="card flex_row" key={game.id} data-aos="fade-up">
                        <div className="img__container">
                            <img src={game.image.original} alt={`Cover of ${game.name}`} />
                        </div>
                        <div className="text__container">
                            <div className="text__container__gameInfo">
                                <h2 className="game__title">{game.name}</h2>
                                <h3 className="game__date">Release Date: <span>{dateString}</span></h3>
                                <p className="game__description">{game.description}</p>
                            </div>
                            <MoreInfo game={game} imageResults={this.state.imageResults} />
                        </div>
                    </div>
                );
            })
            return <div className="gameList">{gameList}</div>
        //must return for the function to end and render what is stored in gamesList array
        }
    };

    showLoadScreen = () => {
        if(!this.props.loading){
            // shows on initial load of the app
            return (
                <div>
                    <h2 className="loading">Loading . . .</h2>
                </div>
            )
        } else if (!this.state.results.length){
            //renders when the this.state.results is an empty array
            return (
                <div>
                    <h2 className="loading">Searching . . .</h2>
                </div>
            )
        } else {
            //renders when this.state.results is false 
            return (
                <div>
                    <h2 className="empty empty__results">{`No results found for "${this.props.userQuery}"`}</h2>
                </div>
            )
        }
    }; 
    //this doesnt need to be called in componentDidUpdate because App sets state once handleSubmit fires (userQuery), triggering render in Body 

    componentDidUpdate(prevProps, prevState){
        if(this.props.userQuery !== prevProps.userQuery){
            //clear the results before setting state (triggers the loading state)
            this.setState({
                results: [],
                onLoadResults: []
            }) 
            this.findGames()
        };

        //this "refreshes the page"
        if(this.props.loading !== prevProps.loading && !this.props.loading){
            this.setState({
                results:[]
            })
        };
    }

    componentDidMount(){
        this.findGamesOnLoad()
        AOS.init({
            duration: 1500,
            once:true
        })
    }

    render(){
        return(
                <main className="wrapper">
                    { 
                        this.state.results.length || this.state.onLoadResults.length ?
                        this.showReleasedGames() : 
                        this.showLoadScreen()
                    }
                </main>
            ); 
    }
}

export default Body;