import * as React from "react";
import { mount } from "enzyme";
import { StartScreen } from "./StartScreen";

const StartScreenProps = {
  history: {
    push: jest.fn(),
  },
};

describe("START SCREEN", () => {
  const TestComponent = (StartScreenProps) => {
    return mount(<StartScreen {...StartScreenProps} />);
  };

  it("should contain game start screen", () => {
    const wrapper = TestComponent(StartScreenProps);
    expect(wrapper.find(".start-screen").exists()).toBeTruthy();
  });

  it("should update player name when called onPlayerNameChange", () => {
    const wrapper = TestComponent(StartScreenProps);
    wrapper.instance().onPlayerNameChange({
      target: {
        value: "test",
      },
    });
    expect(wrapper.state("playerName")).toEqual("TEST");
  });

  it("should update player difficulty level when called onDifficultyLevelChange", () => {
    const wrapper = TestComponent(StartScreenProps);
    wrapper.instance().onDifficultyLevelChange(1);
    expect(wrapper.state("difficultyLevel")).toEqual(1);
  });

  it("should validate game settings as false when player name is empty", () => {
    const wrapper = TestComponent(StartScreenProps);
    wrapper.setState({
      playerName: "",
    });
    expect(wrapper.instance().validateGameSettings()).toBeFalsy();
  });

  it("should validate game settings as false when difficulty level is invalid", () => {
    const wrapper = TestComponent(StartScreenProps);
    wrapper.setState({
      playerName: "test player",
      difficultyLevel: 7,
    });
    expect(wrapper.instance().validateGameSettings()).toBeFalsy();
  });

  it("should validate game settings as true when difficulty level is valid and player name is not empty", () => {
    const wrapper = TestComponent(StartScreenProps);
    wrapper.setState({
      playerName: "test player",
      difficultyLevel: 1,
    });
    expect(wrapper.instance().validateGameSettings()).toBeTruthy();
  });

  it("should naviagate to game screen if start button is clicked and game settings are valid", () => {
    const wrapper = TestComponent(StartScreenProps);
    wrapper.setState({
      playerName: "test player",
      difficultyLevel: 1,
    });
    wrapper.instance().onStartButtonClick();
    expect(StartScreenProps.history.push).toHaveBeenCalled();
  });
});
