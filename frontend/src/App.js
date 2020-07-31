import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import './App.css';

//partials
import Header from "./partials/header";
import Aside from './partials/aside';
import Footer from './partials/footer';

// screens
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import ProductsScreen from './screens/ProductsScreen';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/signinScreen';
import SignupScreen from './screens/SignupScreen';

//redux


//icons


function App() {
  // verify user signin

  return (
    <BrowserRouter>
      <div className="grid-container">
        <Header></Header>
        <Aside></Aside>
        <main className="main">
          <div className="content">
            <Route path="/signin" component={SigninScreen}></Route>
            <Route path="/signup" component={SignupScreen}></Route>
            <Route path="/products" component={ProductsScreen}></Route>
            <Route path="/product/:id" component={ProductScreen}></Route>
            <Route path="/cart/:id?" component={CartScreen}></Route>
            <Route path="/" exact={true} component={HomeScreen}></Route>
          </div>
        </main>
        <Footer></Footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
