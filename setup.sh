#!/bin/bash

echo "🚀 Setting up SafeSpeak project..."

# Setup Python virtual environment and install backend dependencies
echo "🐍 Setting up Python backend..."
cd Back-End
python3 -m venv venv
source venv/bin/activate

echo "📦 Installing Python dependencies..."
pip install flask
pip install flask-cors
pip install scikit-learn
pip install librosa
pip install tensorflow
pip install matplotlib
pip install seaborn
pip install pandas
pip install numpy
pip install soundfile
pip install groq
pip install python-dotenv

# Return to root directory
cd ..

# Setup Node.js frontend
echo "⚛️ Setting up React frontend..."
cd Front-End
echo "📦 Installing Node.js dependencies..."
npm install
npm install @clerk/nextjs

# Return to root directory
cd ..

echo "✅ Setup completed successfully!"
echo "Run './run.sh' to start the application" 