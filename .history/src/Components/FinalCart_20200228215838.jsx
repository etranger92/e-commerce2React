import React from "react";
import { Component } from "react";
//import { privateDecrypt } from "crypto";
import { TROLLEY } from "../Redux/Actions/types";
import { Link } from "react-router-dom";
//import { StripeProvider } from "react-stripe-elements";
import axios from "axios";
//import form from "../Components/stripe/Form";
import StripeCheckout from "react-stripe-checkout";

//to your dispatchFetch

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
//to connect to your redux store
import { connect } from "react-redux";

// To read your state
import {
  updateQuantityProducts,
} from "../Redux/Actions/fetchProducts";

class FinalCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      bag: null,
      trolley: [],
      id: ""
    };
  }

  componentWillMount() {
    this.setState({
      trolley: this.props.trolley.payload
    });
  }
  componentDidMount() {
    // I add to the reducer (trolley) the new product.
    if (this.props.location.state) {
      this.props.addProductToTrolley(this.props.location.state);
    }
    // I keep tract of my trolley in my
    // this.setState({ trolley: this.props.trolley.payload });
    this.calculeTotalPrice();
  }
  handleQuantityOnChange = event => {
    let id = event.target.getAttribute("id");
    let quantity = event.target.value;
    this.props.updateQuantityProductsTrolley(id, quantity);
    // I keep tract of the change of quantities by adding it as key/value to my array Cart.
    let trolley = Object.assign([], this.props.trolley.payload);
    let productIndex = trolley.findIndex(element => element.id == id);
    trolley[productIndex].quantitySelected = quantity;
    // Init totalPrice
    this.calculeTotalPrice();
  };
  updateDataBase = () => {
    this.props.trolley.payload.map(item => {
      var quantityRemained = item.quantityAvailable - item.quantitySelected;
      this.props.updateQuantity(item.id, quantityRemained);
    });
  };
  calculeTotalPrice = () => {
    var totalPrice = this.props.trolley.payload.reduce(
      (accumulateur, currentValue) =>
        accumulateur + currentValue.price * currentValue.quantitySelected,
      0
    );
    return totalPrice;
  };
  handleClick = () => {
    this.setState({ isOpen: true });
  };
  handleToken = async (token, addresses) => {
    const product = {
      name: "name",
      price: this.calculeTotalPrice(),
      description: "description of the items"
    };
    const sendDatas = await axios.post(
      "http://localhost:5000/.netlify/functions/server/transactions/charge",
      { token, product }
    );

    const { status } = sendDatas.data;
    if (status === "success") {

      this.setState({
        isPaymentAccepted: true
      });
      this.props.emptyTrolley();
    } else {
      console.log("unsuccess");
    }
  };

  renderHtml = () => {
    return (
      <div className="purchase_success">
        <h3> Thank you for your purchase. </h3>
        <h4 style={{ fontStyle: "italic", color: "grey" }}>
          {" "}
          You will receive soon a confirmation on your email provided
        </h4>
        <Link
          to={{
            pathname: "/"
          }}
        >
          {" "}
          Back main page{" "}
        </Link>
      </div>
    );
  };
  render() {
    return (
      <section className="final_cart">
        {this.state.isPaymentAccepted && this.renderHtml()}
        {!this.props.trolley.payload.length > 0 && (
          <div
            className="empty_bag"
            style={this.state.isPaymentAccepted && { display: "none" }}
          >
            {" "}
            <h1> Your bag is empty. </h1>
            <Link
              to={{
                pathname: "/"
              }}
            >
              <span> Back to the cart</span>{" "}
            </Link>{" "}
          </div>
        )}
        {this.props.trolley.payload.map((product, index) => (
          <div className="product_review_content" href={index}>
            <div className="main_sub_review">
              <h3>
                {" "}
                YOUR BAG <span>1 item</span>{" "}
              </h3>{" "}
              <div className="sub_review_2">
                {" "}
                <div>
                  <img src={product.images[0]} />{" "}
                </div>
                <ul>
                  <li>{product.name} </li>
                  <li>
                    {" "}
                    Qty{" "}
                    <select
                      defaultValue={product.quantitySelected}
                      id={product.id}
                      onChange={this.handleQuantityOnChange}
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                  </li>
                  <li>{product.color}</li>
                  <li>
                    Prix:
                    {product.quantitySelected * product.price}
                  </li>
                  <li>
                    {" "}
                    <button
                      onClick={() =>
                        this.props.removeProductFromTrolley(product.id)
                      }
                    >
                      Remove
                    </button>
                  </li>
                </ul>
              </div>
              <div className="sub_review_3">
                <StripeCheckout
                  className="btn_stripe"
                  stripeKey="pk_test_QBg4f2482dyWJX85c8roBgqz"
                  amount={this.calculeTotalPrice() * 100}
                  currency="gbp"
                  name="You details"
                  billingAddress
                  shippingAddress
                  token={this.handleToken}
                />
                <span>Or</span>
                <button className="btn_cart">PAYPAL CHECKOUT</button>
              </div>
            </div>
          </div>
        ))}
        <div
          className="product_summary"
          style={this.state.isPaymentAccepted && { display: "none" }}
        >
          <div>
            {/*  
            <Link
              to={{
                pathname: "../Components/stripe/form",
                state: {
                  price: this.calculeTotalPrice()
                }
              }}
            > 
            <button className="btn_cart" onClick={this.updateDataBase}>
              {" "}*/}
            <StripeCheckout
              className="btn_stripe"
              stripeKey="pk_test_QBg4f2482dyWJX85c8roBgqz"
              amount= {this.calculeTotalPrice() * 100}
              name="You details"
              billingAddress
              shippingAddress
              token={this.handleToken}
            />
            {/*
            </button>
             </Link > */}
            <span>Or</span>
            <button className="btn_cart">PAYPAL CHECKOUT</button>
          </div>
          <div>
            <div>
              <h1> ORDER SUMMARY </h1>
            </div>
            <div className="sub_product_summary">
              <div>
                <h3>Subtotal: {this.calculeTotalPrice()} Dollars</h3>
              </div>
              <h3>
                Delivery:
                <span>FREE</span>
              </h3>
              <div>
                <h3>
                  {" "}
                  {/* I did try to not repeat myself for performence matter but this.state gives me an issue when component renders for the first time, as it's async. */}
                  Total: <span> {this.calculeTotalPrice()} Dollars</span>
                </h3>
                <span>(Inclusive of tax)</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
const mapStateToProps = state => {
  return {
    trolley: state.trolley
  };
};
const mapDispatchToProps = dispatch => {
  return {
    addProductToTrolley: id => {
      dispatch({
        type: TROLLEY.ADD_PRODUCT_TROLLEY,
        payload: id,
        indice: true
      });
    },
    removeProductFromTrolley: id => {
      dispatch({
        type: TROLLEY.REMOVE_PRODUCT_TROLLEY,
        id: id,
        indice: false
      });
    },
    emptyTrolley: () => {
      dispatch({
        type: TROLLEY.EMPTY_TROLLEY
      });
    },
    updateQuantityProductsTrolley: (id, value) => {
      dispatch({ type: TROLLEY.UPDATE_QUANTITY });
    },
    updateQuantity: (id, quantity) =>{ 
      dispatch(updateQuantityProducts(id, quantity))
console.log("hi")
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FinalCart);
