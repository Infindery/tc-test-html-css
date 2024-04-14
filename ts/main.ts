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

	getCurrentTotalScore() {
		if (this.gameScoreTable.size <= 0) {
			return 0;
		}

        return this.gameScoreTable.get(this.gameScoreTable.size).totalScore;
    }
}

module.exports = Game;