const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = 3001;

// Configuration - REPLACE YOUR_CLIENT_SECRET with actual secret
const STRAVA_CLIENT_ID = '174613';
const STRAVA_CLIENT_SECRET = 'a6a452464fa1893136a87f12823412609a5f73e9'; // Get from https://www.strava.com/settings/api

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage for demo
const userSessions = new Map();

// Validate configuration
if (!STRAVA_CLIENT_SECRET || STRAVA_CLIENT_SECRET === 'YOUR_CLIENT_SECRET') {
  console.error('❌ Please replace YOUR_CLIENT_SECRET with your actual Strava client secret');
  console.error('Get it from: https://www.strava.com/settings/api');
  process.exit(1);
}

// OAuth token exchange endpoint
app.post('/api/strava/oauth', async (req, res) => {
  console.log('OAuth request received:', req.body);
  
  try {
    const { code } = req.body;
    
    if (!code) {
      return res.status(400).json({ error: 'Authorization code is required' });
    }

    console.log('Exchanging code with Strava...');

    const stravaResponse = await fetch('https://www.strava.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: STRAVA_CLIENT_ID,
        client_secret: STRAVA_CLIENT_SECRET,
        code: code,
        grant_type: 'authorization_code',
      }),
    });

    const responseText = await stravaResponse.text();
    console.log('Strava response status:', stravaResponse.status);
    console.log('Strava response:', responseText);
    
    if (!stravaResponse.ok) {
      let errorMessage = 'Failed to connect with Strava';
      if (stravaResponse.status === 400) {
        errorMessage = 'Invalid authorization code or expired';
      } else if (stravaResponse.status === 401) {
        errorMessage = 'Unauthorized - check your app credentials';
      }
      
      return res.status(stravaResponse.status).json({ error: errorMessage });
    }

    let data;
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      console.error('Failed to parse Strava response:', responseText);
      return res.status(500).json({ error: 'Invalid response from Strava' });
    }

    if (data.errors) {
      console.error('Strava API errors:', data.errors);
      return res.status(400).json({ error: data.message || 'Strava authentication failed' });
    }

    // Store session data
    const sessionId = `user_${data.athlete.id}_${Date.now()}`;
    userSessions.set(sessionId, {
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      expires_at: data.expires_at,
      athlete: data.athlete,
      created_at: Date.now()
    });

    console.log('OAuth successful for athlete:', data.athlete.firstname, data.athlete.lastname);

    // Return athlete data
    res.json({
      athlete: {
        id: data.athlete.id,
        username: data.athlete.username,
        firstname: data.athlete.firstname,
        lastname: data.athlete.lastname,
        profile: data.athlete.profile,
        profile_medium: data.athlete.profile_medium,
        city: data.athlete.city,
        state: data.athlete.state,
        country: data.athlete.country,
        follower_count: data.athlete.follower_count,
        friend_count: data.athlete.friend_count,
      },
      session_id: sessionId
    });

  } catch (error) {
    console.error('OAuth exchange error:', error);
    res.status(500).json({ 
      error: 'Internal server error during authentication'
    });
  }
});

// Disconnect endpoint
app.post('/api/strava/disconnect', async (req, res) => {
  try {
    const { session_id } = req.body;
    
    if (session_id && userSessions.has(session_id)) {
      userSessions.delete(session_id);
      console.log('Session disconnected:', session_id);
    }
    
    res.json({ success: true });
  } catch (error) {
    console.error('Disconnect error:', error);
    res.status(500).json({ error: 'Failed to disconnect' });
  }
});

// Get activities endpoint - using query parameter instead of route parameter
app.get('/api/strava/activities', async (req, res) => {
  try {
    const { sessionId, page = 1, per_page = 30 } = req.query;
    
    if (!sessionId || !userSessions.has(sessionId)) {
      return res.status(401).json({ error: 'Session not found' });
    }
    
    const sessionData = userSessions.get(sessionId);
    
    // Check if token is expired
    if (Date.now() / 1000 > sessionData.expires_at) {
      return res.status(401).json({ error: 'Session expired' });
    }
    
    const response = await fetch(
      `https://www.strava.com/api/v3/athlete/activities?page=${page}&per_page=${per_page}`,
      {
        headers: {
          'Authorization': `Bearer ${sessionData.access_token}`,
        },
      }
    );
    
    if (!response.ok) {
      throw new Error(`Strava API error: ${response.status}`);
    }
    
    const activities = await response.json();
    res.json(activities);
    
  } catch (error) {
    console.error('Activities fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch activities' });
  }
});

// Get athlete profile endpoint - using query parameter
app.get('/api/strava/athlete', async (req, res) => {
  try {
    const { sessionId } = req.query;
    
    if (!sessionId || !userSessions.has(sessionId)) {
      return res.status(401).json({ error: 'Session not found' });
    }
    
    const sessionData = userSessions.get(sessionId);
    
    // Check if token is expired
    if (Date.now() / 1000 > sessionData.expires_at) {
      return res.status(401).json({ error: 'Session expired' });
    }
    
    const response = await fetch('https://www.strava.com/api/v3/athlete', {
      headers: {
        'Authorization': `Bearer ${sessionData.access_token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error(`Strava API error: ${response.status}`);
    }
    
    const athlete = await response.json();
    res.json(athlete);
    
  } catch (error) {
    console.error('Athlete fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch athlete data' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});