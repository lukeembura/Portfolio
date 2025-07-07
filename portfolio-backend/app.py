from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required
from werkzeug.security import check_password_hash, generate_password_hash
from flask_mail import Mail, Message
import datetime
import os

app = Flask(__name__)
CORS(app)
app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY', 'super-secret-key')  # Use env var, fallback for dev
jwt = JWTManager(app)

# Flask-Mail config (Gmail example)
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = os.environ.get('MAIL_USERNAME')
app.config['MAIL_PASSWORD'] = os.environ.get('MAIL_PASSWORD')
app.config['MAIL_DEFAULT_SENDER'] = os.environ.get('MAIL_DEFAULT_SENDER')
mail = Mail(app)

# Hardcoded admin user
ADMIN_USERNAME = 'admin'
ADMIN_PASSWORD_HASH = generate_password_hash('adminpassword')  # Change this password!

# Example data
projects = [
    {
        "id": 1,
        "title": "Library Manager CLI",
        "description": (
            "A Python-based command-line application that allows users to manage a simple library system. "
            "Features include adding, viewing, and deleting authors and books, as well as viewing relationships between books and authors. "
            "The project demonstrates Object-Relational Mapping (ORM) concepts using SQLAlchemy and provides a clear, interactive CLI for users. "
            "I designed the data models, implemented the core logic, and focused on making the interface user-friendly."
        ),
        "tech_stack": ["Python", "SQLAlchemy", "CLI"],
        "github": "https://github.com/lukeembura/my-cli-project"
    },
    {
        "id": 2,
        "title": "Local Event Finder Web App",
        "description": (
            "A React application developed as a group project, where users can discover events such as tech meetups and cultural festivals in Kenyan cities like Nairobi or Mombasa. "
            "Key features include searching and filtering events by city and category, and a user-friendly interface for event discovery. "
            "I contributed to the UI design and API integration, and the project was a great example of teamwork and collaboration."
        ),
        "tech_stack": ["React", "HTML/CSS", "JavaScript"],
        "github": "https://github.com/lukeembura/Local-Event-Finder-Web-App-"
    },
    {
        "id": 3,
        "title": "PlanWise",
        "description": (
            "A group project: PlanWise is a modern, intuitive task and project management platform built with React. PlanWise helps teams organize, track, and collaborate on projects with a clean, user-friendly interface. I contributed to the UI, API integration, and team collaboration features."
        ),
        "tech_stack": ["React", "Flask", "Javascript", "HTML/CSS"],
        "github": "https://github.com/lukeembura/planwise-phase4-project"
    },
    {
        "id": 4,
        "title": "Booking App",
        "description": (
            "An app that enables users to book a train ticket from different starting stations to their desired destinations. "
            "Features include user authentication and login, booking train tickets between stations, and a simple, user-friendly interface. "
            "I handled the booking logic and worked on ensuring a smooth user experience throughout the app."
        ),
        "tech_stack": ["JavaScript", "HTML", "CSS"],
        "github": "https://github.com/lukeembura/phase-1-project-Booking-app-"
    }
]

