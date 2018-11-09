import React, { Component } from "react";
import TimerType from "./TimerType";

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: 0,
      initialSeconds: "",
      timerIsRun: false,
      timerType: {
        hours: true,
        minutes: true,
        seconds: true
      }
    };
  }

  setSeconds = event => {
    console.log(event.target.value);
    this.setState({
      initialSeconds: event.target.value,
      seconds: event.target.value,
      timerIsRun: false
    });
  };

  startTimer = () => {
    this.setState({
      timerIsRun: true
    });
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      this.setState({
        seconds: this.state.seconds - 1
      });
    }, 1000);
  };

  stopTimer = () => {
    this.setState({
      timerIsRun: false,
      seconds: this.state.initialSeconds
    });
    clearInterval(this.timer);
  };

  getTime = () => {
    const { seconds, timerType } = this.state;
    let time = {};
    // debugger;
    switch (JSON.stringify(timerType)) {
      default:
        console.log("all");
        time = {
          hours: Math.floor(seconds / 3600),
          minutes: Math.floor((seconds % 3600) / 60),
          seconds: (seconds % 3600) % 60
        };
        break;
      case JSON.stringify({ hours: true, minutes: false, seconds: false }):
        console.log("hours");

        time = {
          hours: Math.floor(seconds / 3600),
          minutes: false,
          seconds: false
        };
        break;
      case JSON.stringify({ hours: true, minutes: true, seconds: false }):
        console.log("hours && minutes");
        time = {
          hours: Math.floor(seconds / 3600),
          minutes: Math.floor((seconds % 3600) / 60),
          seconds: false
        };
        break;
      case JSON.stringify({ hours: true, minutes: false, seconds: true }):
        console.log("hours && seconds");
        time = {
          hours: Math.floor(seconds / 3600),
          minutes: false,
          seconds: seconds % 3600
        };
        break;
      case JSON.stringify({ hours: false, minutes: true, seconds: true }):
        console.log("minutes, seconds");
        time = {
          hours: false,
          minutes: Math.floor(seconds / 60),
          seconds: seconds % 60
        };
        break;
      case JSON.stringify({ hours: false, minutes: true, seconds: false }):
        console.log("minutes");
        time = {
          hours: false,
          minutes: Math.floor(seconds / 60),
          seconds: false
        };
        break;
      case JSON.stringify({ hours: false, minutes: false, seconds: true }):
        console.log("seconds");
        time = {
          hours: false,
          minutes: false,
          seconds: seconds
        };
        break;
    }
    return time;
  };

  setTimerType = timerType => {
    this.setState({
      timerType
    });
  };

  render() {
    const { timerType } = this.state;
    const time = this.getTime();
    return (
      <div>
        <input
          type="number"
          value={this.state.initialSeconds}
          onChange={this.setSeconds}
        />
        <button disabled={this.state.timerIsRun} onClick={this.startTimer}>
          Start Timer
        </button>
        <button disabled={!this.state.timerIsRun} onClick={this.stopTimer}>
          Stop Timer
        </button>
        {this.state.timerIsRun ? <h2>{this.state.seconds}</h2> : null}
        {timerType.hours ? <div>hours: {time.hours}</div> : null}
        {timerType.minutes ? <div>minutes: {time.minutes}</div> : null}
        {timerType.seconds ? <div>seconds: {time.seconds}</div> : null}
        <TimerType setTimerType={this.setTimerType} />
      </div>
    );
  }
}

Timer.propTypes = {};

export default Timer;
