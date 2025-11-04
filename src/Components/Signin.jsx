import React, { use } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { data } from 'react-router';

const Signin = () => {

  const {signInUser} = use(AuthContext);

    const handleSignIn = e=>{
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password)
        
        // firebase sign in send 
        signInUser(email, password)
        .then(result=>{
          console.log(result.user)

          const signinInfo = {
            email,
            lastSignInTime: result.user?.metadata?.lastSignInTime

          }
          // update last sign in to the database
          fetch('https://v1-coffee-store-server-gamma.vercel.app/users',{
            method:'PATCH',
            headers:{
              'content-type' : 'application/json'
            },
            body: JSON.stringify(signinInfo)
          })
          .then(res => res.json())
          .then(data => {
            console.log('after update patch.', data)
          })


        })
        .catch(error => {
          console.log(error);
        })
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