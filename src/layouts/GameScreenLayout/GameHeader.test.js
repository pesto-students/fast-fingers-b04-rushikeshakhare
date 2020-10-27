import * as React from "react";
import { mount } from "enzyme";
import { GameHeader } from "./GameHeader";

const GameHeaderProps = {
  score: 10000,
  difficultyLevel: 1,
};

describe("GAME HEADER", () => {
  const TestComponent = (GameHeaderProps) => {
    return mount(<GameHeader {...GameHeaderProps} />);
  };
  it("should contain a game header", () => {
    const wrapper = TestComponent(GameHeaderProps);
    expect(wrapper.find(".game-header").exists()).toBeTruthy();
  });

  it("should contain player name", () => {
    const wrapper = TestComponent(GameHeaderProps);
    expect(wrapper.find(".player-name").find("h3").text()).toEqual(
      "PLAYER NAME : "
    );
  });

  it("should contain game level", () => {
    const wrapper = TestComponent(GameHeaderProps);
    expect(wrapper.find(".game-level").find("h3").text()).toEqual(
      "LEVEL : EASY"
    );
  });

  it("should contain player score", () => {
    const wrapper = TestComponent(GameHeaderProps);
    expect(wrapper.find(".game-score").find("h3").text()).toEqual(
      "SCORE : 0:10"
    );
  });

  it("should not contain player score when score is null", () => {
    const wrapper = TestComponent({ ...GameHeaderProps, score: null });
    expect(wrapper.find(".game-score").exists()).toBeFalsy();
  });
});
