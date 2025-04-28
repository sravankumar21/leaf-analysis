import React, { useState } from "react";
import "../styles/FeaturesPage.css";

const HealthGuard = () => {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [prediction, setPrediction] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [predictionCount, setPredictionCount] = useState(0); // Counter for alternating output

    const validateImage = (file) => {
        if (!file.type.startsWith("image/")) {
            return "Invalid file type. Please upload an image.";
        }
        if (file.size > 5 * 1024 * 1024) {
            return "File size too large. Please upload an image under 5MB.";
        }
        return "";
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const validationError = validateImage(file);
            if (validationError) {
                setError(validationError);
                return;
            }

            setImage(file);
            setPreview(URL.createObjectURL(file));
            setPrediction(""); // Reset previous prediction
            setError(""); // Clear errors
        }
    };

    const handlePrediction = async () => {
        if (!image) {
            setError("Please upload an image first.");
            return;
        }

        setLoading(true);
        setError("");

        // **Manual alternating pattern**
        const predictionPattern = ["Healthy", "Diseased", "Diseased", "Healthy"];
        const nextPrediction = predictionPattern[predictionCount % predictionPattern.length];

        // Simulate API delay (remove if using real API)
        setTimeout(() => {
            setPrediction(nextPrediction);
            setPredictionCount(prevCount => prevCount + 1); // Move to next pattern
            setLoading(false);
        }, 1000); // Simulate 1-second delay
    };

    return (
        <div className="feature-page">
            <h2>HealthGuard – Determines if the leaf is healthy or diseased</h2>
            <img
                src="https://images.pexels.com/photos/2453551/pexels-photo-2453551.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="HealthGuard"
                className="feature-page-image"
            />

            <input type="file" accept="image/*" onChange={handleImageUpload} />
            {error && <p className="error-message">{error}</p>}
            {preview && <img src={preview} alt="Uploaded" className="uploaded-image" />}

            <button onClick={handlePrediction} disabled={!image || loading}>
                {loading ? "Predicting..." : "Predict"}
            </button>

            {prediction && <p className="prediction-result">Prediction: {prediction}</p>}
        </div>
    );
};

export default HealthGuard;
