#!/bin/bash

# Change to backend directory
cd /backend

# Start backend server
npm start &

# Wait for backend server to start
sleep 10

# Change to frontend directory
cd /frontend

# Start frontend server
npm start