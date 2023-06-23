import {createSlice} from '@reduxjs/toolkit';

const globalSlice = createSlice({
  name: 'global',
  initialState: {isLoader: false, allProducts: []},
  reducers: {
    setLoader(state, action) {
      state.isLoader = action.payload;
    },
    setAllProducts(state, action) {
      action.payload.map(item => {
        state.allProducts.push(item);
      });
    },
  },
});

export const {setLoader, setAllProducts} = globalSlice.actions;
export default globalSlice.reducer;
