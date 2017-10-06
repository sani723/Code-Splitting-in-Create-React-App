import React, { Component } from 'react';

class Timer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      seconds: 0
    };

  }

  componentDidMount() {
    setInterval( () => {
      this.setState ({
        seconds: ++this.state.seconds
      });
    },1000);
  }

  render() {
    const counter = this.state.seconds;
    return (
      <div className="timer">
        <h1>{counter}</h1>
      </div>
    );
  }

}

export default Timer;
