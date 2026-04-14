import { auth } from '@/auth';
import EditMobileRole from '@/components/edit/EditMobileRole';
import Navbar from '@/components/navbar/Navbar';
import connectDb from '@/lib/db';
import User from '@/models/user.model';
import { redirect } from 'next/navigation';
import React from 'react';

const Home = async() => {
  await connectDb()
  const session=await auth()
  // console.log(session);
  const user = await User.findById(session?.user?.id)
  if(!user){
    redirect('/login')
  }
  const inComplete= !user.mobile || !user.role || (!user.mobile && user.role == 'user')
  if(inComplete){
    return <EditMobileRole/>
  }
  const plainUser=JSON.parse(JSON.stringify(user))
  return (
    <>
     <Navbar user={plainUser}/>
    </>
  );
};

export default Home;