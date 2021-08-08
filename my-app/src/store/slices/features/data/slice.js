import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RequestStatus } from '../../../../utils/const';
import { fetchData, postData } from '../../../../api/api';

const loadData = createAsyncThunk(
  'data/fetch-data',
  fetchData,
);

const sendOrder = createAsyncThunk(
  'data/post-data',
  postData,
);

const initialState = {
  offers: [],
  offersLoadStatus: RequestStatus.LOADING,
  order: {},
  postDataStatus: RequestStatus.UNKNOW,
  orderedOffers: {},
};

const data = createSlice({
  name: 'data',
  initialState,
  reducers: {
    addPositionToCart(state, action) {
      state.orderedOffers = {
        ...state.orderedOffers,
        [action.payload.id]: {
          amount: action.payload.amount,
          totallSum: action.payload.amount * action.payload.price,
        },
      };
    },

    deletePositionFromCart(state, action) {
      const cloneOrdered = { ...state.orderedOffers };
      delete cloneOrdered[action.payload.id];
      state.orderedOffers = cloneOrdered;
    },
  },
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
    [sendOrder.pending]: (state) => {
      state.postDataStatus = RequestStatus.LOADING;
    },
    [sendOrder.fulfilled]: (state, action) => {
      state.order = action.payload;
      state.postDataStatus = RequestStatus.SUCCESS;
      state.orderedOffers = {};
    },
    [sendOrder.rejected]: (state) => {
      state.postDataStatus = RequestStatus.ERROR;
    },
  },
});

export { loadData, sendOrder };
export const { addPositionToCart, deletePositionFromCart } = data.actions;
export default data.reducer;
