import React from "react";
import { Component } from "react";
import { Elements } from "react-stripe-elements";
import InjectedCheckoutForm from "../stripe/CheckoutForm";

class MyStoreCheckOut extends Component {
  state = {};
  render() {
    return (
      <>
        <Elements>
          <InjectedCheckoutForm price={this.props.price} />
        </Elements>
      </>
    );
  }
}

export default MyStoreCheckOut;
