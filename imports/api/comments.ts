import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Coords } from 'google-map-react';
import { IComment, ICommentBase, ECommentableTypes } from './model';
import { getNewEditableObject } from './editable';
import { getNewUserCreatedObject } from './usercreated';


export const Comments = new Mongo.Collection<IComment>('comments');

if (Meteor.isServer) {
  Meteor.publish('comments', function commentsPublication() {
    return Comments.find();
  });
}

Meteor.methods({
  'comments.insert'(comment: ICommentBase, commentOn: string, commentOnType: ECommentableTypes) {

    const { body, subject } = comment;
    check(body, String);
    check(subject, String);
 
    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    const { lastEditedAt, lastEditedBy, lastEditedByUsername, edits } = getNewEditableObject<IComment>(this.userId);
    const { owner, username, createdAt } = getNewUserCreatedObject(this.userId);

    Comments.insert({
      body,
      subject,
      owner, username, createdAt,
      lastEditedAt, lastEditedBy, lastEditedByUsername, edits,
      commentOn, commentOnType,
      comments: [],
    })
  },
  'comments.delete'(_id) {
    check(_id,String);
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    Comments.remove({_id});
  },
  'comments.update'(_id: string, editedComment: ICommentBase) {

    const { body, subject } = editedComment;
    check(body, String);
    check(subject, String);
 
    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    const { lastEditedAt, lastEditedBy, lastEditedByUsername } = getNewEditableObject<IComment>(this.userId);

    const existingComment = Comments.findOne(_id);
    const edits = [existingComment,...existingComment.edits];

    Comments.update(_id, {
      $set: {body,subject,lastEditedAt,lastEditedBy,lastEditedByUsername,edits}
    });
  }
})

export function updateComment(_id: string, comment: ICommentBase) {
  Meteor.call('comments.update', _id, comment);
}

export function insertComment(comment: ICommentBase, commentOn: string, commentOnType: ECommentableTypes) {
  Meteor.call('comments.insert', comment, commentOn, commentOnType);
}

export const addCommentTo = insertComment;
