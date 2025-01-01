"use client";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { cn } from "../../lib/utils";
import { Link } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

export function Signup() {
  const navigate = useNavigate();

  // State for form fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(""); // For password strength
  const [confirmPasswordError, setConfirmPasswordError] = useState(""); // For live confirm password validation
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Password strength checker
  const checkPasswordStrength = (password) => {
    if (password.length < 6) return "Weak";
    const strongPattern = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/;
    const mediumPattern = /^(?=.*[A-Z])|(?=.*[0-9])|(?=.*[!@#$%^&*])/;
    if (strongPattern.test(password)) return "Strong";
    if (mediumPattern.test(password)) return "Medium";
    return "Weak";
  };

  const onPasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordStrength(checkPasswordStrength(value)); // Update password strength
  };

  const onConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    if (password !== value) {
      setConfirmPasswordError("Passwords do not match.");
    } else {
      setConfirmPasswordError(""); // Clear error if passwords match
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error state

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      // Create a new user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Send email verification
      await sendEmailVerification(user);
      setSuccessMessage(
        "Signup successful! Please verify your email address before logging in."
      );

      // Save user details to Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        firstName,
        lastName,
        createdAt: new Date().toISOString(),
      });

      console.log("User signed up and verification email sent:", {
        uid: user.uid,
        email: user.email,
        firstName,
        lastName,
      });

      // Redirect to the verification page
      navigate("/email-verification");
    } catch (err) {
      console.error("Signup error:", err.message);

      // Map Firebase error codes to user-friendly messages
      if (err.code === "auth/email-already-in-use") {
        setError("User already registered with this email.");
      } else if (err.code === "auth/invalid-email") {
        setError("Invalid email address.");
      } else if (err.code === "auth/weak-password") {
        setError("Password is too weak. Please use at least 6 characters.");
      } else {
        setError("Signup failed. Please try again later.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-svh bg-white dark:bg-black">
      <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
          Create Your Account
        </h2>
        <form className="my-8" onSubmit={onSubmit}>
          {/* Display success or error message */}
          {successMessage && (
            <div className="text-green-500 text-sm mb-4">{successMessage}</div>
          )}
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
              onChange={onPasswordChange} // Live password strength validation
              required
            />
            {password && (
              <div
                className={`text-sm mt-1 ${
                  passwordStrength === "Strong"
                    ? "text-green-500"
                    : passwordStrength === "Medium"
                    ? "text-yellow-500"
                    : "text-red-500"
                }`}
              >
                Password Strength: {passwordStrength}
              </div>
            )}
          </LabelInputContainer>

          {/* Confirm Password Input */}
          <LabelInputContainer className="mb-8">
            <Label htmlFor="confirmpassword">Confirm Password</Label>
            <Input
              id="confirmpassword"
              placeholder="••••••••"
              type="password"
              value={confirmPassword}
              onChange={onConfirmPasswordChange} // Live confirm password validation
              required
            />
            {confirmPasswordError && (
              <div className="text-red-500 text-sm mt-1">{confirmPasswordError}</div>
            )}
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
        <p className="text-center text-sm text-neutral-600 dark:text-neutral-400 mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-500 hover:text-blue-700 transition"
          >
            Login
          </Link>
        </p>
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
