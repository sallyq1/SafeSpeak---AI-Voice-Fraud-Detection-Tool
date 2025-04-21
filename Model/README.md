# Audio DeepFake Detection System

## Project Overview
This project implements an advanced deep learning system for detecting deepfake audio content using a combination of sophisticated audio feature extraction, transformer-based models, and ensemble learning techniques. The system is designed to distinguish between genuine (real) and artificially generated (fake) audio samples with high accuracy and robustness.

## Key Features
- Multi-layered feature extraction pipeline
- Transformer-based neural network architecture
- Ensemble model implementation
- Data augmentation with validation
- Multi-training component for model optimization

## Usage

### OS Requirements
Our team is running the notebook on Google Colab. We take the notebook file and upload it onto google colab.

We are using the free tier and we have the training data (and requirements.txt file) uploaded to a Google Drive account with the same folder structure listed below. Note that the data is located in a folder on the root of the google drive account titled "notebook_data".
```
notebook_data/
├── real/
├───── clip1.wav
├───── ...
├── fake/
├───── clip1.wav
├───── ...
├── requirements.txt
├── michael-real.wav
├── michael-fake.wav

The notebook will read from the path /content/drive/MyDrive/notebook_data to access this folder
```

Here is the Google drive folder that our team is currently using: https://drive.google.com/drive/folders/1TpkC1UkAB7qs4hgGqV5GLjY4yNDMXQbL?usp=sharing

The notebook will take a decent amount of time to run completely (5min or so) because it is training the model on all of the provided audio clips.
 
This notebook (if running locally) would work best on a MacOS device or a Linux device. However, changes would need to be made to the notebook so it's not suggested. You would have to change paths and remove references to loading and mounting Google Drive.

Note that all of our audio clips are .wav files because we wanted a lossless audio format. The input to the model is expected to be a .wav file as well.


## Technical Architecture

### 1. Feature Extraction
The system employs a comprehensive feature extraction pipeline (`extract_high_advanced_features`) that captures:

#### Spectral Features
- MFCCs (Mel-frequency cepstral coefficients)
- Spectral centroid
- Spectral bandwidth
- Spectral contrast
- Spectral rolloff
- Chroma features

#### Temporal Features
- Zero crossing rate
- Tempo estimation
- Beat tracking

#### Voice-specific Features
- Harmonic components
- RMS energy
- Spectral flatness
- Voice formant approximation
- Pitch statistics
- Voice jitter approximation

### 2. Model Architecture

#### Base Transformer Model
- Input layer with positional encoding
- Multi-head attention layers (8 heads)
- Layer normalization
- Dense layers with dropout
- Binary classification output

#### Ensemble Model
- Multiple transformer models trained independently
- Weighted voting system based on validation performance
- Performance threshold filtering (>0.6 accuracy)

### 3. Data Augmentation
Implements controlled audio augmentation techniques:
- Time stretching (0.995-1.005 range)
- Pitch shifting (-1 to 1 steps)
- Minimal noise injection
- Time shifting
- Amplitude scaling

Each augmented sample undergoes validation to ensure quality:
- Feature correlation checking
- Mean and standard deviation comparison
- Statistical validation

### 4. Multi-Training Component
- Trains multiple instances of both base and ensemble models
- Tracks and saves the best performing models
- Implements early stopping and learning rate reduction
- Uses class weights for imbalanced datasets

## Dependencies
```python
tensorflow>=2.0.0
librosa==0.10.2.post1
numpy==2.1.3
scikit-learn==1.6.1
soundfile==0.13.0
```

## Model Training Flow
1. **Data Preparation**
   - Load and preprocess audio files
   - Extract advanced features
   - Split into training/validation sets

2. **Training Process**
   - Multiple training iterations
   - Base model training with transformer architecture
   - Ensemble model training with weighted voting
   - Best model selection and saving

3. **Model Evaluation**
   - Validation accuracy tracking
   - AUC-ROC curve analysis
   - Classification report generation

## Usage

### Training
```python
# Train multiple models
training_results = train_multiple_models(X_train, y_train, X_val, y_val, num_iterations=3)
```

### Inference
```python
# Load best models
best_base_model, best_ensemble_model = load_best_models()

# Make predictions
features = extract_high_advanced_features(audio_path)
prediction = best_base_model.predict(features)
or
prediction = best_ensemble_model.predict(features)
```

## Performance Metrics
The system evaluates models using:
- Validation accuracy
- AUC-ROC scores
- Classification reports
- Confusion matrices

## Best Practices
1. Use high-quality audio samples for training
2. Ensure balanced dataset representation
3. Validate augmented samples before training
4. Monitor training metrics for overfitting
5. Use ensemble predictions for higher reliability

## Future Improvements
1. Integration of more advanced voice features
2. Enhanced data augmentation techniques
3. Real-time processing capabilities
4. Model compression for mobile deployment
5. Additional model architectures for comparison
