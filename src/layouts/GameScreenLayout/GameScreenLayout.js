import React from "react";
import { GameHeader } from "./GameHeader";
import "./gameScreenLayout.scss";

export const GameScreenLayout = ({
  score,
  difficultyLevel,
  actionButton,
  children,
}) => {
  return (
    <div className="game-screen">
      <GameHeader score={score} difficultyLevel={difficultyLevel} />
      {children}
      <div className="action-button">{actionButton}</div>
    </div>
  );
};
