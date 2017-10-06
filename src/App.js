import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Loadable from 'react-loadable';
import Loading from './components/ui/Loading';

class App extends Component {
  render() {

    const AsyncTimer = Loadable({
      loader: () => import('./components/container/Timer'),
      loading: Loading
    });

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <AsyncTimer />
        
      </div>
    );
  }
}

export default App;
