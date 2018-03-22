import { IEditable } from "./model";
import { Meteor } from 'meteor/meteor';

export function getNewEditableObject<T>(userId: string): IEditable<T> {
  return {
    lastEditedBy: userId,
    lastEditedByUsername: Meteor.users.findOne(userId).username,
    lastEditedAt: new Date(),
    edits: [],
  }
}