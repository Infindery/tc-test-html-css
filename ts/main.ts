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
}

module.exports = Game;