// import React, { useState } from 'react';
// import './basilica_of_bom_jesus.css';
// import BasilicaImage1 from './images/basilica1.jpg';
// import BasilicaImage2 from './images/basilica2.jpg';
// import BasilicaImage3 from './images/basilica3.jpg';

// const BasilicaOfBomJesus = () => {
//     const [showMap, setShowMap] = useState(false);

//     const handleViewMap = () => {
//         setShowMap(true);
//         loadMapScript();
//     };

//     const loadMapScript = () => {
//         const googleMapScript = document.createElement('script');
//         googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDqOIJO2ldFaC_4O6gaj4mJ4ViSpPlh4uo&callback=initMap`; // Replace YOUR_API_KEY with your actual Google Maps API key
//         googleMapScript.async = true;
//         googleMapScript.defer = true;
//         window.initMap = initMap;
//         document.head.appendChild(googleMapScript);
//     };

//     const initMap = () => {
//         const basilicaLocation = { lat: 15.5004, lng: 73.9111 }; // Coordinates for Basilica of Bom Jesus
//         const map = new window.google.maps.Map(document.getElementById('map'), {
//             center: basilicaLocation,
//             zoom: 15
//         });
//         new window.google.maps.Marker({
//             position: basilicaLocation,
//             map: map,
//             title: 'Basilica of Bom Jesus'
//         });
//     };

//     return (
//         <div className="basilica-container">
//             <h1>Basilica of Bom Jesus</h1>
//             <div className="basilica-info">
//                 <p>
//                     The Basilica of Bom Jesus is a UNESCO World Heritage Site located in Goa, India. It is known for housing the mortal remains of St. Francis Xavier.
//                 </p>
//                 <p>
//                     The basilica is a fine example of Baroque architecture and is one of the oldest churches in India. It was constructed in the late 16th century and is a popular pilgrimage site for Catholics from around the world.
//                 </p>
//                 <div className="basilica-images">
//                     <img src={BasilicaImage1} alt="Basilica of Bom Jesus" />
//                     <img src={BasilicaImage2} alt="Basilica of Bom Jesus Interior" />
//                     <img src={BasilicaImage3} alt="Basilica of Bom Jesus" />
//                 </div>
//                 {!showMap && <button onClick={handleViewMap}>View Map</button>}
//                 {showMap && <div id="map" style={{ width: '100%', height: '400px', marginTop: '20px' }}></div>}
//             </div>
//         </div>
//     );
// }

// export default BasilicaOfBomJesus;


// BasilicaOfBomJesus.js
import React, { useState } from 'react';
import './basilica_of_bom_jesus.css';
import BasilicaImage1 from './images/basilica1.jpg';
import BasilicaImage2 from './images/basilica2.jpg';
import BasilicaImage3 from './images/basilica3.jpg';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
const space = { height: '10px' };

const BasilicaOfBomJesus = () => {
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
        googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBA2jxZtJo79PHM87dPShu-ZX2BE6RaWzM&callback=initMap`; // Replace YOUR_API_KEY with your actual Google Maps API key
        googleMapScript.async = true;
        googleMapScript.defer = true;
        window.initMap = initMap;
        document.head.appendChild(googleMapScript);
    };

    const initMap = () => {
        const basilicaLocation = { lat: 15.5004, lng: 73.9111 }; // Coordinates for Basilica of Bom Jesus
        const map = new window.google.maps.Map(document.getElementById('map'), {
            center: basilicaLocation,
            zoom: 15
        });
        new window.google.maps.Marker({
            position: basilicaLocation,
            map: map,
            title: 'Basilica of Bom Jesus'
        });
    };

    return (
        <div className="basilica-container">
            <h1>Basilica of Bom Jesus</h1>
            <div className="basilica-info">
                <p>
                    The Basilica of Bom Jesus is a UNESCO World Heritage Site located in Goa, India. It is known for housing the mortal remains of St. Francis Xavier.
                </p>
                <p>
                    The basilica is a fine example of Baroque architecture and is one of the oldest churches in India. It was constructed in the late 16th century and is a popular pilgrimage site for Catholics from around the world.
                </p>
                <div className="basilica-images">
                    <img src={BasilicaImage1} alt="Basilica of Bom Jesus" onClick={() => handleImageClick(BasilicaImage1)} />
                    <img src={BasilicaImage2} alt="Basilica of Bom Jesus Interior" onClick={() => handleImageClick(BasilicaImage2)} />
                    <img src={BasilicaImage3} alt="Basilica of Bom Jesus" onClick={() => handleImageClick(BasilicaImage3)} />
                </div>
                {!showMap && <button onClick={handleViewMap}>View Map</button>}
                {showMap && <div id="map" style={{ width: '100%', height: '400px', marginTop: '20px' }}></div>}
                <div style={space}></div>
                <div style={space}></div>
            </div>
            {showFullImage && (
                <div className="full-image-overlay" onClick={handleCloseImage}>
                    <span className="close-button">&times;</span>
                    <img src={fullImageUrl} alt="Full Basilica of Bom Jesus" className="full-image" />
                </div>
            )}
            <div className="rating-section">
                <h2>Rate the Basilica Of Bom Jesus</h2>
                <Stack spacing={1}>
                    <Rating
                        name="basilica_of_bom_jesus-rating"
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

export default BasilicaOfBomJesus;
