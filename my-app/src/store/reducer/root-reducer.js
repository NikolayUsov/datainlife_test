import { combineReducers } from 'redux';
import { NameSpace } from './name-space';
import dataSlice from '../slices/features/data/slice';
import appSlice from '../slices/features/app/slice';

export default combineReducers({
  [NameSpace.DATA]: dataSlice,
  [NameSpace.APP]: appSlice,
});
