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
const winController = (function () {
	let gameOver = false;

	const checkTie = () => {
		// Flatten our 2d array to 
		const currentBoard = gameBoard.board.flat()

		if (!gameOver && !currentBoard.includes('')) {
			return true
		}
		return false
	};
	const checkRowWin = () => {
		for (const row of gameBoard.board) {
			const rowSet = new Set(row);
			if (rowSet.size === 1 && !rowSet.has('')) {
				return true;
			};
		};
		return false;
	};
	const checkDiagonalWin = () => {
		const firstDiagonal =
			[gameBoard.board[0][0], gameBoard.board[1][1], gameBoard.board[2][2]];
		const secondDiagonal =
			[gameBoard.board[0][2], gameBoard.board[1][1], gameBoard.board[2][0]];
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

	return { checkWin, checkTie }
})();

// PLAYER
const createPlayer = (name, marker) => {
	let turn = false;

	const markGrid = (row, column) => { gameBoard.board[row][column] = marker; };

	let playerScore = 0
	const getScore = () => playerScore;
	const addScore = () => { playerScore++; }

	return { name, marker, markGrid, turn };
};

const gameController = (function () {
	// Am I using this or what?
	const markerArray = ['O', 'X']
	let playerArray = []

	// Took this from stackOverflow :>
	function isAlphaNumeric(str) {
		var code, i, len;

		for (i = 0, len = str.length; i < len; i++) {
			code = str.charCodeAt(i);
			if (!(code > 64 && code < 91) && // upper alpha (A-Z)
				!(code > 96 && code < 123)) { // lower alpha (a-z)
				return false;
			}
		}
		return true;
	};
	// Ask for a valid name and return it
	const promptPlayerName = () => {

		let playerName =
			prompt(`Player ${(playerArray.length) === 0 ? "One" : "Two"} Name:`);
		while (!isAlphaNumeric(playerName)) {
			playerName = 
			prompt(`Player ${(playerArray.length) === 0 ? "One" : "Two"} Name:`);
		};
		if (playerArray.length == 1) {
			if (playerArray[0].name === playerName) {
				alert("Name can not be the same as the other player");
				return promptPlayerName();
			};
		};
		return playerName;
	};
	// Ask for a valid marker and return it.
	const promptPlayerMarker = () => {
		let playerOneMarker;
		if (playerArray.length == 0) {
			playerOneMarker = 
				prompt("Pick Marker: 'O' or 'X'").toUpperCase();
			while (!markerArray.includes(playerOneMarker)) {
				playerOneMarker = 
					prompt("Pick a valid Marker: 'O' or 'X'").toUpperCase();
			}
		} else {
			if (playerArray[0].marker === 'O'){
				return 'X';
			}else {
				return 'O';
			};
		};
		return playerOneMarker;
	};

	const getPlayer = () => {
		playerArray.push(createPlayer(promptPlayerName(), promptPlayerMarker()));
	}

	const PlayRound = () => {
		// Get the first Player
		getPlayer();
		//Get the second Player
		getPlayer();
		// Display 
		// Wait for the first player to make a move
	}

	return { playerArray, getPlayer }
})();

const displayController = (function () {

})();