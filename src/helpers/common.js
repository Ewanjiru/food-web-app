export const itemsArr = (ItemsObj) => {
  let itemsArray = [];
  let data = [];
  let contentKey = "DateCreated";
  let breakfast = "";
  let lunch = "";
  let mealId = "";

  for (const key in ItemsObj) {
    if (ItemsObj.hasOwnProperty(key)) {
      let singleItem = ItemsObj[key];
      for (const key2 in singleItem) {
        if (singleItem.hasOwnProperty(key2)) {
          if (key2 === "Breakfast" || key2 === "Lunch") {
            (key2 === "Breakfast") ? breakfast = singleItem[key2].meal_id
              :
              lunch = singleItem[key2].meal_id;
          } else {
            mealId = key2;
            data = singleItem[key2];
          }
        }
      }
      (mealId === "") ?
        itemsArray.push({
          [contentKey]: key,
          ["breakfast"]: breakfast,
          ["lunch"]: lunch
        })
        :
        itemsArray.push({
          [contentKey]: key,
          ["mealId"]: mealId,
          ["data"]: data
        })
    }
  }
  return itemsArray;
}