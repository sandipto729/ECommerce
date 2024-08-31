import React from "react";
import Slider from "react-slick";
import img1 from './../assest/banner/img1.webp';
import img2 from './../assest/banner/img2.webp';
import img3 from './../assest/banner/img3.jpg';
import img4 from './../assest/banner/img4.jpg';
import img5 from './../assest/banner/img5.webp';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './BannerProduct.css'; // Import your CSS file

export default function BannerProduct() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000
    };

    return (
        <div className="slider-container">
            <Slider {...settings}>
                <div className="slider-item">
                    <img src={img1} alt="Image 1" className="slider-image" />
                </div>
                <div className="slider-item">
                    <img src={img2} alt="Image 2" className="slider-image" />
                </div>
                <div className="slider-item">
                    <img src={img3} alt="Image 3" className="slider-image" />
                </div>
                <div className="slider-item">
                    <img src={img4} alt="Image 4" className="slider-image" />
                </div>
                <div className="slider-item">
                    <img src={img5} alt="Image 5" className="slider-image" />
                </div>
            </Slider>
        </div>
    );
}
