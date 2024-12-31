"use client";
import React, { useState } from "react"; // Import useState
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { createUserWithEmailAndPassword } from "firebase/auth"; // Import Firebase auth function
import { auth } from "../../firebaseConfig"; // Import Firebase configuration
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { cn } from "../../lib/utils";

export function Signup() {
  const navigate = useNavigate();

  // State for form fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [twitterPassword, setTwitterPassword] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error state

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Simulate saving additional user data to a database (e.g., Firestore)
      console.log("User signed up:", {
        uid: user.uid,
        email: user.email,
        firstName,
        lastName,
        twitterPassword,
      });

      // Navigate to login page after successful signup
      navigate("/login");
    } catch (err) {
      console.error("Signup error:", err.message);
      setError(err.message); // Display error message
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white dark:bg-black">
      <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
          Create Your Account
        </h2>
        <form className="my-8" onSubmit={onSubmit}>
          {/* Display error message */}
          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

          {/* First Name and Last Name Inputs */}
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
            <LabelInputContainer>
              <Label htmlFor="firstname">First Name</Label>
              <Input
                id="firstname"
                placeholder="Tyler"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)} // Update first name state
                required
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="lastname">Last Name</Label>
              <Input
                id="lastname"
                placeholder="Durden"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)} // Update last name state
                required
              />
            </LabelInputContainer>
          </div>

          {/* Email Input */}
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              placeholder="projectmayhem@fc.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update email state
              required
            />
          </LabelInputContainer>

          {/* Password Input */}
          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder="••••••••"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update password state
              required
            />
          </LabelInputContainer>

          {/* Twitter Password Input */}
          <LabelInputContainer className="mb-8">
            <Label htmlFor="twitterpassword">Your Twitter Password</Label>
            <Input
              id="twitterpassword"
              placeholder="••••••••"
              type="password"
              value={twitterPassword}
              onChange={(e) => setTwitterPassword(e.target.value)} // Update twitter password state
            />
          </LabelInputContainer>

          {/* Signup Button */}
          <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-md"
            type="submit"
          >
            Sign up &rarr;
            <BottomGradient />
          </button>
        </form>
      </div>
    </div>
  );
}

// Bottom gradient animation component
const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

// LabelInputContainer component for form inputs
const LabelInputContainer = ({ children, className }) => {
  return <div className={cn("flex flex-col space-y-2 w-full", className)}>{children}</div>;
};
