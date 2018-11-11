import React, { Component } from "react";
import TimerType from "./TimerType";
import Progress from "./Progress";

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
    const value = event.target.value;
    if (value < 0) return;
    this.setState({
      initialSeconds: event.target.value,
      seconds: event.target.value,
      timerIsRun: false
    });
  };

  startTimer = () => {
    this.setState(
      {
        timerIsRun: true,
        seconds: this.state.initialSeconds
      },
      () => {
        this.timer = setInterval(() => {
          this.setState({
            seconds: this.state.seconds - 1
          });
          if (this.state.seconds <= 0) {
            this.finishTimer();
          }
        }, 1000);
      }
    );
  };

  finishTimer = () => {
    this.setState(
      {
        timerIsRun: false
      },
      () => {
        clearInterval(this.timer);
      }
    );
  };

  stopTimer = () => {
    this.setState(
      {
        timerIsRun: false,
        seconds: this.state.initialSeconds
      },
      () => {
        clearInterval(this.timer);
      }
    );
  };

  getTime = () => {
    function getPercent(a, b) {
      if (Number(b) === 0) return 100;
      return 100 - Math.floor((a / b) * 100);
    }
    const { seconds, initialSeconds, timerType } = this.state;
    let time = {};
    // debugger;
    switch (JSON.stringify(timerType)) {
      default:
        // console.log("all");
        time = {
          hours: Math.floor(seconds / 3600),
          minutes: Math.floor((seconds % 3600) / 60),
          seconds: (seconds % 3600) % 60,
          hoursPercent:
            Math.floor(seconds / 3600) === 0
              ? 100
              : getPercent(seconds, initialSeconds),
          minutesPercent: getPercent(Math.floor((seconds % 3600) / 60), 60),
          secondsPercent: getPercent((seconds % 3600) % 60, 60)
        };
        break;
      case JSON.stringify({ hours: true, minutes: false, seconds: false }):
        // console.log("hours");

        time = {
          hours: Math.floor(seconds / 3600),
          minutes: false,
          seconds: false,
          hoursPercent: getPercent(seconds, initialSeconds),
          minutesPercent: false,
          secondsPercent: false
        };
        break;
      case JSON.stringify({ hours: true, minutes: true, seconds: false }):
        // console.log("hours && minutes");
        time = {
          hours: Math.floor(seconds / 3600),
          minutes: Math.floor((seconds % 3600) / 60),
          seconds: false,
          hoursPercent:
            Math.floor(seconds / 3600) === 0
              ? 100
              : getPercent(seconds, initialSeconds),
          minutesPercent: getPercent(Math.floor((seconds % 3600) / 60), 60),
          secondsPercent: false
        };
        break;
      case JSON.stringify({ hours: true, minutes: false, seconds: true }):
        // console.log("hours && seconds");
        time = {
          hours: Math.floor(seconds / 3600),
          minutes: false,
          seconds: seconds % 3600,
          hoursPercent: getPercent(
            Math.floor(seconds / 3600),
            Math.floor(initialSeconds / 3600)
          ),
          minutesPercent: false,
          secondsPercent: getPercent(seconds % 3600, initialSeconds % 3600)
        };
        break;
      case JSON.stringify({ hours: false, minutes: true, seconds: true }):
        // console.log("minutes, seconds");
        time = {
          hours: false,
          minutes: Math.floor(seconds / 60),
          seconds: seconds % 60,
          hoursPercent: false,
          minutesPercent: getPercent(
            Math.floor(seconds),
            Math.floor(initialSeconds)
          ),
          secondsPercent: getPercent(seconds % 3600, 60)
        };
        break;
      case JSON.stringify({ hours: false, minutes: true, seconds: false }):
        // console.log("minutes");
        time = {
          hours: false,
          minutes: Math.floor(seconds / 60),
          seconds: false,
          hoursPercent: false,
          minutesPercent: getPercent(seconds, initialSeconds),
          secondsPercent: false
        };
        break;
      case JSON.stringify({ hours: false, minutes: false, seconds: true }):
        // console.log("seconds");
        time = {
          hours: false,
          minutes: false,
          seconds: seconds,
          hoursPercent: false,
          minutesPercent: false,
          secondsPercent: getPercent(seconds, initialSeconds)
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
      <div className="timer">
        <div className="progress__container">
          {timerType.hours ? (
            <Progress
              name="hours"
              value={time.hours}
              percent={time.hoursPercent}
            />
          ) : null}
          {timerType.minutes ? (
              <Progress
                name="minutes"
                value={time.minutes}
                percent={time.minutesPercent}
              />
          ) : null}
          {timerType.seconds ? (
            <Progress
              name="seconds"
              value={time.seconds}
              percent={time.secondsPercent}
            />
          ) : null}
        </div>

        <div className="timer__start">
          <input
            id="timer-value"
            disabled={this.state.timerIsRun}
            type="number"
            value={this.state.initialSeconds}
            onChange={this.setSeconds}
          />
          <button
            id="start-timer"
            disabled={
              this.state.timerIsRun || !Number(this.state.initialSeconds)
            }
            onClick={this.startTimer}
          >
            Start Timer
          </button>
          <button
            id="stop-timer"
            disabled={!this.state.timerIsRun}
            onClick={this.stopTimer}>
            Stop Timer
          </button>
        </div>

        <div className="timer__type">
          <TimerType setTimerType={this.setTimerType} />
        </div>
      </div>
    );
  }
}

Timer.propTypes = {};

export default Timer;
