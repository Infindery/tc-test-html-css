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
    getPreviousFrameResult() {
        if (!this.gameScoreTable.has(this.gameScoreTable.size - 1)) {
            return -1;
        }
        return this.gameScoreTable.get(this.gameScoreTable.size - 1).result;
    }
}
module.exports = Game;
