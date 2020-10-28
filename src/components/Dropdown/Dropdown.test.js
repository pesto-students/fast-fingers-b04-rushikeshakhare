import * as React from "react";
import { mount } from "enzyme";
import { DIFFICULTY_LEVELS } from "../../Constants";
import { Dropdown } from "./Dropdown";

const DropdownProps = {
  onOptionClick: jest.fn(),
  value: 1,
  options: DIFFICULTY_LEVELS,
};

describe("DROPDOWN", () => {
  const TestComponent = (DropdownProps) => {
    return mount(<Dropdown {...DropdownProps} />);
  };
  it("should contain a dropdown with a button having class dropdown-button ", () => {
    const wrapper = TestComponent(DropdownProps);
    expect(wrapper.find(".dropdown-button").exists()).toBeTruthy();
  });

  it("should contain a default text value matching the value and options provided ", () => {
    const wrapper = TestComponent(DropdownProps);
    expect(wrapper.find(".dropdown-button-text").text()).toEqual(
      DIFFICULTY_LEVELS.find((level) => level.value === DropdownProps.value)
        .label
    );
  });

  it("should contain a default text value matching the value and options provided ", () => {
    const wrapper = TestComponent(DropdownProps);
    expect(wrapper.find(".dropdown-button-text").text()).toEqual(
      DIFFICULTY_LEVELS.find((level) => level.value === DropdownProps.value)
        .label
    );
  });

  it("should contain a default text as DIFFICULTY LEVEL when value doesn't match with any option", () => {
    const wrapper = TestComponent({ ...DropdownProps, value: 4 });
    expect(wrapper.find(".dropdown-button-text").text()).toEqual(
      "DIFFICULTY LEVEL"
    );
  });

  it("should contain a default text as DIFFICULTY LEVEL when there are no options provided", () => {
    const wrapper = TestComponent({ ...DropdownProps, options: null });
    expect(wrapper.find(".dropdown-button-text").text()).toEqual(
      "DIFFICULTY LEVEL"
    );
  });

  it("should show dropdown options when clicked on dropdown button", () => {
    const wrapper = TestComponent({ ...DropdownProps });
    wrapper.find(".dropdown-button").simulate("click");
    expect(wrapper.find(".dropdown-options").exists()).toBeTruthy();
  });

  it("should call the onOptionClick when clicked on any dropdown option", () => {
    const wrapper = TestComponent({ ...DropdownProps });
    wrapper.find(".dropdown-button").simulate("click");
    wrapper.find(".option").at(0).simulate("click");
    expect(DropdownProps.onOptionClick).toHaveBeenCalled();
  });

  it("should hide the dropdown options when clicked on any dropdown option", () => {
    const wrapper = TestComponent({ ...DropdownProps });
    wrapper.find(".dropdown-button").simulate("click");
    wrapper.find(".option").at(0).simulate("click");
    expect(wrapper.find(".dropdown-options").exists()).toBeFalsy();
  });
});
