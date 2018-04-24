import { IEditable } from "./model";
import { Meteor } from 'meteor/meteor';

export function getNewEditableObject<T>(userId: string | undefined): IEditable<T> {
  return {
    lastEditedBy: userId || "unknown_user_id",
    lastEditedByUsername: userId ? Meteor.users.findOne(userId).username : undefined,
    lastEditedAt: new Date(),
    edits: [],
  }
}