const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

const WINDOW_SIZE = 10;
const windowStates = {
  p: [],
  f: [],
  e: [],
  r: []
};

const API_MAP = {
  p: 'primes',
  f: 'fibo',
  e: 'even',
  r: 'rand'
};

const API_URL = 'http://20.244.56.144/evaluation-service/';

const BEARER_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQ2Mjc4NTQxLCJpYXQiOjE3NDYyNzgyNDEsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImMwZjgyNGQzLWYwMGYtNDYwYS1iOGNlLThlMzNjMTk4OGM5MSIsInN1YiI6IjEyMmFkMDAxMEBpaWl0ay5hYy5pbiJ9LCJlbWFpbCI6IjEyMmFkMDAxMEBpaWl0ay5hYy5pbiIsIm5hbWUiOiJhYmhpamVldCBzaW5naCIsInJvbGxObyI6IjEyMmFkMDAxMCIsImFjY2Vzc0NvZGUiOiJiemJDbnoiLCJjbGllbnRJRCI6ImMwZjgyNGQzLWYwMGYtNDYwYS1iOGNlLThlMzNjMTk4OGM5MSIsImNsaWVudFNlY3JldCI6IkNiQlpDU3ZHY1hEbmFOVUsifQ.TKgnj4XhKPQDRM25ot5gefF6No3tDgNSzWxB6__Hd5M';

app.get('/numbers/:numberid', async (req, res) => {
  const { numberid } = req.params;
  if (!API_MAP[numberid]) {
    return res.status(400).json({ error: 'Invalid numberid' });
  }

  const prevState = [...windowStates[numberid]];

  let numbers = [];
  try {
    const response = await axios.get(
      `${API_URL}${API_MAP[numberid]}`,
      {
        headers: { Authorization: `Bearer ${BEARER_TOKEN}` },
        timeout: 500
      }
    );
    numbers = response.data.numbers || [];
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch numbers' });
  }

  // Add unique numbers only
  const currSet = new Set(windowStates[numberid]);
  for (const num of numbers) {
    if (!currSet.has(num)) {
      windowStates[numberid].push(num);
      currSet.add(num);
      if (windowStates[numberid].length > WINDOW_SIZE) {
        windowStates[numberid].shift();
      }
    }
  }

  const currState = [...windowStates[numberid]];
  const avg = currState.length
    ? (currState.reduce((a, b) => a + b, 0) / currState.length).toFixed(2)
    : 0;

  res.json({
    windowPrevState: prevState,
    windowCurrState: currState,
    numbers,
    avg: Number(avg)
  });
});

app.listen(9876, () => {
  console.log('Server running on http://localhost:9876');
});
