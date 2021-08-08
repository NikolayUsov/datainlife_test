import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../../reducer/name-space';

const initialState = {
  currentMenu: '/',
};

const app = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setCurrentMenu: (state, action) => {
      state.currentMenu = action.payload;
    },
  },
});

const selectCurrentMenu = (state) => state[NameSpace.APP].currentMenu;

export { selectCurrentMenu };
export const { setCurrentMenu } = app.actions;
export default app.reducer;
