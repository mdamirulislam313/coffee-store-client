import React from "react";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router";
import Swal from "sweetalert2";

const CoffeeCurd = ({ coffee, coffees, setCoffees }) => {
  const { photo, price, quantity, name, _id } = coffee;

  const handleDelete = (_id) => {
    console.log(_id);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      console.log(result.isConfirmed);
      if (result.isConfirmed) {
        // start deleting the coffee
        fetch(`https://v1-coffee-store-server-gamma.vercel.app/coffees/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Your coffee has been deleted.",
                icon: "success",
              });
              // remove the coffee from the state
              const remainingCoffees = coffees.filter(cof => cof._id !== _id);
              setCoffees(remainingCoffees);
            }
          });
      }
    });
  };

  return (
    <div className="grid p-4">
      <div className="card card-side bg-base-100 shadow-sm border-2 px-4">
        <figure className="items-center">
          <img src={photo} alt="Movie" className="w-32 h-32 object-cover" />
        </figure>
        <div className="flex w-full mt-12 justify-between items-center  pl-8 md:pl-10 lg:pl-16">
          <div>
            <h2 className="">{name}</h2>
            <p>Price: {price}</p>
            <p>Quantity: {quantity}</p>
          </div>
          <div className="card-actions justify-end">
            <div className="join join-vertical">
              <Link to={`/coffee/${_id}`}>
                <button className="btn join-item">
                  <AiOutlineEye className=" text-black text-lg bg-yellow-300 rounded" />
                </button>
              </Link>
              <Link to={`/updateCoffee/${_id}`}>
                <button className="btn join-item">
                  <AiOutlineEdit className="text-white bg-black border text-lg rounded" />
                </button>
              </Link>
              <button
                onClick={() => handleDelete(_id)}
                className="btn join-item"
              >
                <AiOutlineDelete className="bg-red-500 text-lg rounded" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoffeeCurd;
