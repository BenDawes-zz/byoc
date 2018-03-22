import { IUserCreated } from "./model";
import { Meteor } from 'meteor/meteor';

export function getNewUserCreatedObject(userId: string): IUserCreated {
  return {
    owner: userId,
    username: Meteor.users.findOne(userId).username,
    createdAt: new Date(),
  }
}