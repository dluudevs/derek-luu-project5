import React, {Component} from 'react';
import Modal from 'react-modal';

const customStyles = {
    content: {
        top: '12%',
        left: '10%',
        right: '10%',
        bottom: '2%',
        outline: '#ff2800'
    }
};

Modal.setAppElement('#root');
//for screenreader users, other content is hidden when modal is open (react-modal takes care of this through the above method)

class MoreInfo extends Component {
    constructor(){
        super();
        this.state = {
            modalIsOpen: false,
            imageGallery: {}
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

    getImages = (game, images) => {
        
        const imageGallery = []

        //push 6 images to imageGallery
        if(images.length){
            for (let i = 0; i < 5; i++){
                let image = images[i]
                let imageItem = <li key={`${game.name}: ${i}`}><img src={image} alt={`screenshot of ${game.name}`} /></li>
                imageGallery.push(imageItem)
            };
            return <ul className={`screenshots`}>{imageGallery}</ul>
        } else {
            return <h2 className="empty empty__images">{`No screenshots found for "${game.name}" :(`}</h2>
        }

    };

    render (){
        const game = this.props.game;
        let dateString = game.release_date.substring(0, 10);
        const images = this.props.imageResults[game.id] ? this.props.imageResults[game.id] : [];
        //error handling, use an empty array instead. an undefined array will throw an error and stop map from running

        return (
            <div>
                <button className="modalButton modal__open" onClick={this.openModal}>More Info</button>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    // style={customStyles}
                    contentLabel={`More Info on: ${game.name}`}
                    className="modal"
                    overlayClassName="modal__overlay"
                >
                    <div className="modal__content">
                        <h2>{game.name}</h2>
                        <h3>{`Release Date: ${dateString}`}</h3>
                        <p>{game.description}</p>
                        {this.getImages(game, images)}
                        {/* setState will trigger a render, allowing us to render the button first while we're waiting for the images to load */}
                        <button className="modalButton modal__close" onClick={this.closeModal}>close</button>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default MoreInfo;