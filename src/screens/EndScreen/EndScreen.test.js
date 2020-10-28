import * as React from "react";
import { mount } from "enzyme";
import { EndScreen } from "./EndScreen";

const EndScreenProps = {
  history: {
    push: jest.fn(),
  },
  match: {
    params: {
      id: 2,
    },
  },
};

describe("END SCREEN", () => {
  const TestComponent = (EndScreenProps) => {
    return mount(<EndScreen {...EndScreenProps} />);
  };

  it("should contain game end screen", () => {
    const wrapper = TestComponent(EndScreenProps);
    expect(wrapper.find(".end-screen").exists()).toBeTruthy();
  });

  it("should navigate to start screen on quit button click", () => {
    const wrapper = TestComponent(EndScreenProps);
    wrapper.find(".button").at(1).simulate("click");
    expect(EndScreenProps.history.push).toHaveBeenCalledWith("/");
  });
  it("should navigate to main game screen on play again button click", () => {
    const wrapper = TestComponent(EndScreenProps);
    wrapper.find(".button").at(0).simulate("click");
    expect(EndScreenProps.history.push).toHaveBeenCalledWith("/game");
  });
});
