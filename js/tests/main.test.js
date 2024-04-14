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