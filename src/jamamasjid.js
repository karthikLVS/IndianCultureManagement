import React, { useState } from 'react';
import './jamamasjid.css';
import JamaMasjidImage1 from './images/jama_masjid1.jpg';
import JamaMasjidImage2 from './images/jama_masjid2.jpg';
import JamaMasjidImage3 from './images/jama_masjid3.jpg';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

const space = { height: '10px' };

const JamaMasjid = () => {
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
        const jamaMasjidLocation = { lat: 28.6539, lng: 77.2355 }; // Coordinates for Jama Masjid
        const map = new window.google.maps.Map(document.getElementById('map'), {
            center: jamaMasjidLocation,
            zoom: 15
        });
        new window.google.maps.Marker({
            position: jamaMasjidLocation,
            map: map,
            title: 'Jama Masjid'
        });
    };

    return (
        <div className="jama-masjid-container">
            <h1>Jama Masjid</h1>
            <div className="jama-masjid-info">
                <p>
                    The Jama Masjid is one of the largest mosques in India located in the heart of Old Delhi. It was built by the Mughal Emperor Shah Jahan between 1644 and 1656.
                </p>
                <p>
                    The mosque is made of red sandstone and white marble and can accommodate more than 25,000 worshippers at a time. It is known for its grandeur and architectural beauty.
                </p>
                <p>
                    The Jama Masjid is an important religious and historical site and attracts tourists and worshippers from all over the world. It is a symbol of the rich cultural heritage of India.
                </p>
                <div className="jama-masjid-images">
                    <img src={JamaMasjidImage1} alt="Jama Masjid" onClick={() => handleImageClick(JamaMasjidImage1)} />
                    <img src={JamaMasjidImage2} alt="Jama Masjid Sideview" onClick={() => handleImageClick(JamaMasjidImage2)} />
                    <img src={JamaMasjidImage3} alt="Jama Masjid" onClick={() => handleImageClick(JamaMasjidImage3)} />
                </div>
                {!showMap && <button onClick={handleViewMap}>View Map</button>}
                {showMap && <div id="map" style={{ width: '100%', height: '400px', marginTop: '20px' }}></div>}
                <div style={space}></div>
                <div style={space}></div>
            </div>
            {showFullImage && (
                <div className="full-image-overlay" onClick={handleCloseImage}>
                    <span className="close-button">&times;</span>
                    <img src={fullImageUrl} alt="Full Jama Masjid" className="full-image" />
                </div>
            )}
            <div className="rating-section">
                <h2>Rate the Jama Masjid</h2>
                <Stack spacing={1}>
                    <Rating
                        name="jamamasjid-rating"
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

export default JamaMasjid;
