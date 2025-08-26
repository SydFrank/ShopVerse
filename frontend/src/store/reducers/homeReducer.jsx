import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const homeReducer = createSlice({
  name: "home",
  initialState: {
    categorys: [],
  },
  reducers: {},

  extraReducers: (builder) => {},
});

export default homeReducer.reducer;
