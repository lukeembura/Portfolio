import React from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import './App.css';
import { ThemeContext } from "./index";
import { fetchProjects, fetchBlogs, fetchAbout, sendContact, sendLogin } from './api';
import { FaEnvelope, FaGithub, FaLinkedin, FaPhone } from 'react-icons/fa';

function Navbar() {
  const { theme, toggleTheme } = React.useContext(ThemeContext);
  return (
    <nav className="navbar">
      <div className="logo">LUKE</div>
      <ul className="nav-links">
        <li><NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink></li>
        <li><NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>About</NavLink></li>
        <li><NavLink to="/projects" className={({ isActive }) => isActive ? 'active' : ''}>Projects</NavLink></li>
        <li><NavLink to="/blogs" className={({ isActive }) => isActive ? 'active' : ''}>Blogs</NavLink></li>
        <li><NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : ''}>Contact</NavLink></li>
      </ul>
      <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle dark/light mode">
        {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
      </button>
    </nav>
  );
}

function Home() {
  return (
    <section className="hero-section">
      <div className="hero-overlay">
        <h1>Hi there <span role="img" aria-label="waving hand">👋</span>, I am Luke Kiprop</h1>
        <p>
          I am currently a Full Stack Developer studying at{' '}
          <a
            href="https://moringaschool.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="moringa-link"
          >
            Moringa School
          </a>.
          <br />
          I am passionate about coding and always looking for new challenges to solve. I am a team player and eager to learn from others.
        </p>
      </div>
    </section>
  );
}

function About() {
  const [about, setAbout] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    fetchAbout()
      .then(data => { setAbout(data); setLoading(false); })
      .catch(err => { setError('Failed to load about info'); setLoading(false); });
  }, []);

  if (loading) return <div className="page"><p>Loading...</p></div>;
  if (error) return <div className="page"><p>{error}</p></div>;

  return (
    <div className="page">
      <h2>About Me</h2>
      <p>{about.bio}</p>
      <h3>Core Skills:</h3>
      <ul>
        {about.skills.map(skill => <li key={skill}>{skill}</li>)}
      </ul>
      <p>
        <strong><FaLinkedin style={{marginRight: '0.3em', verticalAlign: 'middle'}} aria-label="LinkedIn"/>LinkedIn:</strong> <a className="about-linkedin" href="https://www.linkedin.com/in/luke-rono-957207371" target="_blank" rel="noopener noreferrer">Luke Rono</a>
      </p>
    </div>
  );
}

function Projects() {
  const [projects, setProjects] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    fetchProjects()
      .then(data => { setProjects(data); setLoading(false); })
      .catch(err => { setError('Failed to load projects'); setLoading(false); });
  }, []);

  if (loading) return <div className="page"><p>Loading...</p></div>;
  if (error) return <div className="page"><p>{error}</p></div>;

  return (
    <div className="page">
      <h2>Projects</h2>
      <div className="project-list">
        {projects.map(project => (
          <div className="project-card" key={project.id}>
            <h3>{project.title}</h3>
            <p>{project.description}<br />
              <strong>Tech Stack:</strong> {project.tech_stack.join(', ')}
            </p>
            <a href={project.github} target="_blank" rel="noopener noreferrer">View on GitHub</a>
          </div>
        ))}
      </div>
    </div>
  );
}

function Blogs() {
  const [blogs, setBlogs] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    fetchBlogs()
      .then(data => { setBlogs(data); setLoading(false); })
      .catch(err => { setError('Failed to load blogs'); setLoading(false); });
  }, []);

  if (loading) return <div className="page"><p>Loading...</p></div>;
  if (error) return <div className="page"><p>{error}</p></div>;

  return (
    <div className="page">
      <h2>Blog Posts</h2>
      <div className="blog-list">
        {blogs.map(blog => (
          <div className="blog-card" key={blog.id}>
            <h3>{blog.title}</h3>
            <p>{blog.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Contact() {
  const [form, setForm] = React.useState({ name: '', email: '', message: '' });
  const [status, setStatus] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setStatus('');
    try {
      const res = await sendContact(form);
      if (res.status === 'success') {
        setStatus('Message sent!');
        setForm({ name: '', email: '', message: '' });
      } else {
        setStatus('Failed to send message.');
      }
    } catch {
      setStatus('Failed to send message.');
    }
    setLoading(false);
  };

  return (
    <div className="page">
      <h2>Contact Me</h2>
      <p>Feel free to reach out for collaborations, project opportunities, or just to connect!</p>
      <ul className="contact-list">
        <li><FaEnvelope style={{marginRight: '0.5em'}} aria-label="Email"/> <strong>Email:</strong> <a href="mailto:lukerono0@gmail.com">lukerono0@gmail.com</a></li>
        <li><FaGithub style={{marginRight: '0.5em'}} aria-label="GitHub"/> <strong>GitHub:</strong> <a href="https://github.com/lukeembura" target="_blank" rel="noopener noreferrer">lukeembura</a></li>
        <li><FaLinkedin style={{marginRight: '0.5em'}} aria-label="LinkedIn"/> <strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/luke-rono-957207371" target="_blank" rel="noopener noreferrer">Luke Rono</a></li>
        <li><FaPhone style={{marginRight: '0.5em'}} aria-label="Phone"/> <strong>Phone:</strong> <a href="tel:+254794798980">+254794798980</a> <span className="kenya-flag" role="img" aria-label="Kenya flag">🇰🇪</span></li>
      </ul>
      <form onSubmit={handleSubmit} className="contact-form">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Your Name" required />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Your Email" type="email" required />
        <textarea name="message" value={form.message} onChange={handleChange} placeholder="Your Message" required />
        <button type="submit" disabled={loading}>{loading ? 'Sending...' : 'Send Message'}</button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
}

function AdminLogin() {
  const [form, setForm] = React.useState({ username: '', password: '' });
  const [status, setStatus] = React.useState('');
  const [token, setToken] = React.useState(() => localStorage.getItem('jwt') || '');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('');
    try {
      const data = await sendLogin(form);
      if (data.access_token) {
        setToken(data.access_token);
        localStorage.setItem('jwt', data.access_token);
        setStatus('Logged in!');
      } else {
        setStatus(data.msg || 'Login failed');
      }
    } catch {
      setStatus('Login failed');
    }
  };

  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('jwt');
    setStatus('Logged out');
  };

  return (
    <div className="page">
      <h2>Admin Login</h2>
      {token ? (
        <>
          <p>Logged in as admin.</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <form onSubmit={handleSubmit} className="admin-login-form">
          <input name="username" value={form.username} onChange={handleChange} placeholder="Username" required />
          <input name="password" value={form.password} onChange={handleChange} placeholder="Password" type="password" required />
          <button type="submit">Login</button>
        </form>
      )}
      {status && <p>{status}</p>}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<AdminLogin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
