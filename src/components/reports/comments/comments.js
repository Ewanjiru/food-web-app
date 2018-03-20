import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MinimizeComments from './minimizeComments';
import MaximizeComments from './maximiseComments';

class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: {},
      maximise: false
    }
  }

  componentWillReceiveProps(nextProps) {
    const { maximized } = nextProps;
    const { maximise } = this.state;
    if (maximized === 'comments' || maximized === 'ratings') {
      this.setState({
        maximise: !maximise
      })
    }
  }

  render() {
    const { comments } = this.props;
    const { maximise } = this.state;
    let commentsArray = [];
    for (let key in comments) {
      if (comments.hasOwnProperty(key)) {
        commentsArray.push({
          key: key,
          value: comments[key]
        });
      }
    }
    return (
      <div className="comments">
        <div className="comments-header">
          <button
            id="icons"
            className={(maximise) ? "fa fa-window-minimize" : "fa fa-window-maximize"}
            aria-hidden="true"
            name="comments"
            onClick={(event) => this.props.handleToggle(event)}
          />
        </div>
        <div className="comments-body">
          {
            (this.state.maximise) ?
              <MaximizeComments comments={commentsArray} />
              :
              <MinimizeComments comments={commentsArray} />
          }
        </div>
      </div>
    );
  }
}

export default Comments;
