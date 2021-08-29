import { SET_FILTER } from '../actions/types';
import { FILTER_TYPES } from '../constants';

export default function filterReducer(state = Object.keys(FILTER_TYPES)[0], action) {
  switch (action.type) {
    case SET_FILTER:
      return action.filter
    default:
      return state;
  }
}