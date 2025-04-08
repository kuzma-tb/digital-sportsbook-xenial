import React from "react";
import {Carousel} from "react-bootstrap";
import {Coupon} from '../components';

const CarouselImage = ({src, title}) => (
    <div className="carousel-image">
        <img
            className="d-block w-100"
            src={src}
            alt={title}
        />
    </div>
);

export const HomePage = () => {
    return (
        <>
            <Carousel>
                <Carousel.Item>
                    <CarouselImage src="/img/ATP_Tennis_New.jpg" title="ATP Tennis"/>
                </Carousel.Item>
                <Carousel.Item>
                    <CarouselImage src="/img/LaLigaDesktop.webp" title="La Liga"/>
                </Carousel.Item>
                <Carousel.Item>
                    <CarouselImage src="/img/NHL_NEW.png" title="NHL"/>
                </Carousel.Item>
            </Carousel>
            <Coupon couponId={1}/>
        </>
    );
};
