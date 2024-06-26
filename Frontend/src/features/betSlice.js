import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';


console.log('localStorage.getItem("bets"):', localStorage.getItem("bets"));

const initialState = {
  betItems: localStorage.getItem("bets")
    ? JSON.parse(localStorage.getItem("bets")).betItems
    : [],
    clickedOdds: {}
};

const betSlice = createSlice({
  name: "bet",
  initialState,
  reducers: {
    addBets: (state, action) => {
      state.betItems.push({ id: uuidv4(), ...action.payload });
      localStorage.setItem("bets", JSON.stringify({ betItems: state.betItems }));
    },
    deleteBet: (state, action) => {
      state.betItems = state.betItems.filter(
        (item) => item.id !== action.payload
      );
      localStorage.setItem("bets", JSON.stringify({ betItems: state.betItems }));
    },
    toggleOdd: (state, action) => {
      state.clickedOdds[action.payload] = !state.clickedOdds[action.payload];
    },
    clearBets: (state) => {
      state.betItems = []; // Clears all betItems
      localStorage.setItem("bets", JSON.stringify({ betItems: [] })); // Clears 'bets' from the local storage
    },
    clearOdds: (state) => {
      state.clickedOdds = {}; // Clears all clickedOdds
    },
  },
});

export const { addBets, deleteBet, toggleOdd, clearBets, clearOdds } = betSlice.actions;

export default betSlice.reducer;
