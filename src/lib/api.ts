const API_BASE_URL = 'http://localhost:8000';

export async function login(email: string, password: string) {
  const response = await fetch(`${API_BASE_URL}/api/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Login failed');
  }
  return response.json();
}

export async function signup(userData: {
  email: string;
  password: string;
  full_name: string;
  username: string;
  gender: string;
  date_of_birth: string;
  contact_number: string;
  institution: string;
}) {
  const response = await fetch(`${API_BASE_URL}/api/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Signup failed');
  }
  return response.json();
}

export async function logout() {
  const response = await fetch(`${API_BASE_URL}/api/logout`, {
    method: 'POST',
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Logout failed');
  }
  return response.json();
}

export async function getUserProfile() {
  const response = await fetch(`${API_BASE_URL}/api/user/profile`, {
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Failed to fetch user profile');
  }
  return response.json();
}

export async function getMUNsDashboard() {
  const response = await fetch(`${API_BASE_URL}/api/muns/dashboard`, {
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Failed to fetch MUNs dashboard');
  }
  return response.json();
}