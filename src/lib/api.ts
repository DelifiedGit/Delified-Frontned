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
  description: string;
  registration_fees: number;
  custom_fields: Record<string, any>;
}) {
  const token = localStorage.getItem('auth_token');
  if (!token) {
    throw new Error('No authentication token found');
  }

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

export async function fetchMUNs() {
  const response = await fetch(`${API_BASE_URL}/muns/`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch MUNs');
  }

  return response.json();
}

export async function fetchMUNById(id: string) {
  const response = await fetch(`${API_BASE_URL}/muns/${id}/`);
  if (!response.ok) {
    throw new Error('Failed to fetch MUN details');
  }

  return response.json();
}

export async function processPayment(paymentData: {
  munId: string;
  amount: number;
}) {
  const token = localStorage.getItem('auth_token');
  if (!token) {
    throw new Error('No authentication token found');
  }

  const response = await fetch(`${API_BASE_URL}/payments/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`,
    },
    body: JSON.stringify(paymentData),
  });

  if (!response.ok) {
    throw new Error('Failed to process payment');
  }

  return response.json();
}

export async function createRegistration(registrationData: {
  mun: string;
  payment_id: string;
  custom_fields: Record<string, any>;
}) {
  const token = localStorage.getItem('auth_token');
  if (!token) {
    throw new Error('No authentication token found');
  }

  const response = await fetch(`${API_BASE_URL}/registrations/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`,
    },
    body: JSON.stringify(registrationData),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(`Failed to create registration: ${JSON.stringify(errorData)}`);
  }

  return response.json();
}

export async function fetchRegistrationById(id: string) {
  const token = localStorage.getItem('auth_token');
  if (!token) {
    throw new Error('No authentication token found');
  }

  const response = await fetch(`${API_BASE_URL}/registrations/${id}/`, {
    headers: {
      'Authorization': `Token ${token}`,
    },
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch registration details');
  }

  return response.json();
}

export async function fetchRegistrationDetails(registrationId: string) {
  const token = localStorage.getItem('auth_token');
  if (!token) {
    throw new Error('No authentication token found');
  }

  const response = await fetch(`${API_BASE_URL}/registrations/${registrationId}/`, {
    headers: {
      'Authorization': `Token ${token}`,
    },
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch registration details');
  }

  return response.json();
}

export async function fetchCommunities(params = {}) {
  const queryString = new URLSearchParams(params).toString();
  const response = await fetch(`${API_BASE_URL}/communities/?${queryString}`);

  if (!response.ok) {
    throw new Error('Failed to fetch communities');
  }

  return response.json();
}

export async function createCommunity(communityData: {
  name: string;
  description: string;
}) {
  const token = localStorage.getItem('auth_token');
  if (!token) {
    throw new Error('No authentication token found');
  }

  const response = await fetch(`${API_BASE_URL}/communities/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`,
    },
    body: JSON.stringify(communityData),
  });

  if (!response.ok) {
    throw new Error('Failed to create community');
  }

  return response.json();
}

export async function joinCommunity(communityId: string) {
  const token = localStorage.getItem('auth_token');
  if (!token) {
    throw new Error('No authentication token found');
  }

  const response = await fetch(`${API_BASE_URL}/communities/${communityId}/join/`, {
    method: 'POST',
    headers: {
      'Authorization': `Token ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to join community');
  }

  return response.json();
}

export async function fetchGeneralFeed() {
  const response = await fetch(`${API_BASE_URL}/posts/`);

  if (!response.ok) {
    throw new Error('Failed to fetch general feed');
  }

  return response.json();
}

export async function createPost(postData: { content: string }) {
  const token = localStorage.getItem('auth_token');
  if (!token) {
    throw new Error('No authentication token found');
  }

  const response = await fetch(`${API_BASE_URL}/posts/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`,
    },
    body: JSON.stringify(postData),
  });

  if (!response.ok) {
    throw new Error('Failed to create post');
  }

  return response.json();
}

export async function fetchCommunityDetails(communityId: string) {
  const token = localStorage.getItem('auth_token');
  if (!token) {
    throw new Error('No authentication token found');
  }

  const response = await fetch(`${API_BASE_URL}/communities/${communityId}/`, {
    headers: {
      'Authorization': `Token ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch community details');
  }

  return response.json();
}

export async function createCommunityPost(communityId: string, postData: { content: string }) {
  const token = localStorage.getItem('auth_token');
  if (!token) {
    throw new Error('No authentication token found');
  }

  const response = await fetch(`${API_BASE_URL}/communities/${communityId}/posts/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`,
    },
    body: JSON.stringify(postData),
  });

  if (!response.ok) {
    throw new Error('Failed to create community post');
  }

  return response.json();
}

export async function fetchCommunityMembers(communityId: string) {
  const token = localStorage.getItem('auth_token');
  if (!token) {
    throw new Error('No authentication token found');
  }

  const response = await fetch(`${API_BASE_URL}/communities/${communityId}/members/`, {
    headers: {
      'Authorization': `Token ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch community members');
  }

  return response.json();
}

export async function fetchCommunityEvents(communityId: string) {
  const token = localStorage.getItem('auth_token');
  if (!token) {
    throw new Error('No authentication token found');
  }

  const response = await fetch(`${API_BASE_URL}/communities/${communityId}/events/`, {
    headers: {
      'Authorization': `Token ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch community events');
  }

  return response.json();
}

export async function fetchCommunityPosts(communityId: string, page: number = 1) {
  const token = localStorage.getItem('auth_token');
  if (!token) {
    throw new Error('No authentication token found');
  }

  const response = await fetch(`${API_BASE_URL}/communities/${communityId}/posts/?page=${page}`, {
    headers: {
      'Authorization': `Token ${token}`,
    },
  });

  console.log(response)
  if (!response.ok) {
    throw new Error('Failed to fetch community posts');
  }

  return response.json();
}

export async function likePost(postId: string) {
  const token = localStorage.getItem('auth_token');
  if (!token) {
    throw new Error('No authentication token found');
  }

  const response = await fetch(`${API_BASE_URL}/posts/${postId}/like/`, {
    method: 'POST',
    headers: {
      'Authorization': `Token ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to like/unlike post');
  }

  return response.json();
}

export async function fetchComments(postId: string) {
  const token = localStorage.getItem('auth_token');
  if (!token) {
    throw new Error('No authentication token found');
  }

  const response = await fetch(`${API_BASE_URL}/posts/${postId}/comments/`, {
    headers: {
      'Authorization': `Token ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch comments');
  }

  return response.json();
}

export async function createComment(postId: string, content: string) {
  const token = localStorage.getItem('auth_token');
  if (!token) {
    throw new Error('No authentication token found');
  }

  const response = await fetch(`${API_BASE_URL}/posts/${postId}/comments/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`,
    },
    body: JSON.stringify({ content }),
  });

  if (!response.ok) {
    throw new Error('Failed to create comment');
  }

  return response.json();
}

export async function sendContactMessage(messageData: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  const response = await fetch(`${API_BASE_URL}/contact/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(messageData),
  });

  if (!response.ok) {
    throw new Error('Failed to send contact message');
  }

  return response.json();
}

