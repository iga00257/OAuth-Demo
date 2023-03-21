import { Router, Request, Response } from 'express';
import passport from 'passport';
const CLIENT_ID = '8388cb899ba93a909f8f';
const CLIENT_SECRET = '1adf1feede046e53cdddd514599539afc54aeefe';
const REDIRECT_URI = 'http://localhost:3000/auth/github/callback';


// passport.use(
//   new GitHubStrategy(
//     {
//       clientID: CLIENT_ID,
//       clientSecret: CLIENT_SECRET,
//       callbackURL: '/auth/github/callback',
//     },
//     async (accessToken, refreshToken, profile:any, cb) => {
//       try {
//         console.log(accessToken)
//         console.log(refreshToken)
//         console.log(profile)


//         let user: IUser | null = await User.findOne({ githubId: profile.id });
//         if (!user) {
//           user = await User.create({
//             username: profile.username,
//             email: profile._json.email,
//             password: '',
//             githubId: profile.id,
//           });
//         }
//         return cb(null, user);
//       } catch (error) {
//         return cb(error, null);
//       }
//     },
//   ),
// );

const router = Router();
//github 認證
router.get('/github', passport.authenticate('github', { scope: ['user:email'] })) //呼叫github認證

// Github授權回調路由
router.get('/github/callback',
  passport.authenticate("github", { failureRedirect: '/login' }),
  (req: Request, res: Response) => {
    // 認證成功後的回調路由
    res.redirect('/');
  });

export default router;