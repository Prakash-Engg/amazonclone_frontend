import { React, useContext, useEffect } from "react";
import "./Navbar.css";
import SearchIcon from "@mui/icons-material/Search";
import { Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Avatar from "@mui/material/Avatar";
import { NavLink, useNavigate } from "react-router-dom";
import { LoginContext } from "../context/ContextProvider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import Rightheader from "./Rightheader";
import { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Cookies from "js-cookie";

const Navbar = () => {
  const { account, setAccount } = useContext(LoginContext); // is this by reference or by value

  const history = useNavigate();
  const cookieValue = Cookies.get("AmazonClonecookie");

  console.log(`line30 navbar ${cookieValue}`);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [text, setText] = useState("");
  console.log(text);
  const [liopen, setLiopen] = useState(true);

  const { products } = useSelector((state) => state.getproductsdata);

  const [dropen, setDropen] = useState(false);
  // console.log(account);
  // const cartCounter = account.carts.length;
  const getdetailvaliduser = async () => {
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

    if (res.status !== 201) {
      console.log("errror");
    } else {
      console.log("data valid");
      setAccount(data);
    }
  };

  const handleopen = () => {
    setDropen(true);
  };

  const handledrclose = () => {
    setDropen(false);
  };

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
    console.log(data);

    if (res.status !== 201) {
      console.log("errror");
    } else {
      console.log("data valid");
      toast.success("Logged Out", {
        position: "top-center",
      });

      setAccount(false);
      setAnchorEl(null);
      history("/");
    }
  };

  const getText = (textValue) => {
    setText(textValue);
    setLiopen(false);
  };

  const getorders = () => {
    history("/orders");
    setAnchorEl(null);
  };

  useEffect(() => {
    // why we are defining every function and variable before UseEffect
    getdetailvaliduser();
  }, []);

  console.log(account);

  return (
    <header>
      <nav>
        <div className="left">
          <IconButton className="hamburgur" onClick={handleopen}>
            <MenuIcon style={{ color: "#fff" }} />
          </IconButton>
          <Drawer open={dropen}>
            <Rightheader draclose={handledrclose} />
          </Drawer>
          <div className="navlogo">
            <NavLink to="/">
              <img src="./amazon_PNG25.png" alt="" />
            </NavLink>
          </div>
          <div className="nav_searchbaar">
            <input
              type="text"
              placeholder="Search your products"
              onChange={(e) => getText(e.target.value)}
              name=""
              id=""
              value={text}
            ></input>
            {/* // why not we use directly (e)=>setText(e.target.value)  inside of onChange*/}
            <div className="search_icon">
              <SearchIcon id="search" />
            </div>

            {/* Search filter */}

            {text && (
              <List className="extrasearch" hidden={liopen}>
                {products
                  .filter((product) =>
                    product.title.longTitle
                      .toLowerCase()
                      .includes(text.toLowerCase())
                  )
                  .map((product) => (
                    <ListItem>
                      <NavLink
                        to={`/getproductsone/${product.id}`}
                        onClick={() => {
                          setLiopen(true);
                          setText("");
                        }}
                      >
                        {product.title.longTitle}
                      </NavLink>
                    </ListItem>
                  ))}
              </List>
            )}
          </div>
        </div>
        <div className="right">
          {account ? (
            <></>
          ) : (
            <div className="nav_btn">
              <NavLink to="login">SignIn</NavLink>
            </div>
          )}
          <div className="cart_btn">
            {account ? (
              <NavLink to="buynow">
                <Badge badgeContent={account.carts.length} color="primary">
                  <ShoppingCartIcon id="icon" />
                </Badge>
              </NavLink>
            ) : (
              <NavLink to="login">
                <Badge badgeContent={0} color="primary">
                  <ShoppingCartIcon id="icon" />
                </Badge>
              </NavLink>
            )}

            <p>Cart</p>
          </div>

          {account ? (
            <Avatar
              className="avtar2"
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              {account.fname[0].toUpperCase()}
            </Avatar>
          ) : (
            <></>
          )}

          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose}>
              <NavLink
                to="/profile"
                style={{ textDecoration: "none", color: "black" }}
              >
                My account
              </NavLink>
            </MenuItem>
            <MenuItem onClick={getorders}>Your Orders</MenuItem>
            <MenuItem onClick={logoutUser}>
              <LogoutOutlinedIcon
                style={{ fontSize: "17px", marginRight: "4" }}
              />{" "}
              Logout
            </MenuItem>
          </Menu>
        </div>
      </nav>
      <ToastContainer />
    </header>
  );
};

export default Navbar;
