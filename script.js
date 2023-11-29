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

	const checkRowWin = () => {
		for (const row of gameBoard.board){
			const rowSet = new Set(row);
			if (rowSet.size === 1 && !rowSet.has('')) {
				return true;
			};
		};
		return false;
	};
	const checkDiagonalWin = () => {
		const firstDiagonal = 
			[gameBoard.board[0][0],gameBoard.board[1][1],gameBoard.board[2][2]];
		const secondDiagonal = 
			[gameBoard.board[0][2],gameBoard.board[1][1],gameBoard.board[2][0]];
		const firstSet = new Set(firstDiagonal);
		const secondSet = new Set(secondDiagonal);
		if ((firstSet.size === 1 && !firstSet.has(''))
			|| (secondSet.size === 1 && !secondSet.has(''))) {
			return true;
		};
		return false;
	};
	const checkWin = () => {
		if (checkRowWin() || checkDiagonalWin()) {
			gameOver = true;
			return true;
		};
		return false;
	};
	const markGrid = (marker,row,column) => {
		const currentRow = gameBoard.board[row]
		// Has access to the factoryFunction 
		// created Game Board Object and board property
		currentRow[column] = marker
	};

	return {markGrid, checkWin}
})();

// PLAYER
const Player = (name, marker) => {
	
	return { name, marker };
};