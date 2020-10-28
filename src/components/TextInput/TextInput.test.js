import * as React from "react";
import { mount } from "enzyme";
import { TextInput } from "./TextInput";

const TextInputProps = {
  onChange: jest.fn(),
  value: "TEXT VALUE",
  placeholder: "PLACEHOLDER",
};

describe("TEXT INPUT", () => {
  const TestComponent = (TextInputProps) => {
    return mount(<TextInput {...TextInputProps} />);
  };
  it("should contain a text input with class text-input ", () => {
    const wrapper = TestComponent(TextInputProps);
    expect(wrapper.find(".text-input").exists()).toBeTruthy();
  });

  it("should contain a text input with value same as value prop ", () => {
    const wrapper = TestComponent(TextInputProps);
    expect(wrapper.find(".text-input").prop("value")).toEqual(
      TextInputProps.value
    );
  });

  it("should contain a text input with placeholder same as placeholder prop ", () => {
    const wrapper = TestComponent(TextInputProps);
    expect(wrapper.find(".text-input").prop("placeholder")).toEqual(
      TextInputProps.placeholder
    );
  });

  it("should call onChange when input changes its value via change event", () => {
    const wrapper = TestComponent(TextInputProps);
    wrapper.find(".text-input").simulate("change");
    expect(TextInputProps.onChange).toHaveBeenCalled();
  });
});
