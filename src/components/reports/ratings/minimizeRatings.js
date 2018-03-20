import React from 'react';
import moment from 'moment';

const MinimizeRatings = (props) => {
  const ratingsArray = props.ratings;
  const today = moment(Date()).format('L');
  return (
    <div minimize-contents>
      {
        ratingsArray.filter(rating => today.valueOf() === moment(rating.key).format('L').valueOf())
          .map(rating => {
            let ratingsArr = [];
            for (let key in rating.value) {
              if (rating.value.hasOwnProperty(key)) {
                ratingsArr.push({
                  key: key,
                  value: rating.value[key]
                });
              }
            }
            return (
              <div>
                {
                  ratingsArr.map(mealItemRating => {
                    return (
                      <div>
                        <h5>{rating.key} &nbsp; {mealItemRating.key}</h5>
                        {
                          mealItemRating.value.map(itemRating => {
                            return (
                              <p>{itemRatings.rating} &nbsp; {itemRatings.email}</p>
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

export default MinimizeRatings;
