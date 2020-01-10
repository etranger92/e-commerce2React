import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import Filter from "./Filter";
import Products from "./Products";
//Import the middleWare for the fetch from redux.
import { fetchProducts } from "../Redux/Actions/fetchProducts";
//to your dispatchFetch
import { bindActionCreators } from "redux";
import LoadingSpinner from "./LoadingSpinner";
class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      criterias: ""
    };
  }

  shouldComponentRender() {
    const { pending } = this.props.products;
    if (pending === false && !(this.props.products.products.length > 0)) {
      return false;
    } else {
      return true;
    }
  }

  componentDidMount() {
    const { fetchProducts } = this.props;
    fetchProducts();
    // If handled by react install axios, import and use this.
    /*
  axios
    .get("http://localhost:5000/products/shoes")
    .then(response => {
      const products = response.data;
      this.setState({
        products: response.data
      });
    })
    .catch(function(error) {
      console.log(error);
    });
    */
  }
  render() {
    const { products, error, pending } = this.props.products;

    if (!this.shouldComponentRender()) return <LoadingSpinner />;
    return (
      <section className="products_container">
        <Filter />
        {!this.shouldComponentRender() ? (
          <LoadingSpinner />
        ) : (
          <Products products={products} filterCart={this.props.filterCart} />
        )}
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.products,
    filterCart: state.filter
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchProducts
    },
    dispatch
  );

/*other way
const mapDispatchToProps = dispatch => {
  return {
    fetchProducts: () => dispatch(fetchProducts())
  };
};
*/
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);
