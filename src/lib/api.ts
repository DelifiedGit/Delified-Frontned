const API_BASE_URL = 'http://localhost:8000/api';

export async function signUp(userData: {
  email: string;
  full_name: string;
  username: string;
  gender: string;
  date_of_birth: string;
  contact_number: string;
  institution: string;
  password: string;
}) {
  const response = await fetch(`${API_BASE_URL}/signup/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error('Signup failed');
  }

  return response.json();
}

export async function login(credentials: { email: string; password: string }) {
  const response = await fetch(`${API_BASE_URL}/login/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  return response.json();
}

export async function logout() {
  localStorage.removeItem('auth_token');
}

export async function fetchDashboardData() {
  const token = localStorage.getItem('auth_token');
  if (!token) {
    throw new Error('No authentication token found');
  }

  const response = await fetch(`${API_BASE_URL}/dashboard/`, {
    headers: {
      'Authorization': `Token ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch dashboard data');
  }

  return response.json();
}

export async function createMUN(munData: {
  event_name: string;
  date: string;
  venue: string;
  registration_fees: number;
  custom_fields: Record<string, any>;
}) {
  const token = localStorage.getItem('auth_token');
  if (!token) {
    throw new Error('No authentication token found');
  }

  // Ensure registration_fees is a number
  const formattedData = {
    ...munData,
    registration_fees: Number(munData.registration_fees)
  };

  const response = await fetch(`${API_BASE_URL}/muns/create/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`,
    },
    body: JSON.stringify(formattedData),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(`Failed to create MUN: ${JSON.stringify(errorData)}`);
  }

  return response.json();
}
