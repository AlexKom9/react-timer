import React, { Component } from "react";
import * as constants from "../constants/constant";

class TimerType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputField: "",
      textAriaField: "",
      selectField: [],
      result: ""
    };
    this.inputField = React.createRef();
    this.selectField = React.createRef();
  }

  selectHandler = event => {
    console.log(event.target.selectedOptions);
    const options = Array.prototype.slice.call(
      this.selectField.current.querySelectorAll("option")
    );
    console.log(options);
    const arr = options
      .filter(option => {
        if (option.selected) {
          return true;
        }
      })
      .map(option => option.value);

    console.log(arr);

    this.setState({
      inputField: arr.join(", "),
      textAreaField: arr.join("\n"),
      selectField: arr
    });
  };
  inputHandler = event => {
    const value = event.target.value;
    const arr = value.split(",").map(elem => elem.trim());
    this.setState({
      inputField: value,
      textAreaField: arr.map(elem => elem.trim().toLowerCase()).join("\n"),
      selectField: arr
    });
  };

  textAreaHandler = event => {
    const value = event.target.value;
    const arr = value.split("\n");
    this.setState({
      inputField: arr.map(elem => elem.trim().toLowerCase()).join(", "),
      textAreaField: value,
      selectField: arr
    });
  };

  componentDidUpdate(prevProps, prevState) {
    const { selectField } = this.state;
    if (JSON.stringify(selectField) !== JSON.stringify(prevState.selectField)) {
      this.updateSelectField();
    }
  }

  updateSelectField = () => {
    const { selectField } = this.state;
    console.log(selectField);
    const options = this.selectField.current.querySelectorAll("option");
    console.log(options);
    options.forEach(option => {
      option.selected = selectField.includes(option.value);
    });

    this.setState( () => {
      let hours = false;
      let minutes = false;
      let seconds = false;
      if (selectField.includes(constants.HOURS)) {
        hours = true;
      }
      if (selectField.includes(constants.MINUTES)) {
        minutes = true;
      }
      if (selectField.includes(constants.SECONDS)) {
        seconds = true;
      }
      return {
        timerType: { hours, minutes, seconds }
      };
    }, () => {
      this.props.setTimerType(this.state.timerType)

    });
  };

  render() {
    return (
      <div>
        <input
          ref={this.inputField}
          type="text"
          value={this.state.inputField}
          onChange={this.inputHandler}
        />
        <br />
        <textarea
          value={this.state.textAreaField}
          onChange={this.textAreaHandler}
          cols="30"
          rows="10"
        />
        <br />
        <select multiple onChange={this.selectHandler} ref={this.selectField}>
          <option value={constants.HOURS}>{constants.HOURS}</option>
          <option value={constants.MINUTES}>{constants.MINUTES}</option>
          <option value={constants.SECONDS}>{constants.SECONDS}</option>
        </select>
      </div>
    );
  }
}

TimerType.propTypes = {};

export default TimerType;
