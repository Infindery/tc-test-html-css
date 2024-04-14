class Game {
    gameScoreTable;
    pointsAccuralQueue;
    currentFrame;
    constructor() {
        this.gameScoreTable = new Map();
        this.pointsAccuralQueue = [];
        this.currentFrame = 0;
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
    updateFrameAndTotalScore(valueOfFrame) {
        for (let i = 0; i < this.pointsAccuralQueue.length; i++) {
            let frame = this.gameScoreTable.get(this.pointsAccuralQueue[i][0]);
            frame.frameScore += valueOfFrame;
            for (let z = this.pointsAccuralQueue[i][0]; z <= this.gameScoreTable.size; z++) {
                this.gameScoreTable.get(z).totalScore += valueOfFrame;
            }
            this.pointsAccuralQueue[i][1] -= 1;
            if (this.pointsAccuralQueue[i][1] <= 0) {
                this.pointsAccuralQueue.splice(i, 1);
                i--;
            }
        }
        return 0;
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
    throwDistribution(valueOfFrame) {
        if (this.gameScoreTable.has(10) && this.gameScoreTable.get(10).result.length === 3) {
            return -1;
        }
        this.currentFrame += 1;
        this.updateFrameAndTotalScore(valueOfFrame);
        if (this.gameScoreTable.has(this.currentFrame)) {
            if (this.gameScoreTable.get(this.currentFrame).frameScore + valueOfFrame === 10) {
                if (this.currentFrame !== 10) {
                    this.pointsAccuralQueue.push([this.currentFrame, 1]);
                }
            }
            this.recordingResultToFrame(this.currentFrame, valueOfFrame);
            if (this.currentFrame === 10) {
                this.currentFrame -= 1;
            }
        }
        else {
            if (valueOfFrame === 10) {
                if (this.currentFrame !== 10) {
                    this.pointsAccuralQueue.push([this.currentFrame, 2]);
                }
                this.recordingResultToFrame(this.currentFrame, valueOfFrame);
                if (this.currentFrame === 10) {
                    this.currentFrame -= 1;
                }
            }
            else {
                this.recordingResultToFrame(this.currentFrame, valueOfFrame);
                this.currentFrame -= 1;
            }
        }
        return 0;
    }
}
module.exports = Game;
