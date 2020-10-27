import React from "react";
import { ICONS, DIFFICULTY_LEVELS } from "../../utilities/Constants";
import { millisToMinutesAndSeconds } from "../../utilities";
import { playerDataModelInstance } from "../../utilities/PlayerDataModel";

export const GameHeader = ({ score, difficultyLevel }) => {
  const getDifficultyLabelByValue = () => {
    return DIFFICULTY_LEVELS.find(
      (level) =>
        difficultyLevel < level.range.max && difficultyLevel >= level.range.min
    ).label;
  };

  return (
    <div className="game-header">
      <div className="player-details">
        <div className="player-name">
          <img src={ICONS.PERSON.path} alt={ICONS.PERSON.alt} />
          <h3> PLAYER NAME : {playerDataModelInstance.Name} </h3>
        </div>
        <div className="game-title">
          <h1> Fast Fingers </h1>
        </div>
      </div>
      <div className="game-details">
        <div className="game-level">
          <img src={ICONS.GAMEPAD.path} alt={ICONS.GAMEPAD.alt} />
          <h3>
            LEVEL :
            {" " +
              getDifficultyLabelByValue(
                playerDataModelInstance.DifficultyLevel
              )}
          </h3>
        </div>
        {score !== null && (
          <div className="game-score">
            <h3> Score: {millisToMinutesAndSeconds(score)} </h3>
          </div>
        )}
      </div>
    </div>
  );
};
