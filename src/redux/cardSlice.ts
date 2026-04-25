import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import mongoose from "mongoose";

interface IGrocery {
  _id?: mongoose.Types.ObjectId;
  name: string;
  category: string;
  unit: string;
  price: string;
  image: string;
  quantity: number;
  createdAt?: Date;
  updatedAt?: Date;
}
// Define a type for the slice state
interface CardSlice {
  cardData: IGrocery[];
  subTotal: number;
  discount: number;
  total: number;
}

// Define the initial state using that type
const initialState: CardSlice = {
  cardData: [],
  subTotal: 0,
  discount: 0,
  total: 0,
};

const cardSlice = createSlice({
  name: "card",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    AddToCard: (state, action: PayloadAction<IGrocery>) => {
      state.cardData.push(action.payload);
      cardSlice.caseReducers.CalculateTotals(state);
    },
    IncriseQuantity: (
      state,
      action: PayloadAction<mongoose.Types.ObjectId>,
    ) => {
      const grocery = state.cardData.find((i) => i._id == action.payload);
      if (grocery) {
        grocery.quantity = grocery.quantity + 1;
      }
      cardSlice.caseReducers.CalculateTotals(state)
    },
    DecriseQuantity: (
      state,
      action: PayloadAction<mongoose.Types.ObjectId>,
    ) => {
      const grocery = state.cardData.find((i) => i._id == action.payload);
      if (grocery?.quantity && grocery.quantity > 1) {
        grocery.quantity = grocery.quantity - 1;
      } else {
        state.cardData = state.cardData.filter((i) => i._id !== action.payload);
      }
      cardSlice.caseReducers.CalculateTotals(state)
    },
    CartDelete: (state, action: PayloadAction<mongoose.Types.ObjectId>) => {
      state.cardData = state.cardData.filter((i) => i._id !== action.payload);
      cardSlice.caseReducers.CalculateTotals(state)
    },
    CalculateTotals: (state) => {
      state.subTotal = state.cardData.reduce(
        (acc, item) => acc + Number(item.price) * item.quantity,
        0,
      );
      const rules = [
        { min: 100000, rate: 0.2 },
        { min: 50000, rate: 0.18 },
        { min: 30000, rate: 0.15 },
        { min: 20000, rate: 0.12 },
        { min: 10000, rate: 0.1 },
        { min: 5000, rate: 0.07 },
        { min: 2500, rate: 0.05 },
        { min: 1000, rate: 0.03 },
      ];
      const rule = rules.find((r) => state.subTotal >= r.min);
      state.discount = rule ? Math.floor(state.subTotal * rule.rate) : 0;

      state.total = state.subTotal - state.discount;
    },
  },
});

export const { AddToCard, IncriseQuantity, DecriseQuantity, CartDelete } =
  cardSlice.actions;

export default cardSlice.reducer;
