# Create and activate a virtual environment
Write-Output "Creating virtual environment..."
python -m venv venv

Write-Output "Activating virtual environment..."
. .\venv\Scripts\Activate.ps1

# Install Python dependencies
Write-Output "Installing Python dependencies..."
pip install -r requirements.txt

# Navigate to the frontend directory and install Node.js dependencies
Write-Output "Navigating to frontend directory..."
cd root\frontend

Write-Output "Installing Node.js dependencies..."
npm install

# Build the frontend
Write-Output "Building frontend..."
npm run build

# Go back to the root directory
cd ../..

# Start the Flask backend server
Write-Output "Starting Flask backend server..."
Start-Process -NoNewWindow -FilePath "powershell" -ArgumentList "venv\Scripts\Activate.ps1; python Code\app.py"

# Start the Electron app
Write-Output "Starting Electron app..."
cd root
npm run start

# Pause to keep the window open for inspection
Write-Output "Done."
pause
