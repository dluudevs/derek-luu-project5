import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.css";

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