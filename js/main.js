class Game {
    gameScoreTable;
    constructor() {
        this.gameScoreTable = new Map();
    }
    getCurrentTotalScore() {
        if (this.gameScoreTable.size <= 0) {
            return 0;
        }
        return this.gameScoreTable.get(this.gameScoreTable.size).totalScore;
    }
}
module.exports = Game;
