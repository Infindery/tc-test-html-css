const Game = require("../main");

// getCurrentTotalScore()
test("Calling the getCurrentTotalScore() method when the table is empty.", () => {
	const game = new Game();
	expect(game.getCurrentTotalScore()).toBe(0);
});

test("Calling the getCurrentTotalScore() method on a table that has records.", () => {
	const game = new Game();
	game.throwDistribution(5);
	game.throwDistribution(4);
	game.throwDistribution(3);
	expect(game.getCurrentTotalScore()).toBe(12);
});

test("Call getCurrentTotalScore() method on each throw.", () => {
	const game = new Game();
	game.throwDistribution(5);
	game.throwDistribution(3);
	game.throwDistribution(5);
	expect(game.getCurrentTotalScore()).toBe(13);
	game.throwDistribution(4);
	expect(game.getCurrentTotalScore()).toBe(17);
	game.throwDistribution(3);
	expect(game.getCurrentTotalScore()).toBe(20);
});


// getPreviousFrameResult()
test("Calling the getPreviousFrameResult() method when the table is empty.", () => {
	const game = new Game();
	expect(game.getPreviousFrameResult()).toBe(-1);
});

test("Calling the getPreviousFrameResult() method on a table that has records.", () => {
	const game = new Game();
	game.throwDistribution(5);
	game.throwDistribution(4);
	game.throwDistribution(3);
	expect(game.getPreviousFrameResult()).toEqual([5, 4]);
});

test("Call getPreviousFrameResult() method on each throw.", () => {
	const game = new Game();
	game.throwDistribution(5);
	game.throwDistribution(3);
	game.throwDistribution(5);
	expect(game.getPreviousFrameResult()).toEqual([5, 3]);
	game.throwDistribution(4);
	expect(game.getPreviousFrameResult()).toEqual([5, 3]);
	game.throwDistribution(3);
	expect(game.getPreviousFrameResult()).toEqual([5, 4]);
});


// getPreviousFrameScore()
test("Calling the getPreviousFrameScore() method when the table is empty.", () => {
	const game = new Game();
	expect(game.getPreviousFrameScore()).toBe(-1);
});

test("Calling the getPreviousFrameScore() method on a table that has records.", () => {
	const game = new Game();
	game.throwDistribution(5);
	game.throwDistribution(4);
	game.throwDistribution(3);
	expect(game.getPreviousFrameScore()).toBe(9);
});

test("Call getPreviousFrameScore() method on each throw.", () => {
	const game = new Game();
	game.throwDistribution(5);
	game.throwDistribution(3);
	game.throwDistribution(5);
	expect(game.getPreviousFrameScore()).toBe(8);
	game.throwDistribution(4);
	expect(game.getPreviousFrameScore()).toBe(8);
	game.throwDistribution(3);
	expect(game.getPreviousFrameScore()).toBe(9);
});


// updateFrameAndTotalScore()
test("Calling the updateFrameAndTotalScore() method on a table without strike/spear.", () => {
	const game = new Game();
	game.recordingResultToFrame(1, 5);
	game.recordingResultToFrame(1, 4);
	game.recordingResultToFrame(2, 3);
	game.recordingResultToFrame(2, 6);
	expect(game.getCurrentTotalScore()).toBe(18);
	expect(game.updateFrameAndTotalScore(6)).toBe(0);
	expect(game.getCurrentTotalScore()).toBe(18);
});

test("Calling the updateFrameAndTotalScore() method for a table with strike in 1 frame.", () => {
	const game = new Game();
	game.recordingResultToFrame(1, 10);
	game.pointsAccuralQueue.push([1, 2]);
	expect(game.gameScoreTable.get(1).frameScore).toBe(10);

	game.recordingResultToFrame(2, 4);
	expect(game.updateFrameAndTotalScore(4)).toBe(0);
	expect(game.gameScoreTable.get(1).frameScore).toBe(14);

	game.recordingResultToFrame(2, 3);
	expect(game.updateFrameAndTotalScore(3)).toBe(0);
	expect(game.gameScoreTable.get(1).frameScore).toBe(17);

	game.recordingResultToFrame(3, 5);
	expect(game.updateFrameAndTotalScore(5)).toBe(0);
	expect(game.gameScoreTable.get(1).frameScore).toBe(17);
});

