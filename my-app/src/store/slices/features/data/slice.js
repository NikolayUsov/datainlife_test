/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RequestStatus } from '../../../../utils/const';
import { fetchData } from '../../../../api/api';

const loadData = createAsyncThunk(
  'data/fetch-data',
  fetchData,
);

const initialState = {
  offers: [],
  offersLoadStatus: RequestStatus.LOADING,
};

const data = createSlice({
  name: 'data',
  initialState,
  extraReducers: {
    [loadData.pending]: (state) => {
      state.offersLoadStatus = RequestStatus.LOADING;
    },
    [loadData.fulfilled]: (state, action) => {
      state.offers = action.payload;
      state.offersLoadStatus = RequestStatus.SUCCESS;
    },
    [loadData.rejected]: (state) => {
      state.offersLoadStatus = RequestStatus.ERROR;
    },
  },
});

export { loadData };
export default data.reducer;
