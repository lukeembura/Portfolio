# Portfolio Backend (Flask)

This is the backend API for the portfolio project, built with Flask.

## Features
- Serves project, blog, and about data via REST API
- Handles contact form submissions
- CORS enabled for frontend integration

## Setup

1. Create a virtual environment (optional but recommended):
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Run the Flask app:
   ```bash
   python app.py
   ```

The API will be available at `http://localhost:5000` by default.

## API Endpoints
- `GET /api/projects` — List all projects
- `GET /api/blogs` — List all blog posts
- `GET /api/about` — About info
- `POST /api/contact` — Submit contact form 