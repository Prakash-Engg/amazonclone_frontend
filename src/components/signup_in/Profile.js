import { React, useEffect, useContext, useState } from "react";
import "./profile.css";
import { LoginContext } from "../context/ContextProvider";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Avatar, Divider } from "@mui/material";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const { account, setAccount } = useContext(LoginContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  // const [pic, setPic] = useState();
  const [password, setPassword] = useState("");
  const [cpassword, setcpassword] = useState("");
  // const [picMessage, setPicMessage] = useState();

  const navigate = useNavigate("");

  const submitHandler = async () => {
    if (password === cpassword) {
      const res = await axios.post(
        "https://amazonclonebackend.onrender.com/profile",
        {
          name,
          email,
          password,
          cpassword,
        }
      );

      console.log(res.status);
      if (res.status === 201) {
        toast.success("User updated", {
          position: "top-center",
        });
        console.log(res.data);
        console.log(res.data);
        setAccount(res.data);
      } else {
        toast.warn("Error", {
          position: "top-center",
        });
      }

      navigate("/");
    } else {
      toast.warn("Password & Confirm password not matching", {
        position: "top-center",
      });
    }
  };

  return (
    <div className="parent">
      <div className="profilepic">
        <div className="hello">
          <h3 style={{ marginLeft: "18px" }}>{`Hello, ${account.fname}`}</h3>
          <Avatar />
        </div>
        <div className="four">
          <div className="fourtop">
            <div className="yourorders">
              <p>Your Orders</p>
            </div>
            <div className="yourorders">
              <p>Buy Again</p>
            </div>
          </div>
          <div className="fourbottom">
            {" "}
            <div className="yourorders">
              <p>Your Account</p>
            </div>
            <div className="yourorders">
              <p>Your Wishlist</p>
            </div>
          </div>
        </div>
        <Divider style={{ width: "87vw", marginLeft: "6vw" }} />
        <div className="doneform">
          <h3 className="update">Update your Profile</h3>
          <Row className="profileContainer">
            <Col md={6}>
              <Form className="form" onSubmit={submitHandler}>
                <Form.Group className="name" controlId="name">
                  <Form.Label className="nameinput1">Name</Form.Label>
                  <Form.Control
                    className="nameinput"
                    type="text"
                    placeholder="Enter Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group className="name" controlId="email">
                  <Form.Label className="nameinput1">Email Address</Form.Label>
                  <Form.Control
                    className="nameinput"
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group className="name" controlId="password">
                  <Form.Label className="nameinput1">Password</Form.Label>
                  <Form.Control
                    className="nameinput"
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group className="name" controlId="confirmPassword">
                  <Form.Label className="nameinput1">
                    Confirm Password
                  </Form.Label>
                  <Form.Control
                    className="nameinput"
                    type="password"
                    placeholder="Enter Password Again"
                    value={cpassword}
                    onChange={(e) => setcpassword(e.target.value)}
                  ></Form.Control>
                </Form.Group>{" "}
                <Form.Group controlId="pic">
                  {/* <Form.Label>Change Profile Picture</Form.Label> */}
                  {/* <Form.File
                onChange={(e) => postDetails(e.target.files[0])}
                id="custom-file"
                type="image/png"
                label="Upload Profile Picture"
                custom
              /> */}
                </Form.Group>
                <Button
                  style={{
                    backgroundColor: "#f3cc0a",
                    border: "0px",
                    borderRadius: "20px",
                    fontSize: "1rem",
                    padding: "6px 10px 6px 10px",
                    fontFamily: "sans-serif",
                  }}
                  type="submit"
                  varient="primary"
                >
                  Update
                </Button>
              </Form>
            </Col>
            {/* <Col
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img src={pic} alt={name} className="profilePic" />
          </Col> */}
          </Row>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default Profile;
