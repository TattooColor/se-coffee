import React,{ useContext} from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "phosphor-react";
import "./navbar.css";
import { GiCakeSlice } from "react-icons/gi";
import { ShopContext } from "../context/shop-context";
import  Peter  from "../assets/products/peter.png"
export const Navbar = () => {
  return (
    
    <div className="navbar">
      <img style={{ width: 80, height: 80 }} src={Peter} alt="React Logo" />
      <div className="store">
      

        <Link to="/store"> 
          <GiCakeSlice size={32} color="white"/>
        </Link>
      </div>
      <div className="links">
        <Link to="/"> Shop </Link>
        <Link to="/coffee"> Coffee </Link>
        <Link to="/tea"> Tea </Link>
        <Link to="/soda"> Soda </Link>
        <Link to="/cart">
          <ShoppingCart size={32} />
        </Link>
      </div>
    </div>
  );
};
