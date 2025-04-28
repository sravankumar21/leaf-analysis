import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import '../styles/leafsenseog.css';

const LeafSense = ({ setReport }) => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [prediction, setPrediction] = useState("");
  const [confidence, setConfidence] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const [additionalInfo, setAdditionalInfo] = useState("");

  const validateImage = (file) => {
    if (!file.type.startsWith("image/")) return "Invalid file type. Please upload an image.";
    if (file.size > 5 * 1024 * 1024) return "File too large. Upload under 5MB.";
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
      setPrediction("");
      setConfidence(null);
      setError("");
      setShowMoreInfo(false);
      setAdditionalInfo("");
    }
  };

  const handlePrediction = async () => {
    if (!image) {
      setError("Please upload an image first.");
      return;
    }

    setLoading(true);
    setError("");
    setPrediction("");
    setConfidence(null);

    // Simulate a delay for the mock prediction response
    setTimeout(() => {
      setPrediction("Chinar"); // Mock response for prediction
      setConfidence(0.95); // Mock confidence value (95%)
      setLoading(false);
    }, 1000); // Delay for 1 second (simulate the prediction process)
  };

  const handleShowMoreInfo = () => {
    if (prediction === "Chinar") {
      setAdditionalInfo(
        `Chinar Ayurvedic leaf, also known as Chinar (or Chinar tree), refers to a plant that holds significance in traditional Ayurvedic medicine. Here are some important points about it:

        Scientific Name: The Chinar tree is known as Platanus orientalis. It is also sometimes referred to as the Oriental Plane tree.

        Medicinal Uses:
        - The leaves and bark of the Chinar tree are used in traditional medicine for various purposes, including wound healing and treating inflammation.
        - The leaves are believed to have cooling properties, which help in reducing heat-related conditions.
        - It is used to treat respiratory issues, such as asthma and cough, due to its anti-inflammatory properties.

        Antioxidant and Anti-inflammatory: Chinar leaves contain compounds with antioxidant properties, helping to fight oxidative stress and inflammation in the body.

        Skin Care: Chinar leaves have been used in Ayurvedic formulations for skin-related issues like eczema and acne. The leaves' natural compounds help soothe and calm irritated skin.`
      );
    }
    setShowMoreInfo(true);
  };

  const handleAddToReport = () => {
    const reportEntry = `Predicted Species: ${prediction}\nConfidence: ${confidence * 100}%\nAdditional Info: ${additionalInfo}`;
    setReport((prevReport) => prevReport + "\n" + reportEntry);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
  
    const marginLeft = 20;
    let yPosition = 20;
    const lineHeight = 10;
    const pageHeight = doc.internal.pageSize.height;
  
    // Title
    doc.setFontSize(16);
    doc.text('LeafSense - Prediction Report', marginLeft, yPosition);
    yPosition += 10;
  
    // Image (if available)
    if (preview) {
      doc.addImage(preview, 'JPEG', marginLeft, yPosition, 180, 160);
      yPosition += 170;
    }
  
    // Prediction and Confidence
    doc.setFontSize(12);
    doc.text(`Predicted Species: ${prediction}`, marginLeft, yPosition);
    yPosition += lineHeight;
    doc.text(`Confidence: ${confidence * 100}%`, marginLeft, yPosition);
    yPosition += lineHeight;
  
    // Additional Info (split into lines and paginate)
    const infoText = `Additional Info: ${additionalInfo}`;
    const splitText = doc.splitTextToSize(infoText, 180);
  
    splitText.forEach(line => {
      if (yPosition + lineHeight > pageHeight - 10) {
        doc.addPage();
        yPosition = 20;
      }
      doc.text(line, marginLeft, yPosition);
      yPosition += lineHeight;
    });
  
    doc.save('LeafSense_Report.pdf');
  };
  

  return (
    <div className="leafSenseContainer">
      <h2 className="leafSenseTitle">LeafSense – Identify Your Plant Leaf Instantly</h2>
      <img
        src="https://images.unsplash.com/photo-1646651570799-7c4cbad8b497?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGxlYWYlMjBiYWNrZ3JvdW5kfGVufDB8fDB8fHww"
        alt="LeafSense"
        className="leafSenseImage"
      />
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleImageUpload} 
        className="uploadInput" 
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {preview && <img src={preview} alt="Uploaded" className="uploadedImage" />}
      <button 
        onClick={handlePrediction} 
        disabled={!image || loading} 
        className="predictButton"
      >
        {loading ? "Predicting..." : "Predict"}
      </button>

      {prediction && (
        <div style={{ marginTop: '20px' }}>
          <p><strong>Predicted Species:</strong> {prediction}</p>
          <p><strong>Confidence:</strong> {confidence * 100}%</p>
        </div>
      )}

      {prediction && !showMoreInfo && (
        <div style={{ marginTop: '20px' }}>
          <p>Do you want to know more about the leaf {prediction}?</p>
          <button 
            onClick={handleShowMoreInfo} 
            className="infoButtons"
          >
            Yes
          </button>
          <button 
            onClick={() => setShowMoreInfo(false)} 
            className="noInfoButton"
          >
            No
          </button>
        </div>
      )}

      {showMoreInfo && additionalInfo && (
        <div style={{ marginTop: '20px' }}>
          <p><strong>Additional Info:</strong> {additionalInfo}</p>
        </div>
      )}

      {prediction && (
        <div style={{ marginTop: '20px' }}>
          <button 
            onClick={handleAddToReport} 
            className="reportButton"
          >
            Add result to report
          </button>
          <button 
            onClick={generatePDF} 
            className="downloadButton"
          >
            Download PDF Report
          </button>
        </div>
      )}
    </div>
  );
};

export default LeafSense;
