import React from 'react';

const Body = (props) => {
    // let releaseDate = props.results[0].original_release_date.substring(0, 10);
    return(
            <main className="wrapper">
                   { 
                       props.results.map(game => {
                           let releaseDate = game.original_release_date.substring(0, 10);
                            return(

                                <div className="card flex_row" key={game.id}>
                                    <div className="img_container">
                                        <img src={game.image.original_url} alt={`Cover of ${game.name}`}/>
                                    </div>
                                    <div className="text_container">
                                        <h2>{game.name}</h2>
                                        <h3>{`Release Date: ${releaseDate}`}</h3> 
                                        <p className="description">{game.deck}</p> 
                                    </div>
                                </div>

                            )
                       })
                    }
            </main>
        ); 
}
// results may return more than 5, but append 5 at a time. use a condition so it isnt trying to append if there is less than 5 results
//filter results for only items with a value in original_game_rating

export default Body;

//limit to 5 results only
//filter through items that are not released yet