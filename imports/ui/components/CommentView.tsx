import * as React from 'react';
 
import { IComment } from '../../api/model';

export interface ICommentProps {
  comment: IComment;
}

export class CommentView extends React.Component<ICommentProps,{}> {
  public render() {
    const { subject,
            body, 
            lastEditedAt,
            lastEditedBy,
            lastEditedByUsername,
            createdAt,
            username
          } = this.props.comment;
    return (
      <div className="comment-data">
  			<h1 className="subject">{subject}</h1>
        <div className="body">{body}</div>
        <div className="comment-metadata">
          <ul>
            <li>Created: {""+createdAt}</li>
            <li>Created By: {""+username}</li>
            <li>Edited: {""+lastEditedAt}</li>
            <li>Edited By: {""+lastEditedByUsername}</li>
          </ul>
        </div>
      </div>
    );
  }
}