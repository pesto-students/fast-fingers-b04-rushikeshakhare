import React, { Component } from "react";
import { ICONS, DIFFICULTY_LEVELS } from "../../utilities/Constants";
import { TextInput, Dropdown, Button } from "../../components/";
import { showToast } from "../../utilities/ToastUtil";
import { playerDataModelInstance } from "../../utilities/PlayerDataModel";
import "./startScreen.scss";

export class StartScreen extends Component {
  state = {
    playerName: localStorage.getItem("playerName") || "",
    difficultyLevel: localStorage.getItem("difficultyLevel")
      ? parseInt(localStorage.getItem("difficultyLevel"))
      : 1,
  };

  onPlayerNameChange = (event) => {
    this.setState({
      ...this.state,
      playerName: event.target.value.toUpperCase(),
    });
  };

  onDifficultyLevelChange = (difficultyLevel) => {
    this.setState({
      ...this.state,
      difficultyLevel,
    });
  };

  validateGameSettings = () => {
    const { playerName, difficultyLevel } = this.state;

    if (!playerName) {
      showToast("Please enter player name");
      return false;
    }
    if (
      !difficultyLevel ||
      !DIFFICULTY_LEVELS.find((option) => option.value === difficultyLevel)
    ) {
      showToast("Please select valid game difficulty level");
      return false;
    }

    return true;
  };

  onStartButtonClick = () => {
    if (this.validateGameSettings()) {
      playerDataModelInstance.Name = this.state.playerName;
      playerDataModelInstance.DifficultyLevel = this.state.difficultyLevel;
      this.props.history.push("/game");
    }
  };

  render() {
    return (
      <div className="start-screen">
        <img
          src={ICONS.KEYBOARD.path}
          alt={ICONS.KEYBOARD.alt}
          className="start-screen-game-logo"
        />
        <h1 className="start-screen-game-title">Fast Fingers</h1>
        <div className="start-screen-game-tagline">
          <p className="tagline-header">
            <span>The Ultimate Typing Game</span>
          </p>
        </div>
        <TextInput
          value={this.state.playerName}
          onChange={this.onPlayerNameChange}
        />
        <Dropdown
          options={DIFFICULTY_LEVELS}
          value={this.state.difficultyLevel}
          onOptionClick={this.onDifficultyLevelChange}
        />
        <Button
          buttonText={"START GAME"}
          buttonIcon={ICONS.PLAY}
          onButtonClick={this.onStartButtonClick}
        />
      </div>
    );
  }
}
