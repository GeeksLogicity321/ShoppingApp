import {createSlice} from '@reduxjs/toolkit';
import Toast from 'react-native-toast-message';

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addToCart(state, action) {
      let ind = -1;
      state.map((item, index) => {
        if (item.id == action.payload.id) {
          ind = index;
        }
      });
      if (ind == -1) {
        let temp = {...action.payload};
        temp.qty = temp.qty + 1;
        state.push(temp);
        Toast.show({
          position: 'bottom',
          type: 'success',
          text1: 'Item has been add to cart',
          visibilityTime: 1000,
        });
      } else {
        state[ind].qty = state[ind].qty + 1;
      }
    },
    increaseCartQty(state, action) {
      let ind = -1;
      state.map((item, index) => {
        if (item.id == action.payload) {
          ind = index;
        }
      });
      if (ind !== -1) {
        state[ind].qty = state[ind].qty + 1;
      }
    },
    decreaseCartQty(state, action) {
      let ind = -1;
      state.map((item, index) => {
        if (item.id == action.payload) {
          ind = index;
        }
      });
      if (ind !== -1) {
        state[ind].qty = state[ind].qty - 1;
      }
    },
    removeItem(state, action) {
      return state.filter(item => item.id !== action.payload);
    },
  },
});

export const {addToCart, increaseCartQty, decreaseCartQty, removeItem} =
  cartSlice.actions;
export default cartSlice.reducer;