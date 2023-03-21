// src/controllers/auth.controller.ts

import passport from 'passport';
import { Strategy as GithubStrategy } from 'passport-github2';
import { Request, Response } from 'express';
import User, { IUser } from '../models/user';



export const githubLogin = passport.authenticate('github', { scope: ['user:email'] });

export const githubCallback = passport.authenticate('github', {
  failureRedirect: '/login',
  successRedirect: '/',
});

export const logout = (req: Request, res: Response) => {
  req.logout();
  res.redirect('/');
};