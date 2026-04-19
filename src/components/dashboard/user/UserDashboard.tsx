import React from "react";

import CategorySlider from "../../home/user/CategorySlider";
import Hero from "../../home/user/Hero";
import Groceries from "@/components/home/user/groceries/Groceries";


const UserDashboard = () => {

  return (
    <>
      <Hero />
      <CategorySlider />
      <Groceries/>
    </>
  );
};

export default UserDashboard;
