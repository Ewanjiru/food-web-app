import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MaximizeRatings from './maximizeRatings.js';
import MinimizeRatings from './minimizeRatings.js';
import * as ratingsActions from '../../../actions/ratings.js';

class Ratings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      maximise: true
    }
  }

  componentDidMount() {
    this.props.actions.loadAllRatings();
  }

  componentWillReceiveProps(nextProps) {
    const { maximized } = nextProps;
    const { maximise } = this.state;
    if (maximized === 'ratings' || maximized === 'comments') {
      this.setState({
        maximise: !maximise
      })
    }
  }

  render() {
    const { ratings } = this.props;
    const { maximise } = this.state;
    let ratingsArray = [];
    let mealItemRatingArray = [];
    for (let key in ratings) {
      if (ratings.hasOwnProperty(key)) {
        ratingsArray.push({
          key: key,
          value: ratings[key]
        });
      }
    }
    return (
      <div className="ratings">
        <div className="ratings-header">
          <button
            id="icons"
            className={(maximise) ? "fa fa-window-minimize" : "fa fa-window-maximize"}
            aria-hidden="true"
            name="ratings"
            onClick={(event) => this.props.handleToggle(event)}
          />
        </div>
        <div className="ratings-body">
          {
            (this.state.maximise) ?
              <MaximizeRatings ratings={ratingsArray} />
              :
              <MinimizeRatings ratings={ratingsArray} />
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    comments: state.CommentsReducer,
    ratings: state.RatingsReducer,
    mealItems: state.MealItemsReducer,
    meals: state.MealReducer,
  }
)

const mapDispatchToProps = (dispatch) => (
  {
    actions: bindActionCreators({ ...ratingsActions }, dispatch)
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(Ratings);
