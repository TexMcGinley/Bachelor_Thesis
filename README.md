# Movie Ranker Game

## Prerequisites

- Python 3.x
- Node.js
- npm

## Setup and Run

## Notes

- Ensure you have the required dependencies installed before running the application.
- The `start.ps1` script is designed to automate the setup and running of the application on Windows.
- To make use of the `start.ps1`, open Powershell and naviagte to the project directory and then run `start.ps1`
- On Unix-based systems, you will need to manage the processes manually as outlined in the steps above.

### Unix-based Systems (Linux, macOS)

1. Clone the repository and navigate to the project directory.

   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. Create and activate a virtual environment.

   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```

3. Install the required Python packages.

   ```bash
   pip install -r requirements.txt
   ```

4. Navigate to the frontend directory and install Node.js dependencies.

   ```bash
   cd root/frontend
   npm install
   ```

5. Build the frontend.

   ```bash
   npm run build
   ```

6. Navigate back to the root directory.

   ```bash
   cd ../..
   ```

7. Start the Flask backend server in one terminal.

   ```bash
   python Code/app.py
   ```

8. In another terminal, start the Electron app.
   ```bash
   cd root
   npm run start
   ```

### Windows

1. Clone the repository and navigate to the project directory.

   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. Create a virtual environment and activate it.

   ```cmd
   python -m venv venv
   venv\Scripts\activate
   ```

3. Install the required Python packages.

   ```cmd
   pip install -r requirements.txt
   ```

4. Navigate to the frontend directory and install Node.js dependencies.

   ```cmd
   cd root/frontend
   npm install
   ```

5. Build the frontend.

   ```cmd
   npm run build
   ```

6. Navigate back to the root directory.

   ```cmd
   cd ../..
   ```

7. Run the provided PowerShell script to start the application. Make sure to run PowerShell as an administrator.
   ```cmd
   .\start.ps1
   ```
