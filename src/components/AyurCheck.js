import React, { useState } from 'react';
import '../styles/FeaturesPage.css';

const AyurCheck = () => {
    const [image, setImage] = useState(null);
    const [leafInfo, setLeafInfo] = useState(null);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
            setLeafInfo(null); // Reset previous info when new image is uploaded
        }
    };

    const handlePredict = () => {
        // Here, you can later integrate ML prediction or logic to recognize the image
        // For now, we're directly assigning Chinar leaf content
        setLeafInfo({
            name: "Chinar Leaf",
            maturity: "Mature",
            recommended: "Yes",
            benefits: "Chinar leaves have anti-inflammatory and antimicrobial properties. Traditionally used in Ayurveda for wound healing and soothing skin irritations."
        });
    };

    return (
        <div className="feature-page">
            <h2>AyurCheck – Provides medicinal insights & recommendations</h2>
            <img 
                src="https://images.pexels.com/photos/172505/pexels-photo-172505.jpeg?auto=compress&cs=tinysrgb&w=1200" 
                alt="AyurCheck" 
                className="feature-page-image" 
            />
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            {image && (
                <>
                    <img src={image} alt="Uploaded" className="uploaded-image" />
                    <button onClick={handlePredict} className="predict-button">Predict</button>
                </>
            )}
            {leafInfo && (
                <div className="leaf-details">
                    <h3>Leaf Information</h3>
                    <p><strong>Leaf Name:</strong> {leafInfo.name}</p>
                    <p><strong>Maturity Stage:</strong> {leafInfo.maturity}</p>
                    <p><strong>Recommended for Ayurvedic Use:</strong> {leafInfo.recommended}</p>
                    <p><strong>Benefits:</strong> {leafInfo.benefits}</p>
                </div>
            )}
        </div>
    );
};

export default AyurCheck;
