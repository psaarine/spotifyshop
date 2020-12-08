import './sass/style.css';
import React, { Component } from 'react';
import Main from "./components/main";
import GlobalState from "./components/state";
import { Token } from "./components/token";
import { ShopContext } from "./components/shopContext";
import { Shop } from "./components/shop";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Shoplink } from "./components/shoplink";
import { Category } from "./components/category";
import { Playlist } from "./components/playlist";
import { Index } from "./components/index";
import { Album } from "./components/album";

class App extends Component {
  state = {  }
  render() { 
    return (
      <div className="App">
        <Router>
        <Token>
        <GlobalState>
        <ShopContext>

        
          <Shoplink />
          <Switch>
            <Route exact path="/" component={Index} />
            <Route exact path="/main" component={Main}/>
            <Route path="/shop" component={Shop}/>
            <Route path="/categories/:id" render={(props) => <Category data={props} />}/>
            <Route path="/playlists/:id" render={(props) => <Playlist data={props}/>}/>
            <Route path="/album/:id" render={(props) => <Album data={props}/>}/>
          </Switch>

        </ShopContext>
        </GlobalState>
        </Token>
        </Router>
      </div>
     );
  }
}


export default App;
