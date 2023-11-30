
(function(){
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
			gameOver = true;
			return true;
		}
		return false;
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
	const checkColumnWin = () => {
		const firstColumn =
			[gameBoard.board[0][0], gameBoard.board[1][0], gameBoard.board[2][0]];
		const secondColumn =
			[gameBoard.board[0][1], gameBoard.board[1][1], gameBoard.board[2][1]];
		const thirdColumn =
			[gameBoard.board[0][2], gameBoard.board[1][2], gameBoard.board[2][2]];
		
		const firstSet = new Set(firstColumn);
		const secondSet = new Set(secondColumn);
		const thirdSet = new Set(thirdColumn);
			
		if ((firstSet.size === 1 && !firstSet.has(''))
			|| (secondSet.size === 1 && !secondSet.has(''))
			|| (thirdSet.size === 1 && !thirdSet.has(''))) {
			return true;
		};
		return false;
	};
	const checkWin = () => {
		if (checkRowWin() || checkDiagonalWin() ||checkColumnWin()) {
			gameOver = true;
			return true;
		};
		return false;
	};
	const checkGameOver = () => gameOver;

	return { checkWin, checkTie, checkGameOver}
})();

// PLAYER
const createPlayer = (name, marker) => {
	let turn = false;
	let playerScore = 0

	const markGrid = (row, column) => {gameBoard.board[row][column] = marker};
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
			if (playerArray[0].marker === 'O') {
				return 'X';
			} else {
				return 'O';
			};
		};
		return playerOneMarker;
	};

	const getPlayer = () => {
		playerArray.push(createPlayer(promptPlayerName(), promptPlayerMarker()));
	}
	const switchTurns = () => {
		if (playerArray.length < 2) {
			console.log("Player Array is empty.");
			return false
		}else {
			// Swap the "turn" property of the first two players in the array
			[playerArray[0].turn, playerArray[1].turn] = 
			[playerArray[1].turn, playerArray[0].turn];
		};
		displayController.renderHeader();
	};
	const getWhoseTurn = () => {
		if (winController.checkWin()) {
			if (playerArray[0].turn === true) {
				return playerArray[1].name;
			}else {
				return playerArray[0].name;
			}
		}
		if (playerArray[0].turn === true) {
			return playerArray[0].name;
		}else {
			return playerArray[1].name;
		}
	}
	const PlayRound = () => {
		// Get the first Player
		getPlayer();
		//Get the second Player
		getPlayer();
		// Set Player Turn to first Player
		gameController.playerArray[0].turn = true;
		displayController.renderHeader();
	}

	return { playerArray, getPlayer, PlayRound, switchTurns, getWhoseTurn }
})();

// DISPLAY FUNCTIONALITY
const displayController = (function () {
	
	let container = document.querySelector(".container");
	let gridElement = document.querySelector(".grid");
	let startButton = document.querySelector("button"); 
	let headerText = document.querySelector("h3");

	 // MAIN GAME LOGIC (for some reason it's here)
	const gridDisplay = (function () {
		container.addEventListener('click', function (event) {
			// Check if the clicked element is a div with the class 'grid'
			if (event.target.classList.contains('grid')) {
				let row = event.target.dataset.row;
				let col = event.target.dataset.col;

				if (gameController.playerArray[0].turn === true) {
					gameController.playerArray[0].markGrid(row, col);
				}else {
					gameController.playerArray[1].markGrid(row, col);
				};
				render();
				gameController.switchTurns();
				winController.checkTie();
				if (winController.checkGameOver() || winController.checkWin()){
					toggleGameBoard();
					console.log("game over");
				}	
			};
		});
	})();

	const render = function() {
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				gridElement = document.querySelector(`.grid[data-row="${i}"][data-col="${j}"]`);
				gridElement.textContent = gameBoard.board[i][j];
				
			};
		};
	};
	// Start Button Functionality Anonymous Function
	(function () {
		startButton.addEventListener("click", function () {
			gameController.PlayRound();
		})
	})();
	// Render Header Text
	const renderHeader = function() {
		if (winController.checkGameOver()){
			headerText.innerText = `${gameController.getWhoseTurn()} Wins. Game Over.`
		}
		headerText.innerText = `${gameController.getWhoseTurn()}'s Turn.`
	};
	//
	const toggleGameBoard = () => {
		container.classList.toggle("hide");
		document.querySelector(".gameOver").classList.toggle("hide")
		if (winController.checkWin()) {
		document.querySelector(".winner").innerText = `${gameController.getWhoseTurn()} Wins!`
		}else {
			document.querySelector(".winner").innerText = "It is a Tie!"
		}
	};
	const restartGame = (function () {
		document.querySelector(".restart").addEventListener("click", function () {
			location.reload();
		})
	})();
	return { render, renderHeader }
})();
})();