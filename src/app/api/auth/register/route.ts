import connectDb from "@/lib/db";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    try{
        // connect DB
        await connectDb()
        const {name, email, password}=await req.json()
        // find existing user and return
        const existingUser=await User.findOne({email})
        if(existingUser){
            return NextResponse.json(
                {message:'This user already exists. Try using a different one!'},
                {status:400}
            )
        }
        // check password length
       if(password.length < 6){
        return NextResponse.json(
            {message:'password must be at least 6 characters!'},
            {status:400}
        )
       }
        // hash password
        const hashPassword = await bcrypt.hash(password, 15)

        // create new user

        const users=await User.create({
            name, email, password:hashPassword
        })

        return NextResponse.json(
            users,
            {status:200}
        )
    
       
    }
    catch(error){
       return NextResponse.json(
        {message:`registe error ${error}`},
        {status:500}
       )
    }
}

// dbConnect
// name, email, password => frontend
// check email
// check password at least 6 character
// hash password
// create new user