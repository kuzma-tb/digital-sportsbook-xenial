import React, { useState, useEffect } from "react";
import {Alert, Carousel, Spinner} from "react-bootstrap";
import { Coupon, Image } from '../components';

const carouselImages = [
    {name: 'ATP_Tennis_New', alt: 'ATP Tennis'},
    {name: 'LaLigaDesktop', alt: 'La Liga'},
    {name: 'NHL_NEW', alt: 'NHL'},
]

export const HomePage = () => {
    const [canShow, setCanShow] = useState(null)

    useEffect(() => {
        fetch('/img/optimized.json')
            .then((res) => {
                if (!res.ok) throw new Error();
                return res.json();
            })
            .then((data) => {
                const filenames = data.images || [];
                const allExist = carouselImages.every(({ name }) =>
                    filenames.includes(`${name}-medium.webp`)
                );
                setCanShow(allExist);
            })
            .catch(() => {
                setCanShow(false);
            });
    }, []);

    if (canShow === null) return <Spinner animation="border" variant="primary" />

    if (!canShow) {
        return (
            <Alert variant="warning">
                Responsive images not found.
                Please run <code>npm run optimize-images</code> to generate them.
            </Alert>
        )
    }

    return (
        <>
            <Carousel>
                {carouselImages.map(({ name, alt }) => (
                    <Carousel.Item key={name} >
                        <div className="carousel-image">
                            <Image name={name} alt={alt} className="d-block w-100" />
                        </div>
                    </Carousel.Item>
                ))}
            </Carousel>
            <Coupon couponId={1}/>
        </>
    );
};
