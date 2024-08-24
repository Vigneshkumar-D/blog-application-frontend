import Cookies from 'js-cookie';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000/api';

const jwtToken = Cookies.get('jwt_token');

export const fetchPosts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts`, {
      method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwtToken}`,
    },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchPostById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwtToken}`,
    },
  });
    if (!response.ok) {
      throw new Error(`Failed to fetch post with ID ${id}`);
    }
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createPost = async (postData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(postData),
    });
    if (!response.ok) {
      throw new Error('Failed to create post');
    }
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updatePost = async (id, postData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(postData),
    });
    if (!response.ok) {
      throw new Error(`Failed to update post with ID ${id}`);
    }
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deletePost = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${jwtToken}`,
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to delete post with ID ${id}`);
    }
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const login = async (credentials) => {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    if (!response.ok) {
      throw new Error('Failed to login');
    }
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const register = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      throw new Error('Failed to register');
    }
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchComments = async (postId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/${postId}/comments`);
    if (!response.ok) {
      throw new Error(`Failed to fetch comments for post with ID ${postId}`);
    }
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createComment = async (postId, comment) => {
  const username = Cookies.get('username')
  const content = {'postId': postId, 'username': username, 'content': comment}
  try {
    const response = await fetch(`${API_BASE_URL}/posts/${postId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(content),
    });
    if (!response.ok) {
      throw new Error('Failed to create comment');
    }
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateComment = async (commentId, commentData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/comments/${commentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(commentData),
    });
    if (!response.ok) {
      throw new Error(`Failed to update comment with ID ${commentId}`);
    }
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteComment = async (commentId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/comments/${commentId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${jwtToken}`,
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to delete comment with ID ${commentId}`);
    }
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
