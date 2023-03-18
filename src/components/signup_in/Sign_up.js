import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Sign_up = () => {
  const [udata, setUdata] = useState({
    fname: "",
    mobile: "",
    email: "",
    password: "",
    cpassword: "",
  });

  console.log(udata);

  const addudata = (e) => {
    setUdata({
      ...udata,
      [e.target.name]: e.target.value,
    });
  };

  const senddata = async (e) => {
    e.preventDefault();
    const { fname, mobile, email, password, cpassword } = udata; // why not we pass "udata" directlty instead of usinf object destructuring

    if (fname === "") {
      toast.warn("Name is mandatory", {
        position: "top-center",
      });
    } else if (email === "") {
      toast.warn("Email is mandatory", {
        position: "top-center",
      });
    } else if (mobile === "") {
      toast.warn("Mobile Number is mandatory", {
        position: "top-center",
      });
    } else if (email === "") {
      toast.warn("Password is mandatory", {
        position: "top-right",
      });
    } else if (email === "") {
      toast.warn("Confirm Password is mandatory", {
        position: "top-center",
      });
    } else if (password !== cpassword) {
      toast.warn("Passwword and Confirm Password did not match", {
        position: "top-center",
      });
    } else {
      const res = await fetch(
        "https://amazonclonebackend.onrender.com/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fname,
            mobile,
            email,
            password,
            cpassword,
          }),
        }
      );

      const data = await res.json();
      const { storedata, token } = data;
      const expirationDate = new Date(
        Date.now() + 30 * 60 * 1000
      ).toUTCString();
      document.cookie = `token=${token}; expires=${expirationDate}; path=/; secure`;
      // console.log(data);

      if (res.status === 422 || !storedata) {
        // alert("no data");

        toast.warn("Invalid details!", {
          position: "top-right",
        });
      } else {
        // alert("data sucessfully added");

        toast.success("Registered Successfully", {
          position: "top-center",
        });

        setUdata({
          ...udata,
          fname: "",
          email: "",
          mobile: "",
          password: "",
          cpassword: "",
        });
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
              <h1>Sign-Up</h1>
              <div className="form_data">
                <label>Name</label>
                <input
                  type="text"
                  onChange={addudata}
                  placeholder="Enter your Full Name"
                  name="fname"
                  id="name"
                  value={udata.fname}
                />
              </div>
              <div className="form_data">
                <label htmlFor="number">Mobile Number</label>
                <input
                  type="password"
                  onChange={addudata}
                  placeholder="Enter your mobile number"
                  name="mobile"
                  id="mnumber"
                  value={udata.mobile}
                />
              </div>
              <div className="form_data">
                <label>Email</label>
                <input
                  type="text"
                  onChange={addudata}
                  placeholder="Enter your Email Id"
                  name="email"
                  id="email"
                  value={udata.email}
                />
              </div>
              <div className="form_data">
                <label>Password</label>
                <input
                  type="password"
                  onChange={addudata}
                  placeholder="Atleast 6 characters"
                  name="password"
                  id="password"
                  value={udata.password}
                />
              </div>
              <div className="form_data">
                <label>Confirm Password</label>
                <input
                  type="password"
                  onChange={addudata}
                  name="cpassword"
                  id="cpassword"
                  value={udata.cpassword}
                />
              </div>
              <button className="signin_btn" onClick={senddata}>
                Register Yourself
              </button>
              <div className="signin_info">
                <p>Already have an account?</p>
                <NavLink to="/login">SignIn</NavLink>
              </div>
            </form>
          </div>
          <ToastContainer />
        </div>
      </section>
    </>
  );
};

export default Sign_up;
