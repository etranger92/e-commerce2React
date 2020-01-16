import React from "react";
import { Component } from "react";
import { StripeProvider, Elements } from "react-stripe-elements";
import MyStoreCheckout from "./MyStoreCheckout";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <StripeProvider apiKey="pk_test_QBg4f2482dyWJX85c8roBgqz">
          <Elements>
            <MyStoreCheckout price={this.props.location.state.price} />
          </Elements>
        </StripeProvider>
      </>
    );
  }
}

export default Form;
