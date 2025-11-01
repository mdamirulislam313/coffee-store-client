import React from 'react';

const Signin = () => {
    const handleSignIn = e=>{
        e.preventDefault();
    }
    return (
        <div className="card bg-base-100 w-full max-w-sm mx-auto shadow-2xl">
      <div className="card-body">
        <h1 className="text-3xl font-bold mb-4">Sign In</h1>

        <form onSubmit={handleSignIn} className="fieldset">
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

export default Signin;