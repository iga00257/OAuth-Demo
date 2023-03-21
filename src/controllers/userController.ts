// const { UserModel,IUserModel } = require('./path/to/userModel');
import { Document } from "mongoose";
import { UserModel,IUserModel } from "../models/userModel";


export class UserService {
  public static async createUser(userData: IUserModel): Promise< any >  {
    try {
      const user = await UserModel.create(userData);
      return user;
    } catch (error) {
      throw error;
    }
  }
  public static async findUserByGithubId(githubId:string):Promise<any>{
    try {
      const user = await UserModel.findOne({ githubId });
      return user
      
    } catch (error) {
      throw error
    }
  }
  public static async findUserByUsername(username:string):Promise<any>{
    try {
      const user = await UserModel.findOne({ username });
      return user
      
    } catch (error) {
      throw error
    }
  }

  public static async findUserByEmail(email: string): Promise< any> {
    try {
      const user = await UserModel.findOne({ email });
      return user;
    } catch (error) {
      throw error;
    }
  }

  public static async findAllUser(req,res):Promise<any>{
    console.log(123)
    try {
      const users = await UserModel.find({})
      res.send(users)
      console.log(users)
      return users
    } catch (error) {
      throw error;
    }
  }

  public static async updateUser(user: IUserModel): Promise<any> {
    try {
      const updatedUser = await UserModel.findByIdAndUpdate(
        user._id,
        user,
        { new: true }
      );
      return updatedUser;
    } catch (error) {
      throw error;
    }
  }
}