test("Calling the updateFrameAndTotalScore() method for a table with spear in 1 frame.", () => {
	const game = new Game();
	game.recordingResultToFrame(1, 3);
	game.recordingResultToFrame(1, 7);
	game.pointsAccuralQueue.push([1, 1]);
	expect(game.gameScoreTable.get(1).frameScore).toBe(10);

	game.recordingResultToFrame(2, 4);
	expect(game.updateFrameAndTotalScore(4)).toBe(0);
	expect(game.gameScoreTable.get(1).frameScore).toBe(14);

	game.recordingResultToFrame(2, 3);
	expect(game.updateFrameAndTotalScore(3)).toBe(0);
	expect(game.gameScoreTable.get(1).frameScore).toBe(14);
});


// recordingResultToFrame()
test("Creating a new frame using the recordingResultToFrame() method.", () => {
	const game = new Game();
	expect(game.gameScoreTable.has(1)).toBe(false);
	expect(game.recordingResultToFrame(1, 5)).toBe(0);
	expect(game.gameScoreTable.has(1)).toBe(true);
});

test("Recording a frame without strike/spear using the recordingResultToFrame() method.", () => {
	const game = new Game();
	expect(game.recordingResultToFrame(1, 5)).toBe(0);
	expect(game.gameScoreTable.get(1).frame).toBe(1);
	expect(game.gameScoreTable.get(1).result).toEqual([5]);
	expect(game.gameScoreTable.get(1).frameScore).toBe(5);
	expect(game.gameScoreTable.get(1).totalScore).toBe(5);
});

test("Recording a frame with strike using the recordingResultToFrame() method.", () => {
	const game = new Game();
	expect(game.recordingResultToFrame(1, 10)).toBe(0);
	expect(game.gameScoreTable.get(1).frame).toBe(1);
	expect(game.gameScoreTable.get(1).result).toEqual(["X"]);
	expect(game.gameScoreTable.get(1).frameScore).toBe(10);
	expect(game.gameScoreTable.get(1).totalScore).toBe(10);
});

test("Recording a frame with spear using the recordingResultToFrame() method.", () => {
	const game = new Game();
	expect(game.recordingResultToFrame(1, 2)).toBe(0);
	expect(game.recordingResultToFrame(1, 8)).toBe(0);
	expect(game.gameScoreTable.get(1).frame).toBe(1);
	expect(game.gameScoreTable.get(1).result).toEqual([2, "/"]);
	expect(game.gameScoreTable.get(1).frameScore).toBe(10);
	expect(game.gameScoreTable.get(1).totalScore).toBe(10);
});

test("Recording a frame with '0' using the recordingResultToFrame() method.", () => {
	const game = new Game();
	expect(game.recordingResultToFrame(1, 2)).toBe(0);
	expect(game.recordingResultToFrame(1, 0)).toBe(0);
	expect(game.gameScoreTable.get(1).frame).toBe(1);
	expect(game.gameScoreTable.get(1).result).toEqual([2, "-"]);
	expect(game.gameScoreTable.get(1).frameScore).toBe(2);
	expect(game.gameScoreTable.get(1).totalScore).toBe(2);
});


// throwDistribution()
test("Passing a non-numeric value to the throwDistribution() method.", () => {
	const game = new Game();
	expect(game.throwDistribution("5")).toBe(-1);
});

test("Passing a value that is less than 0 to the throwDistribution() method.", () => {
	const game = new Game();
	expect(game.throwDistribution(-1)).toBe(-1);
});

test("Passing a value greater than 0 to the throwDistribution() method.", () => {
	const game = new Game();
	expect(game.throwDistribution(11)).toBe(-1);
});

test("Passing the correct value to the throwDistribution() method.", () => {
	const game = new Game();
	expect(game.throwDistribution(5)).toBe(0);
});

test("An attempt was made to pass a value that is greater than the available kegel number.", () => {
	const game = new Game();
	expect(game.throwDistribution(5)).toBe(0);
	expect(game.throwDistribution(6)).toBe(-1);
});

test("Checking the frame format after calling throwDistribution().", () => {
	const game = new Game();
	expect(game.throwDistribution(5)).toBe(0);
	expect(game.gameScoreTable.get(1).frame).toBe(1);
	expect(game.gameScoreTable.get(1).result).toEqual([5]);
	expect(game.gameScoreTable.get(1).frameScore).toBe(5);
	expect(game.gameScoreTable.get(1).totalScore).toBe(5);
});

