import React, { useState } from 'react';
import './tajmahal.css';
import TajMahalimage1 from './images/tajmahal1.jpg';
import TajMahalimage2 from './images/tajmahal2.jpg';
import TajMahalimage3 from './images/tajmahal3.jpg';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

const space ={height:'10px'}

const TajMahal = () => {
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
        googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAnWIvWgZBOQBYkT-wMZOJ4xbB8HF3T6D8&callback=initMap`;

        googleMapScript.async = true;
        googleMapScript.defer = true;
        window.initMap = initMap;
        document.head.appendChild(googleMapScript);
    };

    const initMap = () => {
        const tajMahalLocation = { lat: 27.1751, lng: 78.0421 };
        const map = new window.google.maps.Map(document.getElementById('map'), {
            center: tajMahalLocation,
            zoom: 15
        });
        new window.google.maps.Marker({
            position: tajMahalLocation,
            map: map,
            title: 'Taj Mahal'
        });
    };

    return (
        <div className="tajmahal-container">
            <h1>Taj Mahal</h1>
            <div className="tajmahal-info">
                <p>
                    The Taj Mahal is an ivory-white marble mausoleum on the south bank of the Yamuna river in the Indian city of Agra. It was commissioned in 1631 by the Mughal emperor, Shah Jahan, to house the tomb of his favorite wife, Mumtaz Mahal.
                </p>
                <p>
                    The Taj Mahal is widely recognized as "the jewel of Muslim art in India" and remains a symbol of India's rich history and cultural heritage. It attracts millions of visitors from all over the world every year.
                </p>
                <p>
                    Construction of the Taj Mahal began in 1632 and was completed in 1653, employing thousands of artisans and craftsmen. The main mausoleum is flanked by four minarets and is set within a large garden with reflecting pools, making it an architectural masterpiece.
                </p>
                <p>
                    The Taj Mahal's design incorporates elements from Persian, Islamic, and Indian architectural styles, making it a symbol of the fusion of cultural influences. It is also a UNESCO World Heritage Site and one of the Seven Wonders of the World.
                </p>
                <div className="tajmahal-images">
                    <img src={TajMahalimage1} alt="Taj Mahal" onClick={() => handleImageClick(TajMahalimage1)} />
                    <img src={TajMahalimage2} alt="Taj Mahal Upperview" onClick={() => handleImageClick(TajMahalimage2)} />
                    <img src={TajMahalimage3} alt="Taj Mahal" onClick={() => handleImageClick(TajMahalimage3)} />
                </div>
                {!showMap && <button onClick={handleViewMap}>View Map</button>}
                {showMap && <div id="map" style={{ width: '100%', height: '400px', marginTop: '20px' }}></div>}
                <div style={space}></div>
                <div style={space}></div>
            </div>
            {showFullImage && (
                <div className="full-image-overlay">
                    <div className="full-image-content">
                        <span className="close-button" onClick={handleCloseImage}>&times;</span>
                        <img src={fullImageUrl} alt="Full Taj Mahal" />
                    </div>
                </div>
            )}
            <div className="rating-section">
                <h2>Rate the Taj Mahal</h2>
                <Stack spacing={1}>
                    <Rating
                        name="tajmahal-rating"
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

export default TajMahal;