import * as React from 'react';
import { Meteor } from 'meteor/meteor';
import { ECommentableTypes, ICommentBase } from '../../api/model';
import { insertComment } from '../../api/comments';

export interface INewCommentProps {
  commentOn: string;
  commentOnType: ECommentableTypes;
}

export interface INewCommentState extends ICommentBase {
}

export class NewComment extends React.Component<INewCommentProps,INewCommentState> {

  private INIT_STATE: INewCommentState = {
    subject: "",
    body: "",
  }

  constructor(props) {
    super(props);
    this.state = this.INIT_STATE;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault()
    const { subject, body } = this.state;
    const { commentOn, commentOnType } = this.props;

    insertComment({ subject, body }, commentOn, commentOnType);
    this.setState(this.INIT_STATE);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  render() {
    return (
      <div className="add-comment form container">
        <form className="new-comment" onSubmit={this.handleSubmit} >
          <input
            type="text"
            name="subject"
            value={this.state.subject}
            placeholder="Subject..."
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="body"
            value={this.state.body}
            placeholder="Body..."
            onChange={this.handleChange}
          />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
  
}