blogs = [
    {
        "id": 1,
        "title": "Why I Love Coding and Aviation",
        "content": (
            "From a young age, I was fascinated by both computers and airplanes. Coding allows me to solve complex problems, automate tasks, and build tools that can make a real difference. "
            "Aviation, on the other hand, inspires me with its blend of precision, technology, and adventure. I love exploring how software can improve flight safety, efficiency, and the pilot experience. "
            "Combining these passions, I enjoy working on projects that bring technology and aviation together—whether it's building flight data visualization tools, simulating aircraft systems, or creating apps for pilots and aviation enthusiasts."
        )
    },
    {
        "id": 2,
        "title": "Building the Local Event Finder Web App",
        "content": (
            "The Local Event Finder Web App was a collaborative group project, and working as a team was one of the most rewarding aspects of the experience. Together, we brainstormed ideas, divided tasks based on our strengths, and supported each other throughout the development process. "
            "I contributed to designing a clean, user-friendly interface using React, while also helping to integrate external APIs for event data. We faced challenges with inconsistent data formats and ensuring fast load times, but by communicating openly and sharing solutions, we overcame them as a team. "
            "This project not only improved my technical skills but also strengthened my ability to work effectively in a group, value diverse perspectives, and achieve shared goals. It reinforced my belief that great software is often the result of great teamwork."
        )
    },
    {
        "id": 3,
        "title": "Lessons Learned from My First CLI Project",
        "content": (
            "Developing my first command-line interface (CLI) project—a library management tool—was a transformative experience. I learned the importance of planning data models, using SQLAlchemy for ORM, and writing clear, interactive command-line prompts. "
            "Debugging was a major part of the process, and I developed strategies for isolating issues and testing different scenarios. This project deepened my understanding of Python, software architecture, and the value of user feedback. "
            "It also gave me confidence to tackle more complex projects and explore new technologies."
        )
    },
    {
        "id": 4,
        "title": "How Technology is Transforming the Aviation Industry",
        "content": (
            "Modern software is revolutionizing aviation in ways we couldn't have imagined a decade ago. From real-time weather updates and predictive maintenance to advanced flight planning and cockpit automation, technology is making flying safer, more efficient, and more innovative. "
            "I am particularly excited about the rise of data-driven decision-making in aviation, the use of AI for flight optimization, and the development of pilot-focused mobile apps. "
            "As a developer, I see endless opportunities to contribute to this transformation by building tools that empower pilots, airlines, and aviation enthusiasts."
        )
    },
    {
        "id": 5,
        "title": "Tips for Aspiring Full Stack Developers",
        "content": (
            "Starting out as a full stack developer can be overwhelming, but it's also incredibly rewarding. My top tips: focus on mastering the fundamentals of HTML, CSS, and JavaScript before diving into frameworks. Build real projects to apply your knowledge and showcase your skills. "
            "Use version control (like Git) from the beginning, and don't be afraid to ask for help or collaborate with others. Stay curious, keep learning, and embrace challenges as opportunities for growth. "
            "Finally, remember that the tech industry is always evolving—so be adaptable, and never stop building!"
        )
    }
]

about = {
    "name": "Luke Rono",
    "bio": "I am currently a Full Stack Developer studying at Moringa School. I am highly effective when working solo—taking initiative, managing my time well, and delivering results independently. At the same time, I believe in shared success, valuing collaboration, open communication, and shared goals. I am known for being resourceful and a great listener, and I love helping others to grow. While I'm somewhat of an introvert, I value honesty and empathy, and I'm passionate about making a positive impact and always doing what is right. I balance independent thinking with the ability to lead when needed, and I strive to bring out the best in those around me. I'm a passionate developer with a love for both technology and aviation, specializing in building modern web applications using Python, Flask, React, and HTML/CSS. My goal is to bridge the gap between code and cockpit—creating tools that enhance aviation safety, efficiency, and innovation. Outside of tech, I enjoy relaxing with friends—whether we're playing pool, football, or just watching a great match together.",
    "skills": ["Python", "React", "Flask", "HTML & CSS"]
}

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    if username == ADMIN_USERNAME and check_password_hash(ADMIN_PASSWORD_HASH, password):
        access_token = create_access_token(identity=username, expires_delta=datetime.timedelta(hours=1))
        return jsonify(access_token=access_token), 200
    return jsonify({"msg": "Bad username or password"}), 401

@app.route('/api/protected')
@jwt_required()
def protected():
    return jsonify({"msg": "You are viewing a protected endpoint!"})

@app.route('/api/projects')
def get_projects():
    return jsonify(projects)

@app.route('/api/blogs')
def get_blogs():
    return jsonify(blogs)

@app.route('/api/about')
def get_about():
    return jsonify(about)

@app.route('/api/contact', methods=['POST'])
def contact():
    data = request.json
    name = data.get('name')
    email = data.get('email')
    message = data.get('message')
    try:
        msg = Message(
            subject=f"Portfolio Contact Form from {name}",
            recipients=["lukeafter347@gmail.com"],
            body=f"Name: {name}\nEmail: {email}\nMessage: {message}"
        )
        mail.send(msg)
        return jsonify({"status": "success", "message": "Contact form received and email sent!"}), 201
    except Exception as e:
        print("Error sending email:", e)  # This will print the error to your terminal
        return jsonify({"status": "error", "message": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True) 