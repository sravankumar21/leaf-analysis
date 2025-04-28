import os
import numpy as np
import tensorflow as tf
from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import logging

# --------------------- Configuration --------------------- #
app = Flask(__name__)
CORS(app, resources={r"/predict*": {"origins": "http://localhost:3000"}})

logging.basicConfig(level=logging.DEBUG)

MODEL_DIR = "models"
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

SPECIES_MODEL_PATH = os.path.join(MODEL_DIR, "leaf_species_classifier.h5")
HEALTH_MODEL_PATH = os.path.join(MODEL_DIR, "leafhealthyordiseaseclassifier.h5")
CLASS_NAMES_PATH = os.path.join(MODEL_DIR, "class_names.npy")

# --------------------- Load Models --------------------- #
try:
    logging.info("Loading models...")
    species_model = tf.keras.models.load_model(SPECIES_MODEL_PATH, compile=False)
    health_model = tf.keras.models.load_model(HEALTH_MODEL_PATH, compile=False)
    class_names = np.load(CLASS_NAMES_PATH, allow_pickle=True)
    logging.info("Models loaded successfully.")
except Exception as e:
    logging.error(f"Error loading models: {e}")
    raise

# --------------------- Helper Function --------------------- #
def preprocess_image(file):
    try:
        image = Image.open(file.stream).convert('RGB')
        image = image.resize((150, 150))  # Resize to match the expected input size
        img_array = np.array(image) / 255.0
        return np.expand_dims(img_array, axis=0)  # Adding the batch dimension
    except Exception as e:
        logging.error(f"Image preprocessing failed: {e}")
        return None

# --------------------- Routes --------------------- #
@app.route('/')
def health_check():
    logging.info("Health check accessed")
    return jsonify({'status': 'ok', 'message': 'Backend server is running'})

@app.route('/predict', methods=['POST'])
def predict_species():
    logging.info("Predicting species...")

    if 'file' not in request.files or request.files['file'].filename == '':
        logging.warning("No file uploaded")
        return jsonify({'error': 'No file uploaded'}), 400

    img_array = preprocess_image(request.files['file'])
    if img_array is None:
        return jsonify({'error': 'Invalid image format'}), 400

    # Flatten the image for Dense-based model
    img_array = img_array.reshape(1, -1)  # Shape becomes (1, 224*224*3)

    try:
        # Log input shape
        logging.debug(f"Input image shape: {img_array.shape}")

        predictions = species_model.predict(img_array)
        logging.debug(f"Model predictions: {predictions}")

        expected_input_shape = species_model.input_shape[1:]
        actual_input_shape = img_array.shape[1:]
        logging.debug(f"Expected model input shape: {expected_input_shape}")
        logging.debug(f"Actual input shape: {actual_input_shape}")

        if expected_input_shape != actual_input_shape:
            logging.error(f"Input shape mismatch. Expected: {expected_input_shape}, Got: {actual_input_shape}")
            return jsonify({'error': 'Input shape mismatch'}), 500

        predicted_index = np.argmax(predictions[0])
        predicted_class = class_names[predicted_index] if predicted_index < len(class_names) else "Unknown"
        confidence = round(float(np.max(predictions[0])), 2)

        return jsonify({
            'predicted_class': predicted_class,
            'confidence': confidence
        })

    except Exception as e:
        logging.exception("Species prediction failed")
        return jsonify({'error': 'Model prediction failed'}), 500

@app.route('/predict/health', methods=['POST'])
def predict_health():
    logging.info("Predicting health status...")

    if 'file' not in request.files or request.files['file'].filename == '':
        logging.warning("No file uploaded")
        return jsonify({'error': 'No file uploaded'}), 400

    img_array = preprocess_image(request.files['file'])
    if img_array is None:
        return jsonify({'error': 'Invalid image format'}), 400

    try:
        prediction = health_model.predict(img_array)[0][0]
        health_status = "Healthy" if prediction > 0.5 else "Diseased"
        confidence = round(float(prediction if prediction > 0.5 else 1 - prediction), 2)

        return jsonify({
            'predicted_health': health_status,
            'confidence': confidence
        })

    except Exception as e:
        logging.error(f"Health prediction error: {e}")
        return jsonify({'error': 'Model prediction failed'}), 500

@app.route('/predict', methods=['OPTIONS'])
@app.route('/predict/health', methods=['OPTIONS'])
def handle_options():
    logging.info("Handling CORS pre-flight request")
    response = jsonify({'status': 'ok'})
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
    response.headers.add('Access-Control-Allow-Methods', 'POST, OPTIONS')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    return response

# --------------------- Run Server --------------------- #
if __name__ == '__main__':
    logging.info("Starting Flask server...")
    app.run(debug=True, host='0.0.0.0', port=5050)
