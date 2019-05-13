import React from 'react';
import { Carousel } from 'react-responsive-carousel';

const SSCarousel = (props) => {
    return (
        <Carousel
            showThumbs = {false}
            showIndicators = {false}
        >
            {props.imageGallery}
        </Carousel>
    )
}

export default SSCarousel