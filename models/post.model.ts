import {getModelForClass, modelOptions, prop, Ref} from "@typegoose/typegoose";
import {User} from "./user.model";

@modelOptions({schemaOptions: {timestamps: true, versionKey: false}})
export class Post {
  @prop()
  title: string;
  @prop()
  description: string;
  @prop({ref: () => User})
  author: Ref<User>;
}

export default getModelForClass(Post);
