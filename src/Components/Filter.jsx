import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import { FILTER_CRITERIA } from "../Redux/Actions/types";

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMenuClicked: false,
      id: "0",
      isOpen: false
    };

    this.gender = React.createRef();
    this.size = React.createRef();
    this.color = React.createRef();
    this.style = React.createRef();
  }

  handleClick = event => {
    let elementClicked = event.target.getAttribute("id");
    this.setState({
      id: elementClicked
    });
  };

  handleClickOutside = event => {
    if (
      this.gender.current &&
      this.state.id == "1" &&
      !this.gender.current.contains(event.target)
    ) {
      this.setState({
        id: "0"
      });
      return;
    } else if (
      this.size.current &&
      this.state.id == "2" &&
      !this.size.current.contains(event.target)
    ) {
      this.setState({
        id: "0"
      });
      return;
    } else if (
      this.color.current &&
      this.state.id == "3" &&
      !this.color.current.contains(event.target)
    ) {
      this.setState({
        id: "0"
      });
      return;
    } else if (
      this.style.current &&
      this.state.id == "4" &&
      !this.style.current.contains(event.target)
    ) {
      this.setState({
        id: "0"
      });
      return;
    } else {
      return;
    }
  };
  genderFilter = event => {
    event.target.checked
      ? this.props.addGender(event.target.value, true)
      : this.props.addGender(event.target.value, false);
  };
  sizeFilter = event => {
    event.target.checked
      ? this.props.addSize(event.target.value, true)
      : this.props.addSize(event.target.value, false);
  };
  colorFilter = event => {
    event.target.checked
      ? this.props.addColor(event.target.value, true)
      : this.props.addColor(event.target.value, false);
  };
  styleFilter = event => {
    event.target.checked
      ? this.props.addStyle(event.target.value, true)
      : this.props.addStyle(event.target.value, false);
  };

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  render() {
    const sizes = [2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8];
    const colors = ["black", "white", "red"];
    const sports = ["Lifestyle", "Walking", "Running"];
    const price = ["20 - 40", "40 - 60", "60 - 80"];
    const onHoverStyle = {
      backgroundColor: "red"
    };
    return (
      <div className="filter_cart">
        <ul>
          <li className="head_menu" id="1">
            {" "}
            <div ref={this.gender}>
              <span onClick={this.handleClick} id="1">
                {" "}
                Gender{" "}
              </span>
              <ul
                id="1"
                className={
                  "sub_menu_on" +
                  " " +
                  (this.state.id === "1" ? " " : "sub_menu_off")
                }
              >
                <li>
                  {" "}
                  <label name="gender">
                    <input
                      type="checkbox"
                      name="Men"
                      className="check_box"
                      title="men"
                      value="men"
                      onChange={this.genderFilter}
                    />
                  </label>
                  <span> Men</span>
                </li>
                <li>
                  {" "}
                  <label name="gender">
                    <input
                      type="checkbox"
                      name="women"
                      className="check_box"
                      title="women"
                      value="women"
                      onChange={this.genderFilter}
                    />{" "}
                  </label>
                  <span> Women</span>
                </li>
              </ul>
            </div>
          </li>
          <li className="head_menu" id="2">
            {" "}
            <div ref={this.color}>
              <span onClick={this.handleClick} id="3">
                {" "}
                Color{" "}
              </span>{" "}
              <ul
                id="3"
                className={
                  "sub_menu_on" +
                  " " +
                  (this.state.id == "3" ? "" : "sub_menu_off")
                }
              >
                {colors.map((color, index) => (
                  <li ref={index}>
                    {" "}
                    <label name={color} value={color}>
                      <input
                        type="checkbox"
                        name={color}
                        className="check_box"
                        title={color}
                        value={color}
                        onChange={this.colorFilter}
                      />
                    </label>{" "}
                    <span> {color}</span>
                  </li>
                ))}
              </ul>{" "}
            </div>
          </li>
          <li className="head_menu" id="3">
            {" "}
            <div ref={this.style}>
              <span onClick={this.handleClick} id="4">
                {" "}
                Style{" "}
              </span>
              <ul
                id="4"
                className={
                  "sub_menu_on" +
                  " " +
                  (this.state.id == "4" ? "" : "sub_menu_off")
                }
              >
                {" "}
                {sports.map((style, index) => (
                  <li ref={index}>
                    {" "}
                    <label name={style}>
                      <input
                        type="checkbox"
                        name={style}
                        className="check_box"
                        title={style}
                        value={style}
                        onChange={this.styleFilter}
                      />
                    </label>
                    <span> {style} </span>{" "}
                  </li>
                ))}{" "}
              </ul>{" "}
            </div>{" "}
          </li>
        </ul>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addGender: (criteria, isItSelected) => {
      dispatch({
        type: FILTER_CRITERIA.FILTER_PRODUCTS_BY_GENDER,
        value: criteria,
        indice: isItSelected
      });
    },
    addColor: (criteria, isItSelected) => {
      dispatch({
        type: FILTER_CRITERIA.FILTER_PRODUCTS_BY_COLOR,
        value: criteria,
        indice: isItSelected
      });
    },
    addStyle: (criteria, isItSelected) => {
      dispatch({
        type: FILTER_CRITERIA.FILTER_PRODUCTS_BY_STYLE,
        value: criteria,
        indice: isItSelected
      });
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Filter);

/********* il faut mettre tt cas dans le component intelligent */
