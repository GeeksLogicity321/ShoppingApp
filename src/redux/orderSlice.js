import {createSlice} from '@reduxjs/toolkit';

const orderSlice = createSlice({
  name: 'order',
  initialState: [],
  reducers: {
    setOrderHistory(state, action) {
      state.push(action.payload);
    },
  },
});

export const {setOrderHistory} = orderSlice.actions;
export default orderSlice.reducer;
