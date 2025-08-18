// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'https://bitcoinstore-be.onrender.com',
  ENDPOINTS: {
    REGISTER: import.meta.env.VITE_API_ENDPOINT || '/register'
  }
};

// Helper function to build API URLs
export const buildApiUrl = (endpoint) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// API service functions
export const apiService = {
  register: async (formData) => {
    const url = buildApiUrl(API_CONFIG.ENDPOINTS.REGISTER);
    return await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
  }
}; 