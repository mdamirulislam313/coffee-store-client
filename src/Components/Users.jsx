import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { data, useLoaderData } from "react-router";
import Swal from "sweetalert2";

const Users = () => {
  const initialUsers = useLoaderData();
  const [users, setUsers] = useState(initialUsers);

  // useEffect(()=>{
  //   fetch('/')
  //   .then(res => res.json())
  //   .then(data =>[
  //     console.log(data);
  //   ])
  // },[])

  // useEffect(()=>{
  //   axios.get('/')
  //   .then(data => {
  //     console.log(data.data);
  //   })
  // },[])

  const handleView = (user) => {
    Swal.fire({
      title: `${user.name}'s Details`,
      html: `
        <p><strong>Address:</strong> ${user.address}</p>
        <p><strong>Phone:</strong> ${user.phone}</p>
        <p><strong>Email:</strong> ${user.email}</p>
      `,
      imageUrl: user.photo,
      imageWidth: 100,
      imageHeight: 100,
      imageAlt: "User Photo",
    });
  };

  const handleEdit = (user) => {
    Swal.fire("Edit functionality coming soon!");
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://v1-coffee-store-server-gamma.vercel.app/users/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) {
              const remainingUser = users.filter((u) => u._id !== id);
              setUsers(remainingUser);

              Swal.fire({
                title: "Deleted!",
                text: "User has been deleted.",
                icon: "success",
              });
            }
          });
      }
    });
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">Users: {users.length}</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>No</th>
              <th>Photo</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={user.photo} alt="User Avatar" />
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  {user.name}
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    {user.address}
                  </span>
                </td>
                <td>{user.phone}</td>
                <td>{user.email}</td>
                <td>
                  <div className="flex gap-2">
                    {/* View Button */}
                    <div className="relative group inline-block">
                      <button
                        onClick={() => handleView(user)}
                        className="text-blue-500 hover:text-blue-700 hover:bg-white rounded p-1"
                      >
                        <FaEye size={18} />
                      </button>
                      <span
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2
                                       bg-blue-500 text-white text-xs px-2 py-1 rounded opacity-0
                                       group-hover:opacity-100 transition-opacity duration-300"
                      >
                        View
                      </span>
                    </div>

                    {/* Edit Button */}
                    <div className="relative group inline-block">
                      <button
                        onClick={() => handleEdit(user)}
                        className="text-green-500 hover:text-green-700 hover:bg-white rounded p-1"
                      >
                        <FaEdit size={18} />
                      </button>
                      <span
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2
                                       bg-green-500 text-white text-xs px-2 py-1 rounded opacity-0
                                       group-hover:opacity-100 transition-opacity duration-300"
                      >
                        Edit
                      </span>
                    </div>

                    {/* Delete Button */}
                    <div className="relative group inline-block">
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="text-red-500 hover:text-red-700 hover:bg-white rounded p-1"
                      >
                        <FaTrash size={18} />
                      </button>
                      <span
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2
                                       bg-red-500 text-white text-xs px-2 py-1 rounded opacity-0
                                       group-hover:opacity-100 transition-opacity duration-300"
                      >
                        Delete
                      </span>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
