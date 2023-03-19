import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import router from './routes/userRoutes';
import mongoose, { ConnectOptions } from 'mongoose';
import axios from 'axios';
import { stat } from 'fs';

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const app = express();
const PORT = 3000;

// Connect to MongoDB

  mongoose.connect(uri)
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((err) => {
      console.error('Failed to connect to MongoDB', err);
    });

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/api', router);

///third OAuth
const CLIENT_ID = '8388cb899ba93a909f8f';
const CLIENT_SECRET = '1adf1feede046e53cdddd514599539afc54aeefe';
const REDIRECT_URI = 'http://localhost:3000/auth/github/callback';
app.get('/auth/github', (req, res) => {
    const state = 'SOME_STATE';
    const scope = 'user';
  
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&state=${state}&scope=${scope}`;
  
    res.redirect(githubAuthUrl);
  });
  
  app.get('/auth/github/callback', async (req, res) => {
    const code = req.query.code;
    const state = req.query.state;
  
    const response = await axios.post('https://github.com/login/oauth/access_token', {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code,
      redirect_uri: REDIRECT_URI,
      state
    }, {
      headers: {
        Accept: 'application/json'
      }
    });
  
    const accessToken = response.data.access_token;
  
    const userResponse = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
  
    const userInfo = userResponse.data;
  
    // 在這裡將取得的使用者資訊傳回前端顯示
    res.send(userInfo);
  });


// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});