import * as React from 'react';
 
import { ICommentable, ICommentMeteor } from '../../api/model';
import { Comments } from '../../api/comments';
import { CommentView } from './CommentView';
import { withTracker } from '../../js-imports/react-meteor-data';

export interface ICommentListExternalProps {
  commentsOn: ICommentable;
}

export interface ICommentListMeteorProps {
  comments: ICommentMeteor[],
  currentUser: Meteor.User,
}
 
export interface IAppExternalProps {
}

export type ICommentListProps = ICommentListMeteorProps & ICommentListExternalProps;

export class UntrackedCommentList extends React.Component<ICommentListProps,{}> {
  public render() {
    return (
      <div className="comments">
        <ul>
          { this.props.comments.map((c) => <li className="comment-container"><CommentView comment={c}/></li>)}
        </ul>
      </div>
    );
  }
}

export const CommentsList = withTracker<ICommentListExternalProps, ICommentListProps>((props: ICommentListExternalProps) => {
  Meteor.subscribe('comments');
  return {
    ...props,
    comments: Comments.find({_id: { $in: props.commentsOn.comments } }).fetch() as ICommentMeteor[],
    currentUser: Meteor.user(),
  };
})(UntrackedCommentList);