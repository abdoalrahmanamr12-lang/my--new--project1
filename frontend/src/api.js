import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:4000/api';

export async function findNurses({ lat, lon, when, radius = 25 }) {
  const res = await axios.get(`${API_BASE}/nurses`, { params: { lat, lon, when, radius }});
  return res.data;
}

export async function createRequest(payload) {
  const res = await axios.post(`${API_BASE}/requests`, payload);
  return res.data;
}
