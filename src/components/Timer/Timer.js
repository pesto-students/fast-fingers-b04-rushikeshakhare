import React, { Component, createRef } from "react";
import "./timer.scss";

export class Timer extends Component {
  state = {
    timeLeft: this.props.timeLimit,
    timePassed: 0,
  };
  elapsedPathRef;
  timer;

  constructor(props) {
    super(props);
    this.elapsedPathRef = createRef();
  }

  componentDidMount() {
    this.startTimer();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  stopTimer = () => {
    clearInterval(this.timer);
    this.props.onTimeUp();
  };

  formatTimeLeft = (time) => {
    const seconds = (time / 1000).toFixed(2);
    return `${seconds.replace(".", ":")}`;
  };

  calculateTimeFraction = () => {
    return this.state.timeLeft / this.props.timeLimit;
  };

  setCircleDasharray = () => {
    const circleDasharray = `${(this.calculateTimeFraction() * 283).toFixed(
      0
    )} 283`;
    if (this.elapsedPathRef && this.elapsedPathRef.current) {
      this.elapsedPathRef.current.setAttribute(
        "stroke-dasharray",
        circleDasharray
      );
    }
  };

  startTimer = () => {
    this.timer = setInterval(() => {
      if (this.state.timeLeft === 0 || this.state.timeLeft < 0) {
        this.stopTimer();
        return;
      }
      this.setState(
        {
          timePassed: this.state.timePassed + 20,
          timeLeft: this.props.timeLimit - (this.state.timePassed + 20),
        },
        () => {
          this.setCircleDasharray();
          this.props.onTimeElapse(this.state.timePassed + 20);
        }
      );
    }, 20);
  };

  render() {
    return (
      <div className="timer">
        <svg
          className="timer-svg"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g className="timer-svg-circle">
            <circle
              className="timer-svg-circle-path-elapsed"
              cx="50"
              cy="50"
              r="45"
            ></circle>
            <path
              id="timer-svg-circle-path-remaining"
              strokeDasharray="283"
              className="timer-svg-circle-path-remaining"
              ref={this.elapsedPathRef}
              d="
                M 50, 50
                m -45, 0
                a 45,45 0 1,0 90,0
                a 45,45 0 1,0 -90,0
                "
            ></path>
          </g>
        </svg>
        <div className="timer-label">
          {this.formatTimeLeft(this.state.timeLeft)}
        </div>
      </div>
    );
  }
}
