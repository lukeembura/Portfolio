# Luke Kiprop's Portfolio

This is a full stack portfolio project featuring a modern React frontend and a Flask backend API. It showcases projects, blogs, contact information, and includes an admin login for protected features.

## Features
- **Frontend:** React (with React Router, custom theming, and modern UI)
- **Backend:** Flask (REST API, JWT authentication, contact form email via Flask-Mail)
- **Projects:** Dynamic project cards with detailed descriptions
- **Blogs:** Dynamic blog posts with rich content
- **Contact:** Contact form (sends email to site owner), plus contact info
- **Admin Login:** JWT-protected login for future admin features
- **Responsive Design:** Works on desktop and mobile

## Project Structure
```
portfolio/
├── portfolio-frontend/   # React app (client)
├── portfolio-backend/    # Flask app (API server)
```

## Setup Instructions

### 1. Backend (Flask)
1. Navigate to the backend folder:
   ```bash
   cd portfolio-backend
   ```
2. (Optional) Create and activate a virtual environment:
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Configure your email settings in `app.py` (for contact form email):
   - Set `MAIL_USERNAME`, `MAIL_PASSWORD` (Gmail App Password), and `MAIL_DEFAULT_SENDER`.
5. Run the backend:
   ```bash
   python app.py
   ```
   The API will be available at `http://localhost:5000`.

### 2. Frontend (React)
1. Navigate to the frontend folder:
   ```bash
   cd portfolio-frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend:
   ```bash
   npm start
   ```
   The app will run at `http://localhost:3000`.

## Usage
- Visit the site to view projects, blogs, and contact info.
- Use the contact form to send a message (delivered to the site owner's email).
- Admins can log in at `/admin` (credentials set in backend).

## Customization
- Update project and blog data in the backend (`app.py`).
- Adjust frontend styles in `portfolio-frontend/src/App.css`.

## Contact
For questions or collaboration, reach out via the contact form or email: [lukerono0@gmail.com](mailto:lukerono0@gmail.com)

---

**Built with ❤️ by Luke Kiprop** 