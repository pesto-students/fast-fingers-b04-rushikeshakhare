import React, { Component } from "react";
import { GameScoreBoard } from "./GameScoreBoard";
import { Button } from "../../components";
import { GameInterface } from "./GameInterface";
import { GameScreenLayout } from "../../layouts/";
import { playerDataModelInstance } from "../../utilities";
import dictionary from "../../data/dictionary.json";
import "./gameScreen.scss";

export class GameScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      difficultyLevel: parseFloat(
        this.getDifficultyRatingByLevel(playerDataModelInstance.DifficultyLevel)
      ),
      currentWord: "",
      answerValue: "",
      currentScore: 0,
    };
  }

  componentDidMount() {
    this.setCurrentWord();
  }

  getDifficultyRatingByLevel = (levelValue) => {
    if (parseInt(levelValue) === 1) return levelValue;
    if (parseInt(levelValue) === 2) return 1.5;
    if (parseInt(levelValue) === 3) return 2;
  };

  getWordAccordingToDifficulty = (levelValue) => {
    if (levelValue >= 1 && levelValue < 1.5) {
      const dict = dictionary.filter((word) => word.length <= 4);
      return dict[Math.floor(Math.random() * dict.length)].toUpperCase();
    }
    if (levelValue >= 1.5 && levelValue < 2) {
      const dict = dictionary.filter(
        (word) => word.length >= 5 && word.length <= 8
      );
      return dict[Math.floor(Math.random() * dict.length)].toUpperCase();
    }
    if (levelValue >= 2) {
      const dict = dictionary.filter((word) => word.length > 8);
      return dict[Math.floor(Math.random() * dict.length)].toUpperCase();
    }
  };

  setCurrentWord = () => {
    this.setState({
      ...this.state,
      currentWord: this.getWordAccordingToDifficulty(
        this.state.difficultyLevel
      ),
    });
  };

  onTextInputChange = (event) => {
    this.setState({
      ...this.state,
      answerValue: event.target.value.toUpperCase(),
    });
    if (event.target.value.toUpperCase() === this.state.currentWord) {
      this.setState(
        {
          ...this.state,
          difficultyLevel: parseFloat(this.state.difficultyLevel) + 0.01,
          currentWord: "",
          answerValue: "",
          currentScore: this.state.currentScore + this.state.elapsed,
        },
        () => this.setCurrentWord()
      );
    }
  };

  formatWordColorByInputValue = () => {
    const highLights = [];
    this.state.currentWord.split("").forEach((char, index) => {
      if (!this.state.answerValue[index]) {
        highLights.push(
          <span style={{ color: "white" }} key={index}>
            {char}
          </span>
        );
      } else if (this.state.answerValue[index] === char) {
        highLights.push(
          <span style={{ color: "green" }} key={index}>
            {char}
          </span>
        );
      } else if (this.state.answerValue[index] !== char) {
        highLights.push(
          <span style={{ color: "grey" }} key={index}>
            {char}
          </span>
        );
      }
    });
    return highLights;
  };

  onTimeUp = () => {
    playerDataModelInstance.addScore(this.state.currentScore);
    this.props.history.push(
      `/results/${playerDataModelInstance.Scores.length - 1}`
    );
  };

  onTimeElapse = (elapsed) => {
    this.setState({
      ...this.state,
      elapsed,
    });
  };

  getTimeLimitForCurrentWord = () =>
    (this.state.currentWord.length / this.state.difficultyLevel) * 1000;

  render() {
    return (
      <GameScreenLayout
        score={this.state.currentScore}
        difficultyLevel={this.state.difficultyLevel}
        actionButton={
          <Button
            buttonText={
              <>
                <span className="cross-icon">x</span>
                STOP GAME
              </>
            }
            onButtonClick={this.onTimeUp}
          />
        }
      >
        <div className="game-scoreboard-container">
          <GameScoreBoard />
          <div className="game-interface">
            <div className="game-inputs">
              {this.state.currentWord && (
                <GameInterface
                  timeLimit={this.getTimeLimitForCurrentWord()}
                  onTimeElapse={this.onTimeElapse}
                  onTimeUp={this.onTimeUp}
                  currentWord={this.formatWordColorByInputValue()}
                  onTextInputChange={this.onTextInputChange}
                  textInputValue={this.state.answerValue}
                />
              )}
            </div>
          </div>
        </div>
      </GameScreenLayout>
    );
  }
}
