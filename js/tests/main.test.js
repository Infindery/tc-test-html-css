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
	game.pointsAccuralQueue = [[1, 1], [2, 1], [3, 1]];

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
	expect(game.gameScoreTable.get(2).frameScore).toBe(12);
	expect(game.gameScoreTable.get(3).frameScore).toBe(3);
	expect(game.gameScoreTable.get(1).totalScore).toBe(20);
	expect(game.gameScoreTable.get(2).totalScore).toBe(32);
	expect(game.gameScoreTable.get(3).totalScore).toBe(35);
});

test("Option 1", () => {
	const game = new Game();

	expect(game.throwDistribution(10)).toBe(0);
	expect(game.throwDistribution(10)).toBe(0);
	expect(game.throwDistribution(10)).toBe(0);
	expect(game.throwDistribution(10)).toBe(0);
	expect(game.throwDistribution(10)).toBe(0);
	expect(game.throwDistribution(10)).toBe(0);
	expect(game.throwDistribution(10)).toBe(0);
	expect(game.throwDistribution(10)).toBe(0);
	expect(game.throwDistribution(10)).toBe(0);
	expect(game.throwDistribution(10)).toBe(0);
	expect(game.throwDistribution(10)).toBe(0);
	expect(game.throwDistribution(10)).toBe(0);
	expect(game.getCurrentTotalScore()).toBe(300);
	expect(game.gameScoreTable.get(10).totalScore).toBe(300);
});

test("Option 2", () => {
	const game = new Game();

	expect(game.throwDistribution(10)).toBe(0);
	expect(game.getCurrentTotalScore()).toBe(10);
	expect(game.gameScoreTable.get(1).totalScore).toBe(10);
	expect(game.getPreviousFrameResult()).toBe(-1);
	expect(game.getPreviousFrameScore()).toBe(-1);

	expect(game.throwDistribution(7)).toBe(0);
	expect(game.throwDistribution(3)).toBe(0);
	expect(game.getCurrentTotalScore()).toBe(30);
	expect(game.gameScoreTable.get(2).totalScore).toBe(30);
	expect(game.getPreviousFrameResult()).toEqual(["X"]);
	expect(game.getPreviousFrameScore()).toBe(20);

	expect(game.throwDistribution(7)).toBe(0);
	expect(game.throwDistribution(2)).toBe(0);
	expect(game.getCurrentTotalScore()).toBe(46);
	expect(game.gameScoreTable.get(3).totalScore).toBe(46);
	expect(game.getPreviousFrameResult()).toEqual([7, "/"]);
	expect(game.getPreviousFrameScore()).toBe(17);

	expect(game.throwDistribution(9)).toBe(0);
	expect(game.throwDistribution(1)).toBe(0);
	expect(game.getCurrentTotalScore()).toBe(56);
	expect(game.gameScoreTable.get(4).totalScore).toBe(56);
	expect(game.getPreviousFrameResult()).toEqual([7, 2]);
	expect(game.getPreviousFrameScore()).toBe(9);

	expect(game.throwDistribution(10)).toBe(0);
	expect(game.getCurrentTotalScore()).toBe(76);
	expect(game.gameScoreTable.get(5).totalScore).toBe(76);
	expect(game.getPreviousFrameResult()).toEqual([9, "/"]);
	expect(game.getPreviousFrameScore()).toBe(20);

	expect(game.throwDistribution(10)).toBe(0);
	expect(game.getCurrentTotalScore()).toBe(96);
	expect(game.gameScoreTable.get(6).totalScore).toBe(96);
	expect(game.getPreviousFrameResult()).toEqual(["X"]);
	expect(game.getPreviousFrameScore()).toBe(20);

	expect(game.throwDistribution(10)).toBe(0);
	expect(game.getCurrentTotalScore()).toBe(126);
	expect(game.gameScoreTable.get(7).totalScore).toBe(126);
	expect(game.getPreviousFrameResult()).toEqual(["X"]);
	expect(game.getPreviousFrameScore()).toBe(20);

	expect(game.throwDistribution(2)).toBe(0);
	expect(game.throwDistribution(3)).toBe(0);
	expect(game.getCurrentTotalScore()).toBe(138);
	expect(game.gameScoreTable.get(8).totalScore).toBe(138);
	expect(game.getPreviousFrameResult()).toEqual(["X"]);
	expect(game.getPreviousFrameScore()).toBe(15);

	expect(game.throwDistribution(6)).toBe(0);
	expect(game.throwDistribution(4)).toBe(0);
	expect(game.getCurrentTotalScore()).toBe(148);
	expect(game.gameScoreTable.get(9).totalScore).toBe(148);
	expect(game.getPreviousFrameResult()).toEqual([2, 3]);
	expect(game.getPreviousFrameScore()).toBe(5);

	expect(game.throwDistribution(7)).toBe(0);
	expect(game.throwDistribution(3)).toBe(0);
	expect(game.throwDistribution(3)).toBe(0);
	expect(game.getCurrentTotalScore()).toBe(168);
	expect(game.gameScoreTable.get(10).totalScore).toBe(168);
	expect(game.getPreviousFrameResult()).toEqual([6, "/"]);
	expect(game.getPreviousFrameScore()).toBe(17);
});

