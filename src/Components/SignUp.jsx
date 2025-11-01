import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import Swal from "sweetalert2";

const SignUp = () => {
  const { createUser } = useContext(AuthContext);

  const handleSignUp = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const { email, password, ...userProfile } = Object.fromEntries(
      formData.entries()
    );
    console.log(email, password, userProfile);

    // create user in Firebase
    createUser(email, password)
      .then((result) => {
        console.log("Firebase user:", result.user);

        // save profile in MongoDB
        fetch("http://localhost:3000/users", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(userProfile),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("After profile save:", data);
            if (data.insertedId) {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your account is  created",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Signup failed",
          text: err.message,
        });
      });
  };

  return (
    <div className="card bg-base-100 w-full max-w-sm mx-auto shadow-2xl">
      <div className="card-body">
        <h1 className="text-3xl font-bold mb-4">Sign Up</h1>

        <form onSubmit={handleSignUp} className="fieldset">
          <label className="label">Name</label>
          <input
            type="text"
            name="name"
            className="input"
            placeholder="Name"
            required
          />

          <label className="label">Address</label>
          <input
            type="text"
            name="address"
            className="input"
            placeholder="Address"
          />

          <label className="label">Phone</label>
          <input
            type="tel"
            name="phone"
            className="input"
            placeholder="Phone"
            autoComplete="tel"
          />

          <label className="label">Photo URL</label>
          <input
            type="url"
            name="photo"
            className="input"
            placeholder="Enter photo URL"
            autoComplete="url"
          />

          <label className="label">Email</label>
          <input
            type="email"
            name="email"
            className="input"
            placeholder="Enter your email"
            autoComplete="email"
            required
          />

          <label className="label">Password</label>
          <input
            type="password"
            name="password"
            className="input"
            placeholder="Password"
            autoComplete="current-password"
            required
          />

          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>

          <button className="btn btn-neutral mt-4">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
