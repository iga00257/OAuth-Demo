import { Document, Schema, Model, model,ObjectId } from "mongoose";

export interface IUserModel extends Document {  
  username?: string,
  email?: string,  
  githubId?: string; 
}

const UserSchema = new Schema({ 
  username: { type: String,unique:false   },
  email: { type: String,unique:false  }, 
  githubId: { type: String,unique:false }, 
});

const UserModel = model("User", UserSchema);

export {
  UserModel
};