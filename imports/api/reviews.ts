import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Coords } from 'google-map-react';
import { getNewEditableObject } from './editable';
import { getNewUserCreatedObject } from './usercreated';
import { IReview, IReviewBase, EReviewableTypes } from './model';


export const Reviews = new Mongo.Collection<IReview>('reviews');

if (Meteor.isServer) {
  Meteor.publish('review', function reviewsPublication() {
    return Reviews.find();
  });
}

Meteor.methods({
  'reviews.insert'(review: IReviewBase, reviewOf: string, reviewOfType: EReviewableTypes) {

    const { body, subject, score } = review;
    check(body, String);
    check(subject, String);
    check(score, String);
 
    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    const { lastEditedAt, lastEditedBy, lastEditedByUsername, edits } = getNewEditableObject<IReview>(this.userId);
    const { owner, username, createdAt } = getNewUserCreatedObject(this.userId);

    Reviews.insert({
      body, subject, score,
      owner, username, createdAt,
      lastEditedAt, lastEditedBy, lastEditedByUsername, edits,
      reviewOf, reviewOfType,
      comments: [],
    })
  },
  'reviews.delete'(_id) {
    check(_id,String);
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    Reviews.remove({_id});
  },
  'reviews.update'(_id: string, editedReview: IReviewBase) {

    const { body, subject, score } = editedReview;
    check(body, String);
    check(subject, String);
    check(score, String);
 
    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    const { lastEditedAt, lastEditedBy, lastEditedByUsername } = getNewEditableObject<IReview>(this.userId);

    const existingReview = Reviews.findOne(_id);
    const edits = [existingReview,...existingReview.edits];

    Reviews.update(_id, {
      $set: {body,subject,score,lastEditedAt,lastEditedBy,lastEditedByUsername,edits}
    });
  }
})

export function updateReview(_id: string, review: IReviewBase) {
  Meteor.call('review.update', _id, review);
}

export function insertReview(review: IReviewBase, reviewOf: string, reviewOfType: EReviewableTypes) {
  Meteor.call('reviews.insert', review, reviewOf, reviewOfType);
}