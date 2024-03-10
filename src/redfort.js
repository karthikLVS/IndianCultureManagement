import React, { useState } from 'react';
import './redfort.css';
import RedFortImage1 from './images/redfort1.jpg';
import RedFortImage2 from './images/redfort2.jpg';
import RedFortImage3 from './images/redfort3.jpg';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

const space = { height: '10px' };

const RedFort = () => {
    const [showMap, setShowMap] = useState(false);
    const [showFullImage, setShowFullImage] = useState(false);
    const [fullImageUrl, setFullImageUrl] = useState('');
    const [rating, setRating] = useState(0);
    const [reviewSubmitted, setReviewSubmitted] = useState(false);

    const handleViewMap = () => {
        setShowMap(true);
        loadMapScript();
    };

    const handleImageClick = (imageSrc) => {
        setShowFullImage(true);
        setFullImageUrl(imageSrc);
    };

    const handleCloseImage = () => {
        setShowFullImage(false);
        setFullImageUrl('');
    };

    const handleRatingChange = (event, newValue) => {
        setRating(newValue);
    };

    const handleSubmitReview = () => {
        // Simulating asynchronous operation like API call
        setTimeout(() => {
            console.log('Submitting review:', rating);
            setReviewSubmitted(true); // Set reviewSubmitted to true after submitting
        }, 1000); // Simulate delay of 1 second (1000 milliseconds)
    };

    const loadMapScript = () => {
        const googleMapScript = document.createElement('script');
        googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap`; // Replace YOUR_API_KEY with your actual Google Maps API key
        googleMapScript.async = true;
        googleMapScript.defer = true;
        window.initMap = initMap;
        document.head.appendChild(googleMapScript);
    };

    const initMap = () => {
        const redFortLocation = { lat: 28.6562, lng: 77.2410 }; // Coordinates for Red Fort
        const map = new window.google.maps.Map(document.getElementById('map'), {
            center: redFortLocation,
            zoom: 15
        });
        new window.google.maps.Marker({
            position: redFortLocation,
            map: map,
            title: 'Red Fort'
        });
    };

    return (
        <div className="redfort-container">
            <h1>Red Fort</h1>
            <div className="redfort-info">
                <p>
                    The Red Fort is a historic fort in the city of Delhi in India. It was the main residence of the emperors of the Mughal dynasty for nearly 200 years, until 1857.
                </p>
                <p>
                    The fort represents the peak of Mughal architecture and is designated as a UNESCO World Heritage Site. It is known for its architectural brilliance and served as the ceremonial and political center of the Mughal state.
                </p>
                <p>
                    Construction of the Red Fort began in 1638 and was completed in 1648. The fort is made of red sandstone and covers an area of about 254 acres, surrounded by a moat. It is famous for its intricate artwork, including marble inlay and carvings.
                </p>
                <p>
                    The Red Fort is a symbol of India's rich cultural heritage and attracts millions of visitors from around the world every year. It remains an important historical monument and a testament to the grandeur of the Mughal era.
                </p>
                <div className="redfort-images">
                    <img src={RedFortImage1} alt="Red Fort" onClick={() => handleImageClick(RedFortImage1)} />
                    <img src={RedFortImage2} alt="Red Fort Upperview" onClick={() => handleImageClick(RedFortImage2)} />
                    <img src={RedFortImage3} alt="Red Fort" onClick={() => handleImageClick(RedFortImage3)} />
                </div>
                {!showMap && <button onClick={handleViewMap}>View Map</button>}
                {showMap && <div id="map" style={{ width: '100%', height: '400px', marginTop: '20px' }}></div>}
                <div style={space}></div>
                <div style={space}></div>
            </div>
            {showFullImage && (
                <div className="full-image-overlay" onClick={handleCloseImage}>
                    <span className="close-button">&times;</span>
                    <img src={fullImageUrl} alt="Full Red Fort" className="full-image" />
                </div>
            )}
            <div className="rating-section">
                <h2>Rate the Red Fort</h2>
                <Stack spacing={1}>
                    <Rating
                        name="redfort-rating"
                        value={rating}
                        onChange={handleRatingChange}
                        precision={0.5}
                    />
                </Stack>
                <button onClick={handleSubmitReview}>Submit Review</button>
                {reviewSubmitted && <p>Review Submitted Successfully!</p>}
            </div>
        </div>
    );
}

export default RedFort;
