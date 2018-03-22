import { IUserCreated } from "./model";
import { Meteor } from 'meteor/meteor';

export function getNewUserCreatedObject(userId: string | undefined): IUserCreated {
  return {
    owner: userId || "unknown_user_id",
    username: userId ? Meteor.users.findOne(userId).username : undefined,
    createdAt: new Date(),
  }
}