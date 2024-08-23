import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Existing speaker functions
export const createSpeaker = async (speakerData) => {
  const response = await axios.post(`${API_URL}/speakers`, speakerData);
  return response.data;
};

export const getAllSpeakers = async () => {
  const response = await axios.get(`${API_URL}/speakers`);
  return response.data;
};

export const updateSpeaker = async (id, speakerData) => {
  const response = await axios.put(`${API_URL}/speakers/${id}`, speakerData);
  return response.data;
};

export const deleteSpeaker = async (id) => {
  const response = await axios.delete(`${API_URL}/speakers/${id}`);
  return response.data;
};

// New sponsor functions

export const getAllSponsors = async () => {
  try {
    const response = await fetch(`${API_URL}/sponsors`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Fetched sponsors:", data);
    return data;
  } catch (error) {
    console.error("Error fetching sponsors:", error);
    throw error;
  }
};
export const createSponsor = async (sponsorData) => {
  try {
    const response = await fetch(`${API_URL}/sponsors`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sponsorData),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }
    
    console.log("Sponsor created successfully:", data);
    return data;
  } catch (error) {
    console.error("Error creating sponsor:", error);
    throw error;
  }
};

export const updateSponsor = async (id, sponsorData) => {
  const response = await fetch(`${API_URL}/sponsors/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(sponsorData),
  });
  return response.json();
};

export const deleteSponsor = async (id) => {
  await fetch(`${API_URL}/sponsors/${id}`, {
    method: 'DELETE',
  });
};