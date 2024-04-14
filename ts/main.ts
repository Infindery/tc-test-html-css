interface frameObject {
	frame: number,
	result: (number | string)[],
	frameScore: number,
	totalScore: number
}

class Game {
	private gameScoreTable: Map<number, frameObject>;
	private pointsAccuralQueue: number[][];

	constructor() {
        this.gameScoreTable = new Map();
		this.pointsAccuralQueue = [];
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

	updateFrameAndTotalScore(valueOfFrame: number): number {
        for (let i = 0; i < this.pointsAccuralQueue.length; i++) {
            let frame: frameObject = this.gameScoreTable.get(this.pointsAccuralQueue[i][0]);
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


	private recordingResultToFrame(numberOfFrame: number, valueOfFrame: number) {
        let frame: frameObject;

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

		if (valueOfFrame === 10) {
            frame.result.push("X");
        } else if (frame.frameScore + valueOfFrame === 10) {
            frame.result.push("/");
        } else {
            frame.result.push(valueOfFrame);
        }

        frame.frameScore += valueOfFrame;
        frame.totalScore += valueOfFrame;

        return 0;
    }
}

module.exports = Game;