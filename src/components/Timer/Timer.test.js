import * as React from "react";
import { mount } from "enzyme";
import { Timer } from "./Timer";

const TimerProps = {
  timeLimit: 1000,
  key: 1000,
  onTimeElapse: jest.fn(),
  onTimeUp: jest.fn(),
};

jest.useFakeTimers();

describe("TIMER", () => {
  const TestComponent = (TimerProps) => {
    return mount(<Timer {...TimerProps} />);
  };
  it("should contain a timer", () => {
    const wrapper = TestComponent(TimerProps);
    expect(wrapper.find(".timer").exists()).toBeTruthy();
  });

  it("should start timer on component mount", () => {
    const wrapper = TestComponent(TimerProps);
    wrapper.instance().startTimer = jest.fn();
    wrapper.instance().componentDidMount();
    expect(wrapper.instance().startTimer).toHaveBeenCalled();
  });

  it("should clear timer interval on component unmount", () => {
    const wrapper = TestComponent(TimerProps);
    window.clearInterval = jest.fn();
    wrapper.instance().componentWillUnmount();
    expect(window.clearInterval).toHaveBeenCalled();
  });

  it("should clear timer interval when timer stops", () => {
    const wrapper = TestComponent(TimerProps);
    window.clearInterval = jest.fn();
    wrapper.instance().stopTimer();
    expect(window.clearInterval).toHaveBeenCalled();
  });

  it("should call setInterval when startTimer is called", () => {
    const wrapper = TestComponent(TimerProps);
    window.setInterval = jest.fn();
    wrapper.instance().startTimer();

    expect(window.setInterval).toHaveBeenCalled();
  });

  it("should calculate accurate time fraction for timeLeft & total timeLimit", () => {
    const wrapper = TestComponent(TimerProps);
    expect(wrapper.instance().calculateTimeFraction()).toEqual(1);
  });

  it("should calculate time fraction when called setCircleDasharray", () => {
    const wrapper = TestComponent(TimerProps);
    wrapper.instance().calculateTimeFraction = jest.fn();
    wrapper.instance().setCircleDasharray();

    expect(wrapper.instance().calculateTimeFraction).toHaveBeenCalled();
  });

  it("should call stopTimer when timeLeft is less than 0 & called onIntervalElapse", () => {
    const wrapper = TestComponent(TimerProps);
    wrapper.instance().stopTimer = jest.fn();
    wrapper.setState({
      timeLeft: -1,
    });
    wrapper.instance().onIntervalElapse();

    expect(wrapper.instance().stopTimer).toHaveBeenCalled();
  });

  it("should call onTimeElapse when timeLeft is greater than 0 & called onIntervalElapse", () => {
    const wrapper = TestComponent(TimerProps);
    wrapper.setState({
      timeLeft: 100,
    });
    wrapper.instance().onIntervalElapse();
    expect(TimerProps.onTimeElapse).toHaveBeenCalled();
  });
});
