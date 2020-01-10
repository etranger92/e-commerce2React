import React from "react";
import { connect } from "react-redux";
import { MdLocationOn } from "react-icons/md";
import { FaPhone } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";

const Footer = ({ products }) => {
  return (
    <div className="footer">
      <div className="footer_top">
        <div>
          <i style={{ fontSize: "24px" }}>
            {" "}
            <MdLocationOn />
          </i>
          <p> Location: Birmingham England</p>
        </div>
        <div>
          <i style={{ fontSize: "24px" }}>
            <FaPhone />
          </i>
          <p> +44(0) 7462 63 0961</p>
        </div>
        <div>
          <i style={{ fontSize: "24px" }}>
            <AiOutlineMail />
          </i>
          <p> j.sba@outlook.com</p>
        </div>
      </div>
      <div className="footer_bottom">
        <span> © 2020- created by Nabil </span>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    products: state.products
  };
};
export default connect(mapStateToProps)(Footer);