test("Passing the strike to the throwDistribution() method.", () => {
	const game = new Game();
	expect(game.throwDistribution(10)).toBe(0);
	expect(game.gameScoreTable.get(1).frame).toBe(1);
	expect(game.gameScoreTable.get(1).result).toEqual(["X"]);
	expect(game.gameScoreTable.get(1).frameScore).toBe(10);
	expect(game.gameScoreTable.get(1).totalScore).toBe(10);
});

test("Passing the spear to the throwDistribution() method.", () => {
	const game = new Game();
	expect(game.throwDistribution(2)).toBe(0);
	expect(game.throwDistribution(8)).toBe(0);
	expect(game.gameScoreTable.get(1).frame).toBe(1);
	expect(game.gameScoreTable.get(1).result).toEqual([2, "/"]);
	expect(game.gameScoreTable.get(1).frameScore).toBe(10);
	expect(game.gameScoreTable.get(1).totalScore).toBe(10);
});

test("Passing two strikes to the throwDistribution() method.", () => {
	const game = new Game();
	expect(game.throwDistribution(10)).toBe(0);
	expect(game.throwDistribution(10)).toBe(0);

	expect(game.gameScoreTable.get(1).frame).toBe(1);
	expect(game.gameScoreTable.get(1).result).toEqual(["X"]);
	expect(game.gameScoreTable.get(1).frameScore).toBe(20);
	expect(game.gameScoreTable.get(1).totalScore).toBe(20);

	expect(game.gameScoreTable.get(2).frame).toBe(2);
	expect(game.gameScoreTable.get(2).result).toEqual(["X"]);
	expect(game.gameScoreTable.get(2).frameScore).toBe(10);
	expect(game.gameScoreTable.get(2).totalScore).toBe(30);
});

test("Passing two spear to the throwDistribution() method.", () => {
	const game = new Game();
	expect(game.throwDistribution(1)).toBe(0);
	expect(game.throwDistribution(9)).toBe(0);
	expect(game.throwDistribution(2)).toBe(0);
	expect(game.throwDistribution(8)).toBe(0);

	expect(game.gameScoreTable.get(1).frame).toBe(1);
	expect(game.gameScoreTable.get(1).result).toEqual([1, "/"]);
	expect(game.gameScoreTable.get(1).frameScore).toBe(12);
	expect(game.gameScoreTable.get(1).totalScore).toBe(12);

	expect(game.gameScoreTable.get(2).frame).toBe(2);
	expect(game.gameScoreTable.get(2).result).toEqual([2, "/"]);
	expect(game.gameScoreTable.get(2).frameScore).toBe(10);
	expect(game.gameScoreTable.get(2).totalScore).toBe(22);
});

test("Passing the strike and a simple value to the throwDistribution() method.", () => {
	const game = new Game();
	expect(game.throwDistribution(10)).toBe(0);
	expect(game.throwDistribution(5)).toBe(0);
	expect(game.throwDistribution(2)).toBe(0);

	expect(game.gameScoreTable.get(1).frame).toBe(1);
	expect(game.gameScoreTable.get(1).result).toEqual(["X"]);
	expect(game.gameScoreTable.get(1).frameScore).toBe(17);
	expect(game.gameScoreTable.get(1).totalScore).toBe(17);

	expect(game.gameScoreTable.get(2).frame).toBe(2);
	expect(game.gameScoreTable.get(2).result).toEqual([5, 2]);
	expect(game.gameScoreTable.get(2).frameScore).toBe(7);
	expect(game.gameScoreTable.get(2).totalScore).toBe(24);
});

test("Passing the spear and a simple value to the throwDistribution() method.", () => {
	const game = new Game();
	expect(game.throwDistribution(2)).toBe(0);
	expect(game.throwDistribution(8)).toBe(0);
	expect(game.throwDistribution(2)).toBe(0);
	expect(game.throwDistribution(5)).toBe(0);

	expect(game.gameScoreTable.get(1).frame).toBe(1);
	expect(game.gameScoreTable.get(1).result).toEqual([2, "/"]);
	expect(game.gameScoreTable.get(1).frameScore).toBe(12);
	expect(game.gameScoreTable.get(1).totalScore).toBe(12);

	expect(game.gameScoreTable.get(2).frame).toBe(2);
	expect(game.gameScoreTable.get(2).result).toEqual([2, 5]);
	expect(game.gameScoreTable.get(2).frameScore).toBe(7);
	expect(game.gameScoreTable.get(2).totalScore).toBe(19);
});

