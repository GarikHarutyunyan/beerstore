import React, { Component } from "react";
import Home from './pages/home/home.jsx';
import Single from './pages/single/single.jsx';
import Cart from './pages/cart/cart.jsx';
import Wallpaper from './wallpaper.jpg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class App extends Component {
  state ={
    cartN: localStorage.getItem('Beers') ? JSON.parse(localStorage.getItem('Beers')).length : 0,
    beerName: "",
    beerTag: ""
  }

  changeCartN = () => {
    this.setState({
      cartN: JSON.parse(localStorage.getItem('Beers')).length
    })
  }

  changeMainText = (name, tag) => {
    this.setState({
      beerName: name,
      beerTag: tag
    })
  }

  render() {
    return (
      <Router>
          <nav className="navBg" style={{backgroundImage: 'url(' + Wallpaper + ')'}}>
            <div className='w-50 pt-2 text-right mr-auto ml-auto'>
              <Link className="muted" to="/">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path className="path-fill" d="M21 13v10h-6v-6h-6v6h-6v-10h-3l12-12 12 12h-3zm-1-5.907v-5.093h-3v2.093l3 3z"/>
                </svg>
              </Link>
              <Link className="muted ml-1" to="/shopping-cart">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path className="path-fill" d="M10 19.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5zm3.5-1.5c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm1.336-5l1.977-7h-16.813l2.938 7h11.898zm4.969-10l-3.432 12h-12.597l.839 2h13.239l3.474-12h1.929l.743-2h-4.195z"/>
                </svg>
                <strong className="path-fill">
                  {this.state.cartN === 0 ? 'Empty':  this.state.cartN + ' items'}
                </strong>
              </Link>
            </div>
            <div style={{position: 'absolute', bottom:'0', left:'25%'}} className='w-50 mb-5 text-center mr-auto ml-auto'>
              <Switch>
                <Route path="/single-beer">
                  <h5 style={{color: 'white'}}>{this.state.beerTag}</h5>
                  <h1 style={{color: 'white'}}><strong>{this.state.beerName}</strong></h1>
                </Route>
                <Route path="/shopping-cart">
                  <h5 style={{color: 'white'}}>Review your</h5>
                  <h1 style={{color: 'white'}}><strong>Beer Cart</strong></h1>
                </Route>
                <Route path="/">
                  <h5 style={{color: 'white'}}>A very harm welcome to our</h5>
                  <h1 style={{color: 'white'}}><strong>Beer Shop</strong></h1>
                </Route>
              </Switch>
            </div>
          </nav>
          <Switch>
            <Route path="/single-beer/:id" render={(props) => <Single cBack={this.changeMainText} onAdd={this.changeCartN} {...props} /> } >
            </Route>
            <Route path="/shopping-cart">
              <Cart onRemove={this.changeCartN}/>
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
      </Router>
    );
  }
}

export default App;