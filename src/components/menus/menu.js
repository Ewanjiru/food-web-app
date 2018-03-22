import React from 'react';
import Sidebar from '../sidebar.js';
import MealItems from '../mealItem/mealItem';
import Meals from '../meals/meal'

const Menu = (props) => (
  <div className="content-wrapper">
    <Sidebar />
    <div className="content">
    <Meals />
    <MealItems />
    </div>
  </div>
)

export default Menu;
