import React from "react";
import { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./Components/Home";
import FinalCart from "./Components/FinalCart";
import ProductSelected from "./Components/ProductSelected";
import Navbar from "./Components/Nav";
import Footer from "./Components/Footer";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Route exact path="/" component={Home} />{" "}
      <Route path="/Components/FinalCart" component={FinalCart} />{" "}
      <Route path="/Components/ProductSelected" component={ProductSelected} />{" "}
      <Footer />
    </BrowserRouter>
  );
}

export default App;
