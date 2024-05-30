import { createSlice } from '@reduxjs/toolkit';

const initialState = localStorage.getItem("bets") ? JSON.parse(localStorage.getItem("bets")) : { betItems: [] }

const betSlice = createSlice({
  name: 'bet',
  initialState,
  reducers: {
    addBets: (state, action) => {
      state.betItems.push(action.payload);
      localStorage.setItem("bets", JSON.stringify(state));
    },
    deleteBet: (state, action) => {
      state.betItems = state.betItems.filter((item, index) => index !== action.payload);
      localStorage.setItem("bets", JSON.stringify(state));
    }
  }
})

export const { addBets, deleteBet } = betSlice.actions

export default betSlice.reducer;
