const API_BASE = 'http://localhost:5000/api';

export async function fetchProjects() {
  const res = await fetch(`${API_BASE}/projects`);
  return res.json();
}

export async function fetchBlogs() {
  const res = await fetch(`${API_BASE}/blogs`);
  return res.json();
}

export async function fetchAbout() {
  const res = await fetch(`${API_BASE}/about`);
  return res.json();
}

export async function sendContact(data) {
  const res = await fetch(`${API_BASE}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
} 