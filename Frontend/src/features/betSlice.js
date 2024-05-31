import { createSlice } from "@reduxjs/toolkit";

console.log('localStorage.getItem("bets"):', localStorage.getItem("bets"));

const initialState = {
  betItems: localStorage.getItem("bets")
    ? JSON.parse(localStorage.getItem("bets")).betItems
    : [],
  clickedOdds: [false, false, false],
};

const betSlice = createSlice({
  name: "bet",
  initialState,
  reducers: {
    addBets: (state, action) => {
      state.betItems.push(action.payload);
      localStorage.setItem("bets", JSON.stringify({ betItems: state.betItems })); // Modify this line
    },
    deleteBet: (state, action) => {
      state.betItems = state.betItems.filter(
        (item, index) => index !== action.payload
      );
      localStorage.setItem("bets", JSON.stringify({ betItems: state.betItems })); // Modify this line
    },
    toggleOdd: (state, action) => {
      state.clickedOdds[action.payload] = !state.clickedOdds[action.payload];
    },
  },
});

export const { addBets, deleteBet, toggleOdd } = betSlice.actions;

export default betSlice.reducer;
