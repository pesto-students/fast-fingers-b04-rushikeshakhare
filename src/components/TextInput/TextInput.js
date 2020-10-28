import React from "react";
import "./textInput.scss";

export const TextInput = ({ onChange, value, placeholder }) => {
  return (
    <input
      type="text"
      className="text-input"
      autoFocus={true}
      placeholder={placeholder}
      spellCheck={false}
      onChange={onChange}
      value={value}
    />
  );
};
