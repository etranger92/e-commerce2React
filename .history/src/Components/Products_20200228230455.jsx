import React from "react";
import { Component } from "react";
//For the fetch from react import axios need to install it before.

import { connect } from "react-redux";
//to your dispatchFetch
import { bindActionCreators } from "redux";

import LoadingSpinner from "./LoadingSpinner";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { IoIosBackspace } from "react-icons/io";

import spyder0 from "../pictures/shoes/spyders/spyder0.jpg";
import spyder00 from "../pictures/shoes/spyders/spyder00.jpg";
import spyder01 from "../pictures/shoes/spyders/spyder01.jpg";

import spyder1 from "../pictures/shoes/spyders/spyder1.jpg";
import spyder10 from "../pictures/shoes/spyders/spyder10.jpg";
import spyder11 from "../pictures/shoes/spyders/spyder11.jpg";

import spyder2 from "../pictures/shoes/spyders/spyder2.jpg";
import spyder20 from "../pictures/shoes/spyders/spyder20.jpg";
import spyder21 from "../pictures/shoes/spyders/spyder21.jpg";

import bird0 from "../pictures/shoes/birds/bird0.jpg";
import bird1 from "../pictures/shoes/birds/bird1.jpg";
import bird2 from "../pictures/shoes/birds/bird2.jpg";
import eagle0 from "../pictures/shoes/eagles/eagle0.jpg";
import eagle1 from "../pictures/shoes/eagles/eagle1.jpg";
import eagle2 from "../pictures/shoes/eagles/eagle2.jpg";
import { SSL_OP_CISCO_ANYCONNECT } from "constants";
import { icons } from "react-icons/lib/cjs";

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: "",
      picDisplayed: "",
      onHover: false
    };
    this.imgDisplayed = React.createRef();
  }

  static getDerivedStateFromProps(props, state) {
    if (props.products !== state.products) {
      return {
        products: props.products
      };
    }
    return null;
  }

  getValue = value => (typeof value === "string" ? value.toUpperCase() : value);

  // Il save les keys des filters.
  // Il iterate over the array.
  //Il iterate sur toutes les keyfs
  // si le filter.key est vide il renvoit true et passe a l iteration de l'autre clef.
  // Des qu'il trouve une clef avec une value.

  filterCart = (array, filters) => {
    const filterKeys = Object.keys(filters);
    return array.filter(item => {
      return filterKeys.every(key => {
        if (!filters[key].length) return true;
        return filters[key].find(
          filter => this.getValue(filter) === this.getValue(item[key])
        );
      });
    });
  };

  handleHover = (id, pic) => {
    this.setState({
      img: pic,
      elementID: id,
      onHover: !this.state.onHover
    });
  };
  handleMouseOut = id => {
    this.setState({
      onHover: !this.state.onHover
    });
  };

  render() {
    const images = {
      spyder1: [spyder0, spyder00, spyder01],
      spyder2: [spyder1, spyder10, spyder11],
      spyder3: [spyder2, spyder20, spyder21],
      bird1: [bird0],
      bird2: [bird1],
      bird3: [bird2],
      eagle1: [eagle0],
      eagle2: [eagle1],
      eagle3: [eagle2]
    };

    return (
      <div className="products">
        {this.filterCart(this.props.products, this.props.filterCart).map(
          (product, index) => {
            return (
              <article href={product._id} className="shoes_gallery">
                <div className="pics_shoes">
                  <div>
                    <Link
                      to={{
                        pathname: "../Components/ProductSelected",
                        state: {
                          id: product._id,
                          name: product.name,
                          color: product.color,
                          quantity: product.quantityAvailable,
                          price: product.price,
                          gender: product.gender,
                          images: images[product.name],
                          index: ""
                        }
                      }}
                    >
                      {" "}
                      <img
                        src={
                          this.state.onHover &&
                          this.state.elementID == product._id
                            ? this.state.img
                            : images[product.name][0]
                        }
                      />{" "}
                    </Link>
                  </div>
                  <ul>
                    {images[product.name].map((sibiling, index) => (
                      <li href={index}>
                        {" "}
                        <img
                          src={images[product.name][index]}
                          onMouseOver={() =>
                            this.handleHover(product._id, sibiling)
                          }
                          onMouseOut={() => this.handleMouseOut(product._id)}
                        />{" "}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="description_shoes">
                  <ul>
                    <li> {product.name} </li>
                    <li> {product.color} </li>
                    <li> {product.gender} </li>
                    <li> {product.style}</li>

                    <li> description </li>
                    <li>
                      {" "}
                      {product.quantityAvailable > 0 ? (
                        <span>
                          {" "}
                          In stock{" "}
                          <icons style={{ color: "green" }}>
                            {" "}
                            <FaCheck />{" "}
                          </icons>{" "}
                        </span>
                      ) : (
                        <span>
                          {" "}
                          Currently out of stock{" "}
                          <icons style={{ color: "red" }}>
                            {" "}
                            <IoIosBackspace />{" "}
                          </icons>{" "}
                        </span>
                      )}
                    </li>
                  </ul>
                  <Link
                    to={{
                      pathname: "../Components/ProductSelected",
                      state: {
                        id: product._id,
                        name: product.name,
                        color: product.color,
                        quantity: product.quantityAvailable,
                        price: product.price,
                        gender: product.gender,
                        indexImg: 0,
                        images: images[product.name]
                      }
                    }}
                  >
                    <button className="btn"> View </button>
                  </Link>
                </div>
              </article>
            );
          }
        )}
      </div>
    );
  }
}

export default Products;
