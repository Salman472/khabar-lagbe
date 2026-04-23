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
}

// Define the initial state using that type
const initialState: CardSlice = {
  cardData: [],
};

const cardSlice = createSlice({
  name: "card",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    AddToCard: (state, action: PayloadAction<IGrocery>) => {
      state.cardData.push(action.payload);
    },
    IncriseQuantity: (
      state,
      action: PayloadAction<mongoose.Types.ObjectId>,
    ) => {
      const grocery = state.cardData.find((i) => i._id == action.payload);
      if (grocery) {
        grocery.quantity = grocery.quantity + 1;
      }
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
    },
    CartDelete : (state, action:PayloadAction<mongoose.Types.ObjectId>)=>{
      state.cardData=state.cardData.filter(i=>i._id !== action.payload)
    }
  },
});

export const { AddToCard, IncriseQuantity, DecriseQuantity,CartDelete } =
  cardSlice.actions;

export default cardSlice.reducer;
