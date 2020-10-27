import React from "react";
import { millisToMinutesAndSeconds } from "../../utilities";
import { playerDataModelInstance } from "../../utilities/PlayerDataModel";

export const GameScoreBoard = () => {
  const personalBest = Math.max(...playerDataModelInstance.Scores);

  return (
    <div className="game-scoreboard">
      <div className="game-scoreboard-title">SCORE BOARD</div>
      <div className="game-scoreboard-content">
        {playerDataModelInstance.Scores.map((gameScore, index) => (
          <div className="score" key={index}>
            {gameScore === personalBest ? (
              <div className="score-best">Personal Best</div>
            ) : (
              ""
            )}
            Game {index + 1} : {millisToMinutesAndSeconds(gameScore)}
          </div>
        ))}
      </div>
    </div>
  );
};
