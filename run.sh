#!/bin/bash

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to stop servers on script termination
cleanup() {
    echo "Stopping servers..."
    kill $FRONTEND_PID $BACKEND_PID 2>/dev/null
    exit
}

# Set up cleanup trap
trap cleanup SIGINT SIGTERM

# Check for required commands
if ! command_exists flask; then
    echo "❌ Flask is required but not installed. Run setup.sh first."
    exit 1
fi

if ! command_exists npm; then
    echo "❌ npm is required but not installed"
    exit 1
fi

echo "🚀 Starting SafeSpeak application..."

# Start Backend
echo "🔧 Starting Flask backend server..."
cd Back-End
source venv/bin/activate
export FLASK_APP=app.py
export FLASK_ENV=development
flask run &
BACKEND_PID=$!
cd ..

# Wait for backend to start
sleep 2

# Start Frontend
echo "🌐 Starting React frontend..."
cd Front-End
npm run dev &
FRONTEND_PID=$!
cd ..

echo "✅ SafeSpeak is running!"
echo "📱 Frontend: http://localhost:3000"
echo "🔌 Backend: http://localhost:5000"
echo "Press Ctrl+C to stop both servers"

# Wait for both processes
wait $FRONTEND_PID $BACKEND_PID 