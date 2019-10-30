import React, {Component} from 'react';
import Modal from 'react-modal';
import SSCarousel from './Carousel';

Modal.setAppElement('#root');
//for screenreader users, other content is hidden when modal is open (react-modal takes care of this through the above method)

class MoreInfo extends Component {
    constructor(){
        super();
        this.state = {
            modalIsOpen: false,
        }

    }

    openModal = () => {
        this.setState({ modalIsOpen: true });
    }

    closeModal = () => {
        this.setState({ modalIsOpen: false });
    }

    getImages = (game, images) => {
        
        const imageGallery = []

        //push 8 images to imageGallery
        if(images.length){
            for (let i = 0; i < 8; i++){
                if(images[i]){
                    let image = images[i]
                    let imageItem = <img key={`${game.name}: ${i}`} src={image} alt={`screenshot of ${game.name}`} />
                    imageGallery.push(imageItem)
                }
            }
            return (
                    // Carousel components goes here, pass imagegallery as props
                    <SSCarousel className="screenshots" imageGallery={imageGallery}/>
                )   

        } else {
            return <h2 className="empty empty__images">{`No screenshots found for "${game.name}" :(`}</h2>
        }
        // else return false and show "Loading Images"

    };

    componentDidUpdate(){
        const bodyStyle = document.body.style;
        if(this.state.modalIsOpen){
            bodyStyle.overflow = "hidden"
            bodyStyle.height = "100%";
        } else {
            bodyStyle.overflow = "auto"
            bodyStyle.height = "auto";
        }
    }


    render (){
        const game = this.props.game;
        let dateString = game.release_date.substring(0, 10);
        const images = this.props.imageResults[game.id] ? this.props.imageResults[game.id] : ['Loading images . . .'];

        return (
            <div>
                <button className="modalButton modal__open" onClick={this.openModal}>More Info</button>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    contentLabel={`More Info on: ${game.name}`}
                    className="modal"
                    overlayClassName="modal__overlay"
                    contentClassName="modal__content"
                    closeTimeoutMS={90}
                >
                    <div className="modal__content">
                        <div className="game__title__wrapper">
                            <h2 className="game__title">{game.name}</h2>
                            <button className="modalButton modal__close" onClick={this.closeModal}>Close</button>
                        </div>
                        <h3 className="game__date">Release Date: <span>{dateString}</span></h3>
                        <p className="game__description">{game.description}</p>
                        <div className="modal__carousel">
                            {this.getImages(game, images)}
                        </div>
                        {/* setState will trigger a render, allowing us to render the button first while we're waiting for the images to load */}
                    </div>
                </Modal>
            </div>
        )
    }
}

export default MoreInfo;