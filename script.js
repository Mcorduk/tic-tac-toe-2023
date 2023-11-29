// GAME BOARD
const gameBoard = (function () {
	const createBoard = () => {
		let emptyBoard = [];
		let gridSize = 3;
		for (let i = 0; i < gridSize; i++) {
			let emptyRow = [];
			for (let j = 0; j < gridSize; j++) {
				emptyRow.push("");
			}
			emptyBoard.push(emptyRow);
		}
		console.log(emptyBoard);
		return emptyBoard;
	};
	let board = createBoard();

	return { board, createBoard };
})();

//DISPLAY
const displayController = (function () {
	let gameOver = false;
	const markGrid = (marker,row,column) => {
		const currentRow = gameBoard.board[row]
		// Has access to the factoryFunction 
		// created Game Board Object and board property
		currentRow[column] = marker
	};
	const checkRowWin = (currentRow) => {
		const uniqueValue = new Set(currentRow);
		return  uniqueValue.size == 1;
	};
	const checkDiagonalWin = () => {};
	return {markGrid ,checkRowWin}
})();
// PLAYER
const Player = (name, marker) => {
	
	return { name, marker };
};