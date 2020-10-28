import * as React from "react";
import { mount } from "enzyme";
import { GameScreen } from "./GameScreen";

const GameScreenProps = {
  history: {
    push: jest.fn(),
  },
  match: {
    params: {
      id: 2,
    },
  },
};

describe("GAME SCREEN", () => {
  const TestComponent = (GameScreenProps) => {
    return mount(<GameScreen {...GameScreenProps} />);
  };

  it("should contain game scoreboard container", () => {
    const wrapper = TestComponent(GameScreenProps);
    expect(wrapper.find(".game-scoreboard-container").exists()).toBeTruthy();
  });

  it("should get correct difficulty rating by level", () => {
    const wrapper = TestComponent(GameScreenProps);
    expect(wrapper.instance().getDifficultyRatingByLevel("1")).toEqual("1");
    expect(wrapper.instance().getDifficultyRatingByLevel("2")).toEqual(1.5);
    expect(wrapper.instance().getDifficultyRatingByLevel("3")).toEqual(2);
  });

  it("should get correct word by difficulty rating", () => {
    const wrapper = TestComponent(GameScreenProps);
    expect(
      wrapper.instance().getWordAccordingToDifficulty(1).length
    ).toBeLessThanOrEqual(4);
    expect(
      wrapper.instance().getWordAccordingToDifficulty(1.6).length
    ).toBeLessThanOrEqual(8);
    expect(
      wrapper.instance().getWordAccordingToDifficulty(2.1).length
    ).toBeGreaterThanOrEqual(8);
  });

  it("should set next current word if currrentWord is equal to input value", () => {
    const wrapper = TestComponent(GameScreenProps);
    wrapper.instance().setCurrentWord = jest.fn();
    wrapper.setState({
      currentWord: "TEST",
    });
    wrapper.instance().onTextInputChange({
      target: {
        value: "TEST",
      },
    });
    expect(wrapper.instance().setCurrentWord).toHaveBeenCalled();
  });

  it("should call navigation function onTimeUp", () => {
    const wrapper = TestComponent(GameScreenProps);
    wrapper.instance().onTimeUp();
    expect(GameScreenProps.history.push).toHaveBeenCalled();
  });
});
