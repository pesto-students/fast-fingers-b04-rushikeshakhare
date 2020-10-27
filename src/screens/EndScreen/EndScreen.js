import React from "react";
import { Button } from "../../components";
import { GameScreenLayout } from "../../layouts";
import { ICONS } from "../../utilities/Constants";
import { millisToMinutesAndSeconds } from "../../utilities";
import { playerDataModelInstance } from "../../utilities/PlayerDataModel";
import "./endScreen.scss";

export const EndScreen = ({ history, match }) => {
  const getLastGameNumber = () => {
    return playerDataModelInstance.Scores.length;
  };

  const getLastGameScore = () => {
    const allScores = playerDataModelInstance.Scores;
    return allScores[match.params.id];
  };

  return (
    <GameScreenLayout
      score={null}
      difficultyLevel={playerDataModelInstance.DifficultyLevel}
      actionButton={
        <Button buttonText="QUIT" onButtonClick={() => history.push("/")} />
      }
    >
      <div className="end-screen">
        <div className="result-interface">
          <h1 className="game-name">SCORE : GAME {getLastGameNumber()}</h1>
          <h1 className="game-score">
            {millisToMinutesAndSeconds(getLastGameScore())}
          </h1>
          {playerDataModelInstance.isHighScore(getLastGameScore()) && (
            <h1>New High Score</h1>
          )}
          <Button
            buttonText={"PLAY AGAIN"}
            buttonIcon={ICONS.RELOAD}
            onButtonClick={() => history.push("/game")}
            iconMargin="8px"
          />
        </div>
      </div>
    </GameScreenLayout>
  );
};
