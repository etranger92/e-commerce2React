import React from "react";
import { FaShoppingBag } from "react-icons/fa";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = ({ trolley }) => {
  {
    return (
      <div className="nav_container">
        <nav>
          <ul className="nav_bar">
            <li>
              {" "}
              <Link to={"/"}> HOME</Link>
            </li>
            <li>
              {" "}
              <Link to={"../Components/FinalCart"}> FINAL-CART</Link>
            </li>
          </ul>
        </nav>
        <div>
          <Link to={"../Components/FinalCart"}>
            <span className="icon_bag">
              {" "}
              <FaShoppingBag style={{ color: "black" }} />{" "}
            </span>
          </Link>
          <span>
            {" "}
            {trolley.payload.reduce(
              (accumulator, currentValue) =>
                Number(accumulator) + Number(currentValue.quantitySelected),
              0
            )}
          </span>
        </div>
      </div>
    );
  }
};

const mapStateToProps = state => {
  return {
    trolley: state.trolley
  };
};

export default connect(mapStateToProps)(Navbar);
