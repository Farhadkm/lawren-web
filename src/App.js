import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch, BrowserRouter, withRouter } from "react-router-dom";
import "./App.css";
import { Provider } from "react-redux";
import store, { persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react'
import Home from './containers/Home/Home';
import BotCreator from './containers/BotCreator/BotCreator';
import Header from './components/Header/Header';
import Bot from './containers/Bot/Bot';

class App extends Component {

  render() {

    const routes = (
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/bot-creator' exact component={BotCreator} />
        <Route path='/bot' exact component={Bot} />
      </Switch>)


    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <BrowserRouter>
            <div className='App'>
              <Header />
              <div style={{ paddingTop: 50 }}>
                {routes}
              </div>
            </div>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    );
  }



}

export default App;
