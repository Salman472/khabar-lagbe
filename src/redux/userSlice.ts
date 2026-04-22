import { createSlice } from '@reduxjs/toolkit'
import mongoose from 'mongoose'

interface IUser{
    _id?:mongoose.Types.ObjectId
    name:string
    email:string
    password?:string
    mobile?:string
    role:'user' | 'deliveryBoy' | 'admin'
    image?:string
}
// Define a type for the slice state
interface IUserSlice {
  userData: IUser | null
  
}

// Define the initial state using that type
const initialState: IUserSlice = {
  userData:null
  
}

export const userSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    SetUserData:(state, action)=>{
        state.userData=action.payload
    }
  },
})

export const { SetUserData } = userSlice.actions

export default userSlice.reducer