import {getModelForClass, modelOptions, pre, prop} from "@typegoose/typegoose";
import argon2 from "argon2";

@pre<User>("save", async function (next) {
  const hashedPassword = await argon2.hash(this.password);
  this.password = hashedPassword;
  return next();
})
@modelOptions({
  schemaOptions: {
    timestamps: true,
    versionKey: false,
  },
})
export class User {
  @prop({unique: true})
  email: string;
  @prop({unique: true})
  username: string;
  @prop()
  password: string;
  @prop({type: () => String, required: true, default: []})
  accessTokens: string[];
}

export default getModelForClass(User);
