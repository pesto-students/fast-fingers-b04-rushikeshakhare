import React from "react";
import { Timer, TextInput } from "../../components";

export const GameInterface = ({
  timeLimit,
  onTimeElapse,
  onTimeUp,
  currentWord,
  onTextInputChange,
  textInputValue,
}) => {
  return (
    <>
      <Timer
        timeLimit={timeLimit}
        key={timeLimit}
        onTimeElapse={onTimeElapse}
        onTimeUp={onTimeUp}
      />
      <h1 className="current-word">{currentWord} </h1>
      <TextInput onChange={onTextInputChange} value={textInputValue} />
    </>
  );
};
