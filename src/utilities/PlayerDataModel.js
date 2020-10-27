class PlayerDataModel {
    name = localStorage.getItem('playerName') || '';
    difficultyLevel = localStorage.getItem('difficultyLevel') ? parseInt(localStorage.getItem('difficultyLevel')) : 1;
    scores = localStorage.getItem('scores') ? JSON.parse(localStorage.getItem('scores')) : [];

    get Name() {
        return this.name;
    }

    set Name(name) {
        this.name = name;
        localStorage.setItem('playerName', name);
    }

    get Scores() {
        return this.scores;
    }

    set Scores(scores) {
        this.scores = scores;
        localStorage.setItem('scores', JSON.stringify(scores));
    }

    get DifficultyLevel() {
        return this.difficultyLevel;
    }

    set DifficultyLevel(difficultyLevel) {
        this.difficultyLevel = difficultyLevel;
        localStorage.setItem('difficultyLevel', difficultyLevel);
    }

    addScore = (score) => {
        this.scores.push(score);
        localStorage.setItem('scores', JSON.stringify(this.scores));
    }

    isHighScore = (score) => {
        return score === Math.max(...this.scores)
    }
}

export const playerDataModelInstance = new PlayerDataModel();