interface farmeObject {
	frame: number,
	result: number[] | string[],
	frameScore: number,
	totalScore: number
}

class Game {
	private gameScoreTable: Map<number, farmeObject>;

	constructor() {
        this.gameScoreTable = new Map();
    }

	public getCurrentTotalScore() {
		if (this.gameScoreTable.size <= 0) {
			return 0;
		}

        return this.gameScoreTable.get(this.gameScoreTable.size).totalScore;
    }

	public getPreviousFrameResult() {
		if (!this.gameScoreTable.has(this.gameScoreTable.size - 1)) {
			return -1;
		}

		return this.gameScoreTable.get(this.gameScoreTable.size - 1).result;
	}

	public getPreviousFrameScore() {
		if (!this.gameScoreTable.has(this.gameScoreTable.size - 1)) {
			return -1;
		}

		return this.gameScoreTable.get(this.gameScoreTable.size - 1).frameScore;
	}

	private recordingResultToFrame(numberOfFrame: number, valueOfFrame: number) {
        let frame: farmeObject;

        if (this.gameScoreTable.has(numberOfFrame)) {
            frame = this.gameScoreTable.get(numberOfFrame);
        } else {
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

        frame.frameScore += valueOfFrame;
        frame.totalScore += valueOfFrame;

        return 0;
    }
}

module.exports = Game;