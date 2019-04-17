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

    createImageGallery = () => {
        const imageGallery = this.props.imageResults[107502].map(image => <img src={image} />)

        return <div className='imageGallery'>{imageGallery}</div>
    }

    render (){

        const game = this.props.game;
        let dateString = game.release_date.substring(0, 10);

        const hasImages = Object.keys(this.props.imageResults).length > 0; //checks if the object is empty - results in a boolean value
        //keys turns all the names in the object into an arrray. allowing us to use the length property

        console.log(hasImages);
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
                    {hasImages ? this.createImageGallery() : null}; 
                    {/* setState will trigger a render, allowing us to render the button first while we're waiting for the images to load */}
                    <button onClick={this.closeModal}>close</button>
                </Modal>
            </div>
        )
    }
}

export default MoreInfo;