test("Passing 2 simple values to the throwDistribution() method on frame 10.", () => {
	const game = new Game();
	game.currentFrame = 9;
	expect(game.throwDistribution(2)).toBe(0);
	expect(game.throwDistribution(5)).toBe(0);

	expect(game.gameScoreTable.get(10).frame).toBe(10);
	expect(game.gameScoreTable.get(10).result).toEqual([2, 5]);
	expect(game.gameScoreTable.get(10).frameScore).toBe(7);
});

test("Passing 3 simple values to the throwDistribution() method on frame 10.", () => {
	const game = new Game();
	game.currentFrame = 9;
	expect(game.throwDistribution(2)).toBe(0);
	expect(game.throwDistribution(5)).toBe(0);
	expect(game.throwDistribution(2)).toBe(-1);

	expect(game.gameScoreTable.get(10).frame).toBe(10);
	expect(game.gameScoreTable.get(10).result).toEqual([2, 5]);
	expect(game.gameScoreTable.get(10).frameScore).toBe(7);
});

test("Passing 3 simple values with a 1 strike to the throwDistribution() method on frame 10.", () => {
	const game = new Game();
	game.currentFrame = 9;
	expect(game.throwDistribution(10)).toBe(0);
	expect(game.throwDistribution(5)).toBe(0);
	expect(game.throwDistribution(2)).toBe(0);

	expect(game.gameScoreTable.get(10).frame).toBe(10);
	expect(game.gameScoreTable.get(10).result).toEqual(["X", 5, 2]);
	expect(game.gameScoreTable.get(10).frameScore).toBe(17);
});

test("Passing 3 simple values with a 2 strike to the throwDistribution() method on frame 10.", () => {
	const game = new Game();
	game.currentFrame = 9;
	expect(game.throwDistribution(10)).toBe(0);
	expect(game.throwDistribution(10)).toBe(0);
	expect(game.throwDistribution(2)).toBe(0);

	expect(game.gameScoreTable.get(10).frame).toBe(10);
	expect(game.gameScoreTable.get(10).result).toEqual(["X", "X", 2]);
	expect(game.gameScoreTable.get(10).frameScore).toBe(22);
});

test("Passing 3 simple values with a spear to the throwDistribution() method on frame 10.", () => {
	const game = new Game();
	game.currentFrame = 9;
	expect(game.throwDistribution(2)).toBe(0);
	expect(game.throwDistribution(8)).toBe(0);
	expect(game.throwDistribution(5)).toBe(0);

	expect(game.gameScoreTable.get(10).frame).toBe(10);
	expect(game.gameScoreTable.get(10).result).toEqual([2, "/", 5]);
	expect(game.gameScoreTable.get(10).frameScore).toBe(15);
});


// Perfect game
test("Perfect game", () => {
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

// Regular game from TS
test("Regular game from TS", () => {
	const game = new Game();

	expect(game.throwDistribution(10)).toBe(0);

	expect(game.throwDistribution(7)).toBe(0);
	expect(game.throwDistribution(3)).toBe(0);

	expect(game.throwDistribution(7)).toBe(0);
	expect(game.throwDistribution(2)).toBe(0);

	expect(game.throwDistribution(9)).toBe(0);
	expect(game.throwDistribution(1)).toBe(0);

	expect(game.throwDistribution(10)).toBe(0);

	expect(game.throwDistribution(10)).toBe(0);

	expect(game.throwDistribution(10)).toBe(0);

	expect(game.throwDistribution(2)).toBe(0);
	expect(game.throwDistribution(3)).toBe(0);

	expect(game.throwDistribution(6)).toBe(0);
	expect(game.throwDistribution(4)).toBe(0);

	expect(game.throwDistribution(7)).toBe(0);
	expect(game.throwDistribution(3)).toBe(0);
	expect(game.throwDistribution(3)).toBe(0);
	expect(game.getCurrentTotalScore()).toBe(168);
});