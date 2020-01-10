import React from "react";
import { Component } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { TROLLEY } from "../Redux/Actions/types";

import spyder0 from "../pictures/shoes/spyders/spyder0.jpg";
//sibiling
import spyder00 from "../pictures/shoes/spyders/spyder00.jpg";
import spyder01 from "../pictures/shoes/spyders/spyder00.jpg";

import spyder1 from "../pictures/shoes/spyders/spyder1.jpg";
//sibiling
import spyder10 from "../pictures/shoes/spyders/spyder10.jpg";
import spyder11 from "../pictures/shoes/spyders/spyder11.jpg";

import spyder2 from "../pictures/shoes/spyders/spyder2.jpg";
//sibiling
import spyder20 from "../pictures/shoes/spyders/spyder20.jpg";
import spyder21 from "../pictures/shoes/spyders/spyder21.jpg";

import bird0 from "../pictures/shoes/birds/bird0.jpg";
import bird1 from "../pictures/shoes/birds/bird1.jpg";
import bird2 from "../pictures/shoes/birds/bird2.jpg";

import eagle0 from "../pictures/shoes/eagles/eagle0.jpg";
import eagle1 from "../pictures/shoes/eagles/eagle1.jpg";
import eagle2 from "../pictures/shoes/eagles/eagle2.jpg";
import { connect } from "react-redux";

class ProductSelected extends Component {
  constructor(props) {
    super(props);
    this.state = {
      click: false
    };
  }
  componentDidMount() {
    const {
      id,
      name,
      color,
      quantity,
      price,
      gender
    } = this.props.location.state;
    const { fetchProducts } = this.props;
  }
  preventDefaultClick = event => {
    event.preventDefault();
    this.setState({
      click: true
    });
  };
  render() {
    const { products } = this.props.products;
    const {
      id,
      name,
      color,
      quantity,
      price,
      gender,
      images,
      indexImg
    } = this.props.location.state;

    const mystyle = {
      position: "absolute",
      bottom: "2px",
      display: "flex",
      flexDirection: "column",
      marginLeft: "50%",
      transform: "translateX(-50%)",
      width: "100%"
    };

    return (
      <section className="product_selected_contenant">
        <div className="pic_pro_selected">
          {" "}
          <img src={indexImg ? images[indexImg] : images[0]} />{" "}
        </div>
        <div className="description_pro_selected">
          <div className="review_clients">
            <div>
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star"></span>
            </div>
            <a> Read all reviews</a>
          </div>

          <ul>
            <li> {gender}</li>
            <li> {name} </li>
            <li> {price}$ </li>
            <li> {!quantity && "Currently out of stock"} </li>
          </ul>
          <div className="sibiling_pro_selected">
            <h1>AVAILABLE COLOURS</h1>
          </div>
          <Link
            to={{
              pathname: "../Components/FinalCart",
              state: {
                id: id,
                name: name,
                price: price,
                gender: gender,
                color: color,
                quantitySelected: 1,
                quantityAvailable: quantity,
                images
              }
            }}
          >
            <button
              className="btn"
              onClick={e => !quantity && this.preventDefaultClick(e)}
            >
              {" "}
              Buy
            </button>
          </Link>
          {this.state.click && (
            <div style={mystyle}>
              {" "}
              <span style={{ fontStyle: "italic" }}>
                {" "}
                Sorry, you cannot buy an item out of stock
              </span>{" "}
              <Link
                to={{
                  pathname: "/"
                }}
              >
                <span> Back to the cart</span>{" "}
              </Link>
            </div>
          )}
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.products,
    bag: state.bag
  };
};

export default connect(mapStateToProps)(ProductSelected);
