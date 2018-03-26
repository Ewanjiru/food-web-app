import React from 'react';
import moment from 'moment';

const MinimizeComments = (props) => {
  const { comments, meals } = props;
  const today = moment('2018-02-03').format('L');
  return (
    <div className='minimize-contents'>
      {
        comments.filter(comment => today.valueOf() === moment(comment.DateCreated).format('L').valueOf())
          .map((comment, index) => {
            let mealTitle = '';
            meals.filter(meal => {
              (meal.breakfast === comment.mealId) ? mealTitle = 'BreakFast' : mealTitle = 'Lunch';
              return mealTitle;
            })
            return (
              <div key={index}>
                <h5>Today's Meals Comments &nbsp;</h5>
                {
                  comment.data.map((singleComment, index) => {
                    return (
                      <p key={index}>
                        <li>
                          {mealTitle}
                          &nbsp;: &nbsp;
                                {commen.comment}
                          &nbsp;By&nbsp;
                                {commen.email}
                        </li>
                      </p>
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

export default MinimizeComments;
