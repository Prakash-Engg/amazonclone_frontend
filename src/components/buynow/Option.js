import { React, useContext } from "react";
import "./buynow.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoginContext } from "../context/ContextProvider";
import Cookies from "js-cookie";

const Option = (props) => {
  const { account, setAccount } = useContext(LoginContext);

  const cookieValue = Cookies.get("AmazonClonecookie");

  const removeItem = async (req, res) => {
    try {
      const res = await fetch(
        `https://amazonclonebackend.onrender.com/removeItem/${props.deletedata}`,
        {
          method: "DELETE",
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

      if (res.status === 400 || !data) {
        console.log("error");
      } else {
        console.log("Item deleted");
        setAccount(data);
        props.get();
        toast.success("Item removed", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <div className="add_remove_select">
      <select>
        <option value="1">1</option>
        <option value="1">2</option>
        <option value="1">3</option>
        <option value="1">4</option>
      </select>
      <p
        style={{ cursor: "pointer" }}
        onClick={() => removeItem(props.deletedata)}
      >
        Delete
      </p>
      <span>|</span>
      <p className="forremovemedia">Save for Later</p>
      <span>|</span>
      <p className="forremovemedia">See more lke this</p>
      <ToastContainer />
    </div>
  );
};

export default Option;
