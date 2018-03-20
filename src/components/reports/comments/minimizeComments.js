import React from 'react';
import moment from 'moment';

const MinimizeComments = (props) => {
  const commentsArray = props.comments;
  const today = moment('2018-02-03').format('L');
  return (
    <div className='minimize-contents'>
      {
        commentsArray.filter(comment => today.valueOf() === moment(comment.key).format('L').valueOf())
          .map(comment => {
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
              <div>
                <h5>Today's Meals Comments &nbsp;</h5>
                {
                  commentsArr.map((singleComment, index) => {
                    return (
                      <p key={index}>
                        {
                          singleComment.value.map(commen => {
                            return (
                              <li key={index}>
                                {singleComment.key}
                                &nbsp;: &nbsp;
                                {commen.comment}
                                &nbsp;By&nbsp;
                                {commen.email}
                              </li>
                            )
                          })
                        }
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
