import React from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import toastr from 'toastr';

class MaximizeRatings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment(),
      endDate: moment()
    }
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  handleDateChange(name) {
    return value => {
      (name === 'endDate') ?
        (moment(value).format('L').valueOf() >= moment(this.state.startDate).format('L').valueOf()) ?
          this.setState({
            [name]: value,
          })
          :
          toastr.error('End Date cannot be less than Start Date')
        :
        this.setState({
          [name]: value,
        });
    }
  }

  render() {
    const ratingsArray = this.props.ratings;
    const today = moment(Date()).format('L');
    let { startDate, endDate } = this.state;
    startDate = moment(startDate).format('L');
    endDate = moment(endDate).format('L');
    return (
      <div minimize-contents>
        <div className="maxi-header">
          <label>Start Date:</label>
          <DatePicker
            name="startDate"
            className="form-control"
            selected={this.state.startDate}
            onChange={this.handleDateChange('startDate')}
            maxDate={moment()}
            dateFormat="DD/MM/YYYY"
            readOnly={true}
            showDisabledMonthNavigation
          />
          <label>End Date:</label>
          <DatePicker
            name="endDate"
            className="form-control"
            selected={this.state.endDate}
            onChange={this.handleDateChange('endDate')}
            maxDate={moment()}
            dateFormat="DD/MM/YYYY"
            readOnly={true}
            showDisabledMonthNavigation
          />
        </div>
        {
          ratingsArray.filter(rating => moment(rating.key).format('L').valueOf() <= endDate.valueOf() &&
            moment(rating.key).format('L').valueOf() >= startDate.valueOf()).map((rating, index) => {
              let mealItemRatingArray = [];
              for (let key in rating.value) {
                if (rating.value.hasOwnProperty(key)) {
                  mealItemRatingArray.push({
                    key: key,
                    value: rating.value[key]
                  });
                }
              }
              return (
                <div className="maxi-body" key={index}>
                  <h5>{rating.key}</h5>
                  {
                    mealItemRatingArray.map((mealItemRating, index) => {
                      return (
                        <div key={index}>
                          <h6>{mealItemRating.key}</h6>
                          {
                            mealItemRating.value.map((itemRatings, index) => {
                              return (
                                <div key={index}>
                                  <p>{itemRatings.rating} &nbsp; {itemRatings.email}</p>
                                </div>
                              )
                            })
                          }
                        </div>
                      )
                    })
                  }
                </div>
              )
            })
        }
      </div>
    )
  }
}

export default MaximizeRatings;
