import React, { Component } from "react";

import {
  //CardElement,
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  injectStripe,
  ReactStripeElements,
  AddressSection
} from "react-stripe-elements";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

const createOptions = () => {
  return {
    style: {
      base: {
        fontSize: "16px",
        color: "#424770",
        fontFamily: "Open Sans, sans-serif",
        letterSpacing: "0.025em",
        "::placeholder": {
          color: "#aab7c4"
        }
      },
      invalid: {
        color: "#c23d4b"
      }
    }
  };
};

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: ""
    };
  }

  handleChange = ({ error }) => {
    if (error) {
      this.setState({ errorMessage: error.message });
    }
  };
  handleSubmit = async e => {
    //Can use try catch .
    e.preventDefault();
    let price = this.props.price;
    let token = await this.props.stripe.createToken({
      address_city: "your mother"
    });
    if (token) {
      axios
        .post("/.netlify/functions/server/transactions/charge", {
          token: token.token,
          amount: price * 100
        })
        .then(response => {
          console.log(token, "bang");
        })
        .catch(function(error) {
          console.log(error);
        });
    } else {
      console.log("Error with your token");
    }
  };

  checkEntry = event => {
    const regex = /^[a-zA-Z0-9.-\/@ ]+$/;
    let typeEntry = event.target.getAttribute("type");
    let entry = event.target.value;
    let isValid = regex.test(entry);
    let errorMess = ["Try to use only characters such: letters and numbers."];

    if (!isValid) {
      this.setState({
        errorMessage: errorMess[0]
      });
    }
  };
  deleteErrorMessage = () => {
    this.setState({
      errorMessage: ""
    });
  };

  render() {
    const buttonPayStyle = {
      padding: "0.5rem 2rem 0.5rem 2rem",
      fontSize: "0.7rem"
    };

    return (
      <div className="form_container_stripe">
        <form className="checkout" onSubmit={this.handleSubmit}>
          <h3>Price: {this.props.price}</h3>
          <div className="split-form">
            <label>Card number </label>
            <CardNumberElement
              {...createOptions()}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label>Expiration date </label>
            <CardExpiryElement
              {...createOptions()}
              onChange={this.handleChange}
            />
          </div>
          <div className="split-form">
            <label>CVC </label>
            <CardCVCElement {...createOptions()} onChange={this.handleChange} />
          </div>
          <div className="address_section">
            <div>
              <label>Address</label>
              <input
                onBlur={this.checkEntry}
                onFocus={this.deleteErrorMessage}
                style={{ width: "10vw" }}
                name="address"
                type="text"
                placeholder="50 benton road"
                className="StripeElement"
                required
              />
            </div>
            <div>
              <label>Postal code</label>
              <input
                onBlur={this.checkEntry}
                onFocus={this.deleteErrorMessage}
                style={{ width: "10vw" }}
                name="postcode"
                type="text"
                placeholder="94115"
                className="StripeElement"
                required
              />
            </div>
          </div>
          <div className="error" role="alert">
            {this.state.errorMessage}
          </div>
          <div style={{ textAlign: "center" }}>
            <input
              name="submit"
              type="submit"
              className="StripeElement"
              required
            />
          </div>
        </form>
      </div>
    );
  }
}

//Wrap with inject your form for the token.
export default injectStripe(CheckoutForm);
// Import CardElement from "react-stripe-checkout"
//  <CardElement onChange={this.handleChange} {...createOptions()} />
/*
Directly design
<StripeCheckout
  stripeKey="pk_test_4TbuO6qAW2XPuce1Q6ywrGP200NrDZ2233"
  // token={handleToken}
  //amount={product.price * 100}
  name="You details"
  billingAddress
  shippingAddress
/>;
*/
