#!/bin/bash

cd /home/guy/Desktop/one-shoe
npm start &
echo "App started."

# Wait for backend server to start
sleep 10

# Open frontend in Chromium in full-screen mode
chromium-browser --kiosk http://localhost:3000 &
echo "Frontend opened in Chromium in full-screen mode."

# Hide mouse cursor using unclutter
unclutter -idle 0.01 -root &

# Keep terminal open until user presses a key
read -p "Press any key to exit..."
