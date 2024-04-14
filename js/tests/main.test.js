const Game = require("../main");

test("Getting a current totalScore with an empty table", () => {
	const game = new Game();

	expect(game.getCurrentTotalScore()).toBe(0);
});

test("Getting a previous result with an empty table", () => {
	const game = new Game();

	expect(game.getPreviousFrameResult()).toBe(-1);
});

test("Getting a previous frameScore with an empty table", () => {
	const game = new Game();

	expect(game.getPreviousFrameScore()).toBe(-1);
});

test("Recording the result in gameScoreTable", () => {
	const game = new Game();

	expect(game.recordingResultToFrame(1, 5)).toBe(0);
	expect(game.gameScoreTable.size).toBe(1);
	expect(game.gameScoreTable.get(1).result).toEqual([5]);
});

test("Update frameScore and totalScore in frames with strike/spear", () => {
	const game = new Game();

	expect(game.recordingResultToFrame(1, 5)).toBe(0);
	expect(game.recordingResultToFrame(2, 2)).toBe(0);
	expect(game.recordingResultToFrame(3, 1)).toBe(0);
	expect(game.updateFrameAndTotalScore(3)).toBe(0);
	expect(game.gameScoreTable.get(1).frameScore).toBe(8);
	expect(game.gameScoreTable.get(2).frameScore).toBe(5);
	expect(game.gameScoreTable.get(3).frameScore).toBe(4);
	expect(game.gameScoreTable.get(1).totalScore).toBe(8);
	expect(game.gameScoreTable.get(2).totalScore).toBe(13);
	expect(game.gameScoreTable.get(3).totalScore).toBe(17);
});

test("Adding throws to the table", () => {
	const game = new Game();

	expect(game.throwDistribution(10)).toBe(0);
	expect(game.throwDistribution(5)).toBe(0);
	expect(game.throwDistribution(5)).toBe(0);
	expect(game.throwDistribution(2)).toBe(0);
	expect(game.throwDistribution(1)).toBe(0);
	expect(game.gameScoreTable.get(1).result).toEqual(["X"]);
	expect(game.gameScoreTable.get(2).result).toEqual([5, "/"]);
	expect(game.gameScoreTable.get(3).result).toEqual([2, 1]);
	expect(game.gameScoreTable.get(1).frameScore).toBe(20);
	expect(game.gameScoreTable.get(1).frameScore).toBe(12);
	expect(game.gameScoreTable.get(1).frameScore).toBe(3);
	expect(game.gameScoreTable.get(1).totalScore).toBe(20);
	expect(game.gameScoreTable.get(2).totalScore).toBe(32);
	expect(game.gameScoreTable.get(2).totalScore).toBe(35);
});