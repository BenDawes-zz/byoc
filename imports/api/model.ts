import { Coords } from "google-map-react";

export type IPoint = Coords;

export interface IMeteorEntity {
  _id: string;
}

export enum QuantityGradient {
  None = "NONE",
  Some = "SOME",
  Most = "MOST",
  All = "ALL"
}

export enum EReviewableTypes {
  location = "locations",
}

export interface IUserCreated {
  owner: string;
  username: string | undefined;
  createdAt: Date;
}

export interface IEditable<T> {
  lastEditedAt: Date;
  lastEditedBy: string;
  lastEditedByUsername: string | undefined;
  edits: T[];
}

export interface ILocationProperty<T> extends IRateable {
  value: T;
}

export interface ILocationProperties {
  accepts_own_containers?: ILocationProperty<Boolean>;
  own_packaging_recyclable?: ILocationProperty<QuantityGradient>;
  own_packaging_compostable?: ILocationProperty<QuantityGradient>;
  unpackaged_items?: ILocationProperty<QuantityGradient>;
  return_own_packaging?: ILocationProperty<QuantityGradient>;
}
export interface ILocation extends ILocationBase, IReviewable, IUserCreated, IEditable<ILocation> {
}

export interface ILocationMeteor extends ILocation, IMeteorEntity {
}

export interface ILocationBase {
  name: string;
  location: IPoint;
  properties: ILocationProperties;
}

export type CommentID = string;

export interface ICommentable {
  comments: CommentID[];
}

export interface ICommentBase {
  body: string;
  subject: string;
}

export enum ECommentableTypes {
  comments = "comments",
  review = "reviews",
}

export interface IComment extends ICommentBase, IUserCreated, IEditable<IComment>, ICommentable {
  commentOn: string;
  commentOnType: ECommentableTypes;
}

export interface ICommentMeteor extends IComment, IMeteorEntity {
}

export interface IRateable {
  upvotes: number;
  downvotes: number;
}

export type ReviewID = string;

export interface IReviewable {
  reviews: ReviewID[];
}

export interface IReviewBase extends ICommentBase {
  score: number;
}

export interface IReview extends IReviewBase, IUserCreated, IEditable<IReview>, ICommentable {
  reviewOf: string;
  reviewOfType: EReviewableTypes;
}

export interface IReviewMeteor extends IReview, IMeteorEntity {
}