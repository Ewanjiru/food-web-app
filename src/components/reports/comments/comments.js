import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MinimizeComments from './minimizeComments';
import MaximizeComments from './maximiseComments';
import * as commentsActions from '../../../actions/reports.js';
import { itemsArr } from '../../../helpers/common.js';

class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      maximise: false
    }
  }

  componentWillMount() {
    this.props.actions.loadAllComments();
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
    const { comments, meals } = this.props;
    const { maximise } = this.state;
    const commentsArray = itemsArr(comments);
    const mealsArray = itemsArr(meals);
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
              <MaximizeComments
                comments={commentsArray}
                meals={mealsArray} />
              :
              <MinimizeComments
                comments={commentsArray}
                meals={mealsArray} />
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    comments: state.CommentsReducer,
    mealItems: state.MealItemsReducer,
    meals: state.MealReducer,
  }
)

const mapDispatchToProps = (dispatch) => (
  {
    actions: bindActionCreators({ ...commentsActions }, dispatch)
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
