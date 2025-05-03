// Backend proxy server for social media analytics
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = 4000;

// Bearer token
const BEARER_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQ2MjgxNDAzLCJpYXQiOjE3NDYyODExMDMsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjE5MzE0YzE2LTBhNzktNDI5Yy04ZGY1LWUyM2ZkNjZlODJjZSIsInN1YiI6IjEyMmFkMDAxMEBpaWl0ay5hYy5pbiJ9LCJlbWFpbCI6IjEyMmFkMDAxMEBpaWl0ay5hYy5pbiIsIm5hbWUiOiJhYmhpamVldCBzaW5naCIsInJvbGxObyI6IjEyMmFkMDAxMCIsImFjY2Vzc0NvZGUiOiJiemJDbnoiLCJjbGllbnRJRCI6IjE5MzE0YzE2LTBhNzktNDI5Yy04ZGY1LWUyM2ZkNjZlODJjZSIsImNsaWVudFNlY3JldCI6ImNObkhndG16a2ZQU1pneFoifQ.CDRjT5mZollFOow_Rt_2JGMpzGc-Evjn2MjU83am5W4';
const API_BASE = 'http://20.244.56.144/evaluation-service';

app.use(cors());

// Get Users
app.get('/api/users', async (req, res) => {
  try {
    const response = await fetch(`${API_BASE}/users`, {
      headers: { Authorization: `Bearer ${BEARER_TOKEN}` },
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Get Posts for a User
app.get('/api/users/:userId/posts', async (req, res) => {
  try {
    const { userId } = req.params;
    const response = await fetch(`${API_BASE}/users/${userId}/posts`, {
      headers: { Authorization: `Bearer ${BEARER_TOKEN}` },
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

// Get Comments for a Post
app.get('/api/posts/:postId/comments', async (req, res) => {
  try {
    const { postId } = req.params;
    const response = await fetch(`${API_BASE}/posts/${postId}/comments`, {
      headers: { Authorization: `Bearer ${BEARER_TOKEN}` },
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend proxy server running on http://localhost:${PORT}`);
}); 