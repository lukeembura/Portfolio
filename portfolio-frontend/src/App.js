import React from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import './App.css';
import { ThemeContext } from "./index";
import { fetchProjects, fetchBlogs, fetchAbout, sendContact, sendLogin } from './api';
import { FaEnvelope, FaGithub, FaLinkedin, FaPhone } from 'react-icons/fa';
import Confetti from 'react-confetti';

function Navbar() {
  const { theme, toggleTheme } = React.useContext(ThemeContext);
  const [animateTheme, setAnimateTheme] = React.useState(false);

  const handleThemeToggle = () => {
    setAnimateTheme(true);
    toggleTheme();
    setTimeout(() => setAnimateTheme(false), 700);
  };

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
      <button className="theme-toggle" onClick={handleThemeToggle} aria-label="Toggle dark/light mode">
        <span className={animateTheme ? 'theme-toggle-animate' : ''}>
          {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
        </span>
      </button>
    </nav>
  );
}

function Home() {
  return (
    <section className="hero-section">
      <div className="hero-overlay">
        <h1>Hi there <span role="img" aria-label="waving hand">👋</span>, I'm Luke Kiprop</h1>
        <p>
          I'm a curious builder, resourceful problem-solver, and someone who loves making a positive impact—whether I'm working solo or collaborating with a team. I believe in empathy, honesty, and always doing what's right.<br /><br />
          <strong>Fun fact:</strong> When I'm not coding, you'll probably find me challenging friends to a game of pool, football, or a heated match of a football game. I'm always up for a little friendly competition—on the field or on the screen!<br /><br />
          <em>
            Curious about who I am, what I've built, what drives me, or interested in collaborating?
            <br />
            Feel free to explore the next pages—there's plenty more to discover!
          </em>
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
      <p className="section-intro">A little more about who I am in coding and beyond coding.</p>
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
      <p className="section-intro">Here's a look at some of the things I've built, each with its own story and lesson.</p>
      <div className="project-list">
        {projects.map(project => (
          <div className="project-card" key={project.id}>
            <h3>{project.title}</h3>
            <p>{project.description}<br />
              <strong>Tech Stack:</strong> {project.tech_stack.join(', ')}
              {project.title === 'PlanWise' && (
                <><br /><span style={{color: 'var(--accent)'}}>This project challenged me to design for real teamwork and user experience.</span></>
              )}
              {project.title === 'Library Manager CLI' && (
                <><br /><span style={{color: 'var(--accent)'}}>I learned a lot about ORM and building user-friendly command-line tools.</span></>
              )}
              {project.title === 'Booking App' && (
                <><br /><span style={{color: 'var(--accent)'}}>This project taught me the importance of smooth user experience and robust booking logic.</span></>
              )}
              {project.title === 'Local Event Finder Web App' && (
                <><br /><span style={{color: 'var(--accent)'}}>I discovered the power of teamwork and API integration in this group project.</span></>
              )}
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
      <p className="section-intro">I write to share what I'm learning, reflect on my journey, and connect with others in tech and beyond.</p>
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
  const [errors, setErrors] = React.useState({});
  const [showConfetti, setShowConfetti] = React.useState(false);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required.';
    if (!form.email.trim()) {
      errs.email = 'Email is required.';
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      errs.email = 'Please enter a valid email.';
    }
    if (!form.message.trim()) errs.message = 'Message is required.';
    return errs;
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    setStatus('');
    try {
      const res = await sendContact(form);
      if (res.status === 'success') {
        setStatus('Message sent!');
        setForm({ name: '', email: '', message: '' });
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 2000);
      } else {
        setStatus('Failed to send message.');
      }
    } catch {
      setStatus('Failed to send message.');
    }
    setLoading(false);
  };

  return (
    <div className="page" style={{position: 'relative', overflow: 'hidden'}}>
      {showConfetti && <Confetti numberOfPieces={180} recycle={false} style={{position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: 9999}} />}
      <h2>Contact Me</h2>
      <p className="section-intro">Whether you want to collaborate, chat about tech, or just say hi, I'd love to hear from you!</p>
      <ul className="contact-list">
        <li><FaEnvelope style={{marginRight: '0.5em'}} aria-label="Email"/> <strong>Email:</strong> <a href="mailto:lukerono0@gmail.com">lukerono0@gmail.com</a></li>
        <li><FaGithub style={{marginRight: '0.5em'}} aria-label="GitHub"/> <strong>GitHub:</strong> <a href="https://github.com/lukeembura" target="_blank" rel="noopener noreferrer">lukeembura</a></li>
        <li><FaLinkedin style={{marginRight: '0.5em'}} aria-label="LinkedIn"/> <strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/luke-rono-957207371" target="_blank" rel="noopener noreferrer">Luke Rono</a></li>
        <li><FaPhone style={{marginRight: '0.5em'}} aria-label="Phone"/> <strong>Phone:</strong> <a href="tel:+254794798980">+254794798980</a> <span className="kenya-flag" role="img" aria-label="Kenya flag">🇰🇪</span></li>
      </ul>
      <form onSubmit={handleSubmit} className="contact-form" noValidate>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Your Name" required />
        {errors.name && <span style={{color: 'red', fontSize: '0.95em'}}>{errors.name}</span>}
        <input name="email" value={form.email} onChange={handleChange} placeholder="Your Email" type="email" required />
        {errors.email && <span style={{color: 'red', fontSize: '0.95em'}}>{errors.email}</span>}
        <textarea name="message" value={form.message} onChange={handleChange} placeholder="Your Message" required />
        {errors.message && <span style={{color: 'red', fontSize: '0.95em'}}>{errors.message}</span>}
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
