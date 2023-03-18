import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./signup.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoginContext } from "../context/ContextProvider";
import Cookies from "js-cookie";

const Sign_in = () => {
  const [logdata, setData] = useState({
    email: "",
    password: "",
  });
  //   console.log(logdata);

  const { account, setAccount } = useContext(LoginContext);

  const history = useNavigate(""); //for navigation to home page

  const cookieName = "AmazonClonecookie";

  const adddata = (e) => {
    // console.log(e.target.name + e.target.value);
    const { name, value } = e.target;
    setData(() => {
      return {
        ...logdata,
        // [e.target.name]:e.target.value,
        [name]: value,
      };
    });
  };

  const senddata = async (e) => {
    e.preventDefault();

    const { email, password } = logdata;

    if (!email || !password) {
      toast.warn("All Fields are mandatory", {
        position: "top-center",
      });
    } else {
      const res = await fetch("https://amazonclonebackend.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      const expirationDate = new Date(Date.now() + 3600 * 1000); // 1 hour from now

      Cookies.set(cookieName, data.token, {
        expires: expirationDate,
        path: "/",
        secure: true,
      });

      console.log(`line 56 signup ${data}`);
      console.log(`line 56 signup ${data.token}`);
      console.log(`cookie amazon ${cookieName}`);

      if (res.status === 400 || !data) {
        console.log("Invalid details");
        toast.warn("Invalid details", {
          position: "top-center",
        });
      } else {
        console.log("Data valid");
        setAccount(data);
        toast.success(`Hello ${data.fname}`, {
          position: "top-center",
        });
        setData({ ...logdata, email: "", password: "" });
        history("/");
      }
    }
  };

  return (
    <>
      <section>
        <div className="sign_container">
          <div className="sign_header">
            <img src="blacklogoamazon.png" alt="amazonlogo" />
          </div>
          <div className="sign_form">
            <form method="POST">
              <h1>Sign-In</h1>
              <div className="form_data">
                <label>Email</label>
                <input
                  type="text"
                  onChange={adddata}
                  placeholder="Enter your Email Id"
                  name="email"
                  value={logdata.email}
                  id="email"
                />
              </div>
              <div className="form_data">
                <label>Password</label>
                <input
                  type="password"
                  onChange={adddata}
                  placeholder="Atleast 6 characters"
                  name="password"
                  value={logdata.password}
                  id="password"
                />
              </div>
              <button className="signin_btn" onClick={senddata}>
                Continue
              </button>
            </form>
          </div>
          <div className="create_accountinfo">
            <p>New to Amazon</p>
            <NavLink to="/register">
              <button>Create Your Account</button>
            </NavLink>
          </div>
        </div>
        <ToastContainer />
      </section>
    </>
  );
};

export default Sign_in;
