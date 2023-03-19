import { Request, Response } from 'express';
import UserModel, { IUser } from '../models/userModel';

class UserController {
  async getUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await UserModel.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ message: err})
      }
  }
  async createUser(req: Request, res: Response): Promise<void> {
    try {
    const userData: IUser = req.body;
    const user = new UserModel(userData);
    const newUser = await user.save();
    res.status(201).json(newUser);
    } catch (err) {
    res.status(500).json({ message: err });
    }
    }
}


export default new UserController();