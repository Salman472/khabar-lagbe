import { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import mongoose from 'mongoose'

interface IGrocery{
    _id?:mongoose.Types.ObjectId,
    name:string,
    category:string,
    unit:string,
    price:string,
    image:string,
    quantity:number,
    createdAt?:Date,
    updatedAt?:Date
}
// Define a type for the slice state
interface CardSlice {
  cardData: IGrocery[] 
  
}

// Define the initial state using that type
const initialState: CardSlice = {
  cardData:[]
  
}

 const cardSlice = createSlice({
  name: 'card',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    AddToCard:(state,action:PayloadAction<IGrocery>)=>{
        state.cardData.push(action.payload)
    }
  },
})

export const { AddToCard } = cardSlice.actions

export default cardSlice.reducer