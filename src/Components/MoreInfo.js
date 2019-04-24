import React, {Component} from 'react';
import Modal from 'react-modal';

const customStyles = {
    content: {
        top: '10%',
        left: '10%',
        right: '10%'
        // bottom: 'auto',
        // marginRight: '-50%',
        // transform: 'translate(-50%, -50%)',
    }
};

Modal.setAppElement('#root');
//for screenreader users, other content is hidden when modal is open (react-modal takes care of this through the above method)

class MoreInfo extends Component {
    constructor(){
        super();
        this.state = {
            modalIsOpen: false
        }

        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal() {
        this.setState({ modalIsOpen: true });
    }

    afterOpenModal() {
        // this.subtitle.style.color = '#ff2800';
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }

    isImageLoaded = (game) => {
        const imageResults = this.props.imageResults;

        return new Promise((resolve, reject) => {
            if(imageResults[game.id]){
                resolve(game);
            }
        })

    }

    showImages = (game, imageLinks = this.props.imageResults[game.id]) => {
        const imageGallery = imageLinks.map((imageLink, i) => {
            return <li><img src={imageLink} alt={`screenshot of ${game}`} key={`${game.id}:${i}`} /></li>
        })

        return <ul className="game_screenshots">{imageGallery}</ul>
    }

    //function wrapper for async functions - create image gallery for each game once API returns the image links
    showImageGallery = (game) => {

        return (this.isImageLoaded(game).then(this.showImages))

        // if(this.props.imageResults[game.id]){
        //     return (this.isImageLoaded(game).then(this.showImages))
        //     // return this.showImages(game);
        // } else if (this.props.imageResults[game.id].length < 1){
        //     return <p>{`No images found for ${game}`}</p>
        // }
    }

    render (){
        const game = this.props.game;
        let dateString = game.release_date.substring(0, 10);

        const hasImages = Object.keys(this.props.imageResults).length > 0; //checks if the object is empty - results in a boolean value
        // //keys turns all the keys in an object into an array. allowing us to use the length property
        //limit the amount of images to maybe 5

        return (
            <div>
                <button onClick={this.openModal}>Open Modal</button>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel={`More Info on: ${game.name}`}
                >
                    <h2>{game.name}</h2>
                    {/* parameter is the name of the reference, this.subtitle is the actual value being assigned to the reference subtitle  */}
                    <h3>{`Release Date: ${dateString}`}</h3>
                    <p>{game.description}</p>
                    <div className="game_screenshots">{this.showImageGallery(game)}</div>
                    {/* setState will trigger a render, allowing us to render the button first while we're waiting for the images to load */}
                    <button onClick={this.closeModal}>close</button>
                </Modal>
            </div>
        )
    }
}

export default MoreInfo;