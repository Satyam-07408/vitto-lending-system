# MSME Lending Decision System

A full-stack lending decision platform for MSME loan approvals.

## Live Demo
Frontend: vitto-lending-system.vercel.app
Backend: https://vitto-lending-system.onrender.com

## Tech Stack
- React
- Node.js
- Express
- REST API
- Render
- Vercel

## Features
- Business profile + loan application form
- Credit score generation
- Approval / rejection logic
- PAN validation
- Revenue to EMI scoring
- Fraud inconsistency checks
- Reason codes

## API Endpoint
POST /api/applications

## Decision Logic
Base score = 700

+100 → revenue-to-EMI ratio > 5  
+50 → ratio between 3 and 5  
-150 → ratio < 2  
-200 → loan multiple > 5  
-50 → short tenure risk  
-50 → long tenure risk  

## Edge Cases
- Invalid PAN
- Negative values
- Missing fields
- Data inconsistency

## Run Locally
### Backend
cd backend  
npm install  
node server.js  

### Frontend
cd frontend  
npm install  
npm start
