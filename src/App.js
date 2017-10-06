import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import AsyncLoader from './components/ui/AsyncLoader';

class App extends Component {
  render() {

    const AsyncTimer = AsyncLoader({
      loader: () => import('./components/container/Timer'),
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
