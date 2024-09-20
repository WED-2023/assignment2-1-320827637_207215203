
// src/services/auth.js
import axios from 'axios';

// const API_URL = 'http://localhost:3000'; // Adjust the URL as needed
const API_URL = 'http://tastetreasures.cs.bgu.ac.il'; // Adjust the URL as needed


export async function login(credentials) {
  try {
    const response = await axios.post(`${API_URL}/Login`, credentials, {
      withCredentials: true
    });
    // if (response.data && response.data.username) {
    //   localStorage.setItem('username', response.data.username);
    // }
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

export async function register(userDetails) {
  try {
    const response = await axios.post(`${API_URL}/Register`, userDetails);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

export async function logout() {
  try {
    const response = await axios.post(`${API_URL}/Logout`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}