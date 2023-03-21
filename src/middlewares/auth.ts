// 定義middleware，檢查用戶是否已經登入
export function isLoggedIn(req, res, next) {
    console.log("auth login")
    if (req.isAuthenticated()) {
      return next();
    }
    console.log('not log in')
    res.redirect('/auth/github')
    // res.status(401).send('Please log in first');
  }