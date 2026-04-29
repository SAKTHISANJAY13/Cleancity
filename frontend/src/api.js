import axios from 'axios';

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: `${API_BASE}/api`,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Upload image
export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('image', file);

  const response = await api.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};

// Submit report
export const submitReport = async (reportData) => {
  const response = await api.post('/report', reportData);
  return response.data;
};

// Get all reports
export const getReports = async () => {
  const response = await api.get('/reports');
  return response.data;
};

// Get filtered reports
export const getFilteredReports = async (wasteType) => {
  const response = await api.get(`/reports/filter/${wasteType}`);
  return response.data;
};

// Get report statistics
export const getReportStats = async () => {
  const response = await api.get('/reports/stats/overview');
  return response.data;
};

// Get single report
export const getReportById = async (id) => {
  const response = await api.get(`/reports/${id}`);
  return response.data;
};

// Upvote report
export const upvoteReport = async (id) => {
  const response = await api.post(`/report/${id}/upvote`);
  return response.data;
};

export default api;
