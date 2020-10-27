import * as React from "react";
import { mount } from "enzyme";
import { GameScreenLayout } from "./GameScreenLayout";
import { GameHeader } from "./GameHeader";

const GameScreenLayoutProps = {
  score: 10000,
  difficultyLevel: 1,
  actionButton: "actionButton",
  children: <div className="game-screen-child"></div>,
};

describe("GAME SCREEN LAYOUT", () => {
  const TestComponent = (GameScreenLayoutProps) => {
    return mount(<GameScreenLayout {...GameScreenLayoutProps} />);
  };
  it("should contain a game screen", () => {
    const wrapper = TestComponent(GameScreenLayoutProps);
    expect(wrapper.find(".game-screen").exists()).toBeTruthy();
  });

  it("should contain a game header", () => {
    const wrapper = TestComponent(GameScreenLayoutProps);
    expect(wrapper.find(GameHeader).exists()).toBeTruthy();
  });

  it("should contain children when passed as prop", () => {
    const wrapper = TestComponent(GameScreenLayoutProps);
    expect(wrapper.find(".game-screen-child").exists()).toBeTruthy();
  });

  it("should contain actionButton as passed", () => {
    const wrapper = TestComponent(GameScreenLayoutProps);
    expect(wrapper.find(".action-button").text()).toEqual("actionButton");
  });
});
