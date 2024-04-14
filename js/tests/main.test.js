const Game = require("../js/main");

test("Getting a current totalScore with an empty table", () => {
	const game = new Game();

	expect(game.getCurrentTotalScore()).toBe(0);
})