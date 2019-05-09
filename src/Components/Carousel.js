import React from 'react';
import { Carousel } from 'react-responsive-carousel';

const SSCarousel = (props) => {
    return (
        <Carousel
            showThumbs = {false}
        >
            {props.imageGallery}
        </Carousel>
    )
}

export default SSCarousel