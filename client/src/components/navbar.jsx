import React,{ useContext} from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "phosphor-react";
import "./navbar.css";
import { GiCakeSlice } from "react-icons/gi";
import { ShopContext } from "../context/shop-context";

export const Navbar = () => {
  const {getbillid} = useContext(ShopContext);
  return (
    <div className="navbar">
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
