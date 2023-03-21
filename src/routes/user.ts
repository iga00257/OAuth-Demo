import { UserService } from '../controllers/userController';
import { Router, Request, Response } from 'express';
import { IUserModel } from '../models/userModel';
import {isLoggedIn} from '../middlewares/auth'


const router = Router();
router.get('/',isLoggedIn,(req: Request, res: Response) => {
    console.log("get user")
    UserService.findAllUser(req,res)
  }
)
router.post('/',async (req: Request, res: Response) => {
  const userData = {...req.body.user}
  console.log(userData)
  try {
    const user = await UserService.createUser(userData)
    res.send(user)
  } catch (error) {
    throw error
  }
}
)

export default router;