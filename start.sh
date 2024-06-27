#!/bin/bash

# Create and activate a virtual environment
python3 -m venv venv
source venv/bin/activate

# Install Python dependencies
pip install -r requirements.txt

# Navigate to the frontend directory and install Node.js dependencies
cd root/frontend
npm install

# Build the frontend
npm run build
npm start

# Go back to the root directory
cd ../..

# Start the Flask backend server
python Code/app.py &
FLASK_PID=$!

# Start the Electron app
cd root
npm run start

# Cleanup
kill $FLASK_PID
