import { combineReducers } from '@reduxjs/toolkit';
import vehicles from './vehiclesSlice';
import user from './userSlice';
import vehiclesDetail from './vehicelDetailSlice';

const reducer = combineReducers({
  vehicles,
  user,
  vehiclesDetail
});

export default reducer;