test("Option 3", () => {
	const game = new Game();

	expect(game.throwDistribution(2)).toBe(0);
	expect(game.throwDistribution(3)).toBe(0);
	expect(game.getCurrentTotalScore()).toBe(5);
	expect(game.gameScoreTable.get(1).totalScore).toBe(5);
	expect(game.getPreviousFrameResult()).toBe(-1);
	expect(game.getPreviousFrameScore()).toBe(-1);

	expect(game.throwDistribution(5)).toBe(0);
	expect(game.throwDistribution(1)).toBe(0);
	expect(game.getCurrentTotalScore()).toBe(11);
	expect(game.gameScoreTable.get(2).totalScore).toBe(11);
	expect(game.getPreviousFrameResult()).toEqual([2, 3]);
	expect(game.getPreviousFrameScore()).toBe(5);

	expect(game.throwDistribution(6)).toBe(0);
	expect(game.throwDistribution(4)).toBe(0);
	expect(game.getCurrentTotalScore()).toBe(21);
	expect(game.gameScoreTable.get(3).totalScore).toBe(21);
	expect(game.getPreviousFrameResult()).toEqual([5, 1]);
	expect(game.getPreviousFrameScore()).toBe(6);

	expect(game.throwDistribution(1)).toBe(0);
	expect(game.getCurrentTotalScore()).toBe(23);
	expect(game.gameScoreTable.get(4).totalScore).toBe(23);
	expect(game.getPreviousFrameResult()).toEqual([6, "/"]);
	expect(game.getPreviousFrameScore()).toBe(11);

	expect(game.throwDistribution(8)).toBe(0);
	expect(game.getCurrentTotalScore()).toBe(31);
	expect(game.gameScoreTable.get(4).totalScore).toBe(31);
	expect(game.getPreviousFrameResult()).toEqual([6, "/"]);
	expect(game.getPreviousFrameScore()).toBe(11);

	expect(game.throwDistribution(10)).toBe(0);
	expect(game.getCurrentTotalScore()).toBe(41);
	expect(game.gameScoreTable.get(5).totalScore).toBe(41);
	expect(game.getPreviousFrameResult()).toEqual([1, 8]);
	expect(game.getPreviousFrameScore()).toBe(9);

	expect(game.throwDistribution(10)).toBe(0);
	expect(game.getCurrentTotalScore()).toBe(61);
	expect(game.gameScoreTable.get(6).totalScore).toBe(61);
	expect(game.getPreviousFrameResult()).toEqual(["X"]);
	expect(game.getPreviousFrameScore()).toBe(20);

	expect(game.throwDistribution(1)).toBe(0);
	expect(game.getCurrentTotalScore()).toBe(64);
	expect(game.gameScoreTable.get(7).totalScore).toBe(64);
	expect(game.getPreviousFrameResult()).toEqual(["X"]);
	expect(game.getPreviousFrameScore()).toBe(11);

	expect(game.throwDistribution(9)).toBe(0);
	expect(game.getCurrentTotalScore()).toBe(82);
	expect(game.gameScoreTable.get(7).totalScore).toBe(82);
	expect(game.getPreviousFrameResult()).toEqual(["X"]);
	expect(game.getPreviousFrameScore()).toBe(20);

	expect(game.throwDistribution(1)).toBe(0);
	expect(game.throwDistribution(2)).toBe(0);
	expect(game.getCurrentTotalScore()).toBe(86);
	expect(game.gameScoreTable.get(8).totalScore).toBe(86);
	expect(game.getPreviousFrameResult()).toEqual([1, "/"]);
	expect(game.getPreviousFrameScore()).toBe(11);

	expect(game.throwDistribution(2)).toBe(0);
	expect(game.throwDistribution(4)).toBe(0);
	expect(game.getCurrentTotalScore()).toBe(92);
	expect(game.gameScoreTable.get(9).totalScore).toBe(92);
	expect(game.getPreviousFrameResult()).toEqual([1, 2]);
	expect(game.getPreviousFrameScore()).toBe(3);

	expect(game.throwDistribution(1)).toBe(0);
	expect(game.getCurrentTotalScore()).toBe(93);
	expect(game.gameScoreTable.get(10).totalScore).toBe(93);
	expect(game.getPreviousFrameResult()).toEqual([2, 4]);
	expect(game.getPreviousFrameScore()).toBe(6);

	expect(game.throwDistribution(8)).toBe(0);
	expect(game.getCurrentTotalScore()).toBe(101);
	expect(game.gameScoreTable.get(10).totalScore).toBe(101);
	expect(game.getPreviousFrameResult()).toEqual([2, 4]);
	expect(game.getPreviousFrameScore()).toBe(6);

	expect(game.throwDistribution(1)).toBe(0);
	expect(game.getCurrentTotalScore()).toBe(102);
	expect(game.gameScoreTable.get(10).totalScore).toBe(102);
	expect(game.getPreviousFrameResult()).toEqual([2, 4]);
	expect(game.getPreviousFrameScore()).toBe(6);
});