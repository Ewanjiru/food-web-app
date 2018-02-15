import initialState from './InitialState';
import { LOAD_VENDOR, ADD_VENDOR_SUCCESS, } from '../actions/actionTypes';

export default function VendorsReducer(state = initialState.vendors, action) {
  switch (action.type) {
    case LOAD_VENDOR:
      return action.payload;
    default:
      return state;
  }
}