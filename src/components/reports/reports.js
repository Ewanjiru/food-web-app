import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Sidebar from '../sidebar.js';
import Comments from './comments/comments.js';
import Ratings from './ratings/ratings.js';
import * as commentsActions from '../../actions/reports.js';
import * as ratingsActions from '../../actions/ratings.js';

class Reports extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      maximized: 'ratings'
    }
    this.handleToggle = this.handleToggle.bind(this);
  }

  componentDidMount() {
    this.props.actions.loadAllComments();
    this.props.actions.loadAllRatings();
  }

  handleToggle(event) {
    this.setState({
      maximized: event.target.name
    });
  }

  render() {
    return (
      <div className="content-wrapper">
        <Sidebar />
        <div className="content">
          <div className="vendors">
            <div className="header">
              <h4>Reports</h4>
            </div>
            <div className="vendors-content">
              <div className="container">
                <Ratings
                  ratings={this.props.ratings}
                  maximized={this.state.maximized}
                  handleToggle={this.handleToggle}
                />
                <Comments comments={this.props.comments}
                  maximized={this.state.maximized}
                  handleToggle={this.handleToggle}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    comments: state.CommentsReducer,
    ratings: state.RatingsReducer,
  }
)

const mapDispatchToProps = (dispatch) => (
  {
    actions: bindActionCreators({ ...ratingsActions, ...commentsActions }, dispatch)
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(Reports);
