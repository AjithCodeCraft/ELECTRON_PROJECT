"use client";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";

export function EmailVerification() {
  const navigate = useNavigate();
  const [emailVerified, setEmailVerified] = useState(false);

  useEffect(() => {
    const checkEmailVerification = async () => {
      const user = auth.currentUser;

      if (user) {
        await user.reload(); // Refresh user data
        if (user.emailVerified) {
          setEmailVerified(true);
          setTimeout(() => navigate("/login"), 2000); // Redirect to login after 2 seconds
        }
      }
    };

    const interval = setInterval(checkEmailVerification, 3000); // Check every 3 seconds
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
        Verify Your Email Address
      </h1>
      <p className="text-gray-600 dark:text-gray-400 text-center mb-8">
        A verification link has been sent to your email. Please check your inbox
        and click the link to verify your account.
      </p>
      {emailVerified ? (
        <p className="text-green-500">Email verified! Redirecting to login...</p>
      ) : (
        <p className="text-gray-500">Waiting for email verification...</p>
      )}
    </div>
  );
}
