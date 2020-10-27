import * as React from "react";
import { mount } from "enzyme";
import { Button } from "./Button";

const ButtonProps = {
  buttonText: "Test Button",
  onButtonClick: jest.fn(),
  iconMargin: null,
};

describe("BUTTON", () => {
  const TestComponent = (ButtonProps) => {
    return mount(<Button {...ButtonProps} />);
  };
  it("should contain a button with class button", () => {
    const wrapper = TestComponent(ButtonProps);
    expect(wrapper.find(".button").exists()).toBeTruthy();
  });

  it("should contain button text same as prop buttonText", () => {
    const wrapper = TestComponent(ButtonProps);
    expect(wrapper.find(".button-text").text()).toEqual(ButtonProps.buttonText);
  });

  it("should not contain button icon as it is not given as prop", () => {
    const wrapper = TestComponent(ButtonProps);
    expect(wrapper.find(".button-icon").exists()).toBeFalsy();
  });

  it("should contain button icon if it is given in prop", () => {
    const wrapper = TestComponent({
      ...ButtonProps,
      buttonIcon: {
        path: "testpath",
        alt: "alt text",
      },
    });
    expect(wrapper.find(".button-icon").exists()).toBeTruthy();
  });

  it("should call onButtonClick when clicked on button", () => {
    const wrapper = TestComponent(ButtonProps);
    wrapper.find(".button").simulate("click");
    expect(ButtonProps.onButtonClick).toHaveBeenCalled();
  });
});
