import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose, { ConnectOptions } from 'mongoose';
import axios from 'axios';
import { stat } from 'fs';
import { Strategy as GitHubStrategy } from 'passport-github';
import authRoutes from './routes/auth';
import passport from 'passport';
import session from "express-session";
import userRoutes from './routes/user';
import { UserModel,IUserModel } from "./models/userModel";
import { isLoggedIn } from './middlewares/auth';

 

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

///third OAuth

const CLIENT_ID = '8388cb899ba93a909f8f';
const CLIENT_SECRET = '1adf1feede046e53cdddd514599539afc54aeefe';
const REDIRECT_URI = 'http://localhost:3000/auth/github/callback';


// 序列化用戶
passport.serializeUser(function(user, done) {
  done(null, user);
});

// 反序列化用戶
passport.deserializeUser(function(user, done) {
  done(null, user);
});


// Passport 配置
passport.use(
  new GitHubStrategy(
    {
      clientID: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      callbackURL: '/auth/github/callback',
    },
    async (accessToken, refreshToken, profile:any, cb) => {
      try {
        // console.log(accessToken)
        // console.log(refreshToken)
        // console.log(profile)
        let user: IUserModel | null = await UserModel.findOne({ githubId: profile.id });
        console.log(user)
        if (!user) {
          user = await UserModel.create({
            username: profile.username,
            email: profile._json.email,
            password: '',
            githubId: profile.id,
          });
        }
        return cb(null, user);
      } catch (error) {
        return cb(error, null);
      }
    },
  ),
);

app.use(session({
  secret: "1adf1feede046e53cdddd514599539afc54aeefe",
  resave: false,
  saveUninitialized: false
}));

// 設置登出路由
app.post('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});



app.use(passport.initialize());
app.use(passport.session());

// 註冊路由
app.use('/auth', authRoutes);
app.use('/api/users',userRoutes)
app.use('/',(req,res)=>{
  res.send('Hello world')

})


// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});