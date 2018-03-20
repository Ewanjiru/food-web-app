import React from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import toastr from 'toastr';

class MaximizeComments extends React.Component {
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
    const commentsArray = this.props.comments;
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
          commentsArray.filter(comment => moment(comment.key).format('L').valueOf() <= endDate.valueOf() &&
            moment(comment.key).format('L').valueOf() >= startDate.valueOf()).map(comment => {
              let commentsArr = [];
              for (let key in comment.value) {
                if (comment.value.hasOwnProperty(key)) {
                  commentsArr.push({
                    key: key,
                    value: comment.value[key]
                  });
                }
              }
              return (
                <div className="maxi-body">
                  <h5>{comment.key}</h5>
                  {
                    commentsArr.map(singleComment => {
                      return (
                        <span>
                          {singleComment.key} &nbsp;
                        {
                            singleComment.value.map(commen => {
                              return (
                                <p>
                                  {commen.comment}
                                  &nbsp;By&nbsp;
                                {commen.email}
                                </p>
                              )
                            })
                          }
                        </span>
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

export default MaximizeComments;
