import React, { useState } from "react";
import { useLoaderData } from "react-router";
import CoffeeCurd from "./CoffeeCurd";

const Home = () => {
  const initialCoffees = useLoaderData();

  const [coffees, setCoffees] = useState(initialCoffees);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      {coffees.map((coffee) => (
        <CoffeeCurd 
        key={coffee._id} 
        coffee={coffee}
        coffees = {coffees}
        setCoffees = {setCoffees}
        ></CoffeeCurd>
      ))}
    </div>
  );
};

export default Home;
