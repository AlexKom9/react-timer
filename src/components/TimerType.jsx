import React, { Component } from "react";
import * as constants from "../constants/constant";
import PropTypes from 'prop-types';

class TimerType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputField: props.types.map(elem => elem.trim().toLowerCase()).join(", "),
      textAreaField: props.types
        .map(elem => elem.trim().toLowerCase())
        .join("\n"),
      selectField: props.types.map(elem => elem.trim().toLowerCase())
    };
    this.refSelectField = React.createRef();
  }

  static defaultProps = {
    types: [constants.HOURS, constants.MINUTES, constants.SECONDS]
  };

  selectHandler = () => {
    const options = Array.prototype.slice.call(
      this.refSelectField.current.querySelectorAll("option")
    );
    const arr = options
      .filter(option => option.selected)
      .map(option => option.value);

    this.setState(
      {
        inputField: arr.join(", "),
        textAreaField: arr.join("\n"),
        selectField: arr
      },
      this.setTimerType
    );
  };

  inputHandler = event => {
    const value = event.target.value;
    const arr = value.split(",").map(elem => elem.trim());
    console.log('input handler')
    this.setState(
      {
        inputField: value,
        textAreaField: arr.map(elem => elem.trim().toLowerCase()).join("\n"),
        selectField: arr
      },
      this.setTimerType
    );
  };

  textAreaHandler = event => {
    const value = event.target.value;
    const arr = value.split("\n");
    this.setState(
      {
        inputField: arr.map(elem => elem.trim().toLowerCase()).join(", "),
        textAreaField: value,
        selectField: arr
      },
      this.setTimerType
    );
  };

  setTimerType = () => {
    const { selectField } = this.state;
    const timerType = {
      hours: selectField.map(elem => elem.toUpperCase()).includes(constants.HOURS),
      minutes: selectField.map(elem => elem.toUpperCase()).includes(constants.MINUTES),
      seconds: selectField.map(elem => elem.toUpperCase()).includes(constants.SECONDS),
    };
    this.props.setTimerType(timerType);
  };

  render() {
    return (
      <div className="timer-type">
        <input
          className="timer-type__input"
          type="text"
          value={this.state.inputField}
          onChange={this.inputHandler}
        />
        <br />
        <textarea
          className="timer-type__text"
          value={this.state.textAreaField}
          onChange={this.textAreaHandler}
          cols="30"
          rows="10"
        />
        <br />
        <select
          multiple
          className="timer-type__select"
          onChange={this.selectHandler}
          ref={this.refSelectField}
          value={this.state.selectField}
        >
          {this.props.types.map(type => (
            <option
              key={type}
              value={constants[type].toLowerCase()}
              selected={this.state.selectField.includes(constants[type])}
            >
              {constants[type].toLowerCase()}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

TimerType.propTypes = {
  setTimerType: PropTypes.func.isRequired
};

export default TimerType;
