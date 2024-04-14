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
    getPreviousFrameScore() {
        if (!this.gameScoreTable.has(this.gameScoreTable.size - 1)) {
            return -1;
        }
        return this.gameScoreTable.get(this.gameScoreTable.size - 1).frameScore;
    }
    recordingResultToFrame(numberOfFrame, valueOfFrame) {
        let frame;
        if (this.gameScoreTable.has(numberOfFrame)) {
            frame = this.gameScoreTable.get(numberOfFrame);
        }
        else {
            frame = this.gameScoreTable.set(numberOfFrame, {
                frame: numberOfFrame,
                result: [],
                frameScore: 0,
                totalScore: 0
            }).get(numberOfFrame);
            if (this.gameScoreTable.has(numberOfFrame - 1)) {
                frame.totalScore = this.gameScoreTable.get(numberOfFrame - 1).totalScore;
            }
        }
        if (valueOfFrame === 10) {
            frame.result.push("X");
        }
        else if (frame.frameScore + valueOfFrame === 10) {
            frame.result.push("/");
        }
        else {
            frame.result.push(valueOfFrame);
        }
        frame.frameScore += valueOfFrame;
        frame.totalScore += valueOfFrame;
        return 0;
    }
}
module.exports = Game;
