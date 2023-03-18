import { React, useContext } from "react";
import "./rightheader.css";
import Avatar from "@mui/material/Avatar";
import { LoginContext } from "../context/ContextProvider";
import { NavLink } from "react-router-dom";
import { Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

const Rightheader = (props) => {
  const { account, setAccount } = useContext(LoginContext);

  const history = useNavigate();

  const cookieValue = Cookies.get("AmazonClonecookie");

  const logoutUser = async () => {
    const res = await fetch("https://amazonclonebackend.onrender.com/logout", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookieValue}`,
      },
      credentials: "include",
    });

    const data = await res.json();
    console.log(data.message);
    console.log(data);

    if (res.status !== 201) {
      console.log("errror");
    } else {
      console.log("data valid");
      toast.success("Logged Out", {
        position: "top-center",
      });

      setAccount(false);
      props.draclose();
      history("/");
    }
  };

  return (
    <>
      <div className="rightheader" onClick={() => props.draclose()}>
        <div className="right_nav">
          {account ? (
            <NavLink style={{ textDecoration: "none" }} to="/profile">
              <Avatar className="avtar2">
                {account.fname[0].toUpperCase()}
              </Avatar>
            </NavLink>
          ) : (
            <Avatar className="avtar"></Avatar>
          )}
          {account ? <h3>{"Hello " + account.fname.toUpperCase()}</h3> : ""}
        </div>
        <div className="nav_btn">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/">Today's Deal</NavLink>
          <Divider style={{ width: "100%", marginLeft: "-20px" }} />
          <NavLink to="/">Shop By Category</NavLink>
          {account ? (
            <NavLink to="/orders">Your Orders</NavLink>
          ) : (
            <NavLink to="/login">Your Orders</NavLink>
          )}
          <Divider style={{ width: "100%", marginLeft: "-20px" }} />
          <NavLink to="/">Settings</NavLink>
          {account ? (
            <p
              onClick={logoutUser}
              style={{ marginTop: "-6px", fontSize: "17px", fontWeight: "800" }}
            >
              {" "}
              Log out
            </p>
          ) : (
            <NavLink to="/login">Sign in</NavLink>
          )}
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default Rightheader;
