import React, { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const [account, setAccount] = useState(null); // Initialize account state to null

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const cookieValue = document.cookie
          .split("; ")
          .find((row) => row.startsWith("jwt="))
          .split("=")[1];
        const res = await fetch(
          "https://amazonclonebackend.onrender.com/validuser",
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${cookieValue}`,
            },
            credentials: "include",
          }
        );
        const data = await res.json();
        console.log(data);
        if (res.status === 201) {
          console.log("data valid");
          setAccount(data);
        } else {
          console.log("error");
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchAccount();
  }, []); // Use useEffect to fetch account info only once when the component mounts

  console.log("hi");
  return account ? <Outlet /> : <Navigate to="/login" />; // Render Outlet if account is not null, else render Navigate
};

export default ProtectedRoutes;
