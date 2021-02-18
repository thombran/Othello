'use strict';
/**
 * Othello game
 * Author(s): Brandon Thomas
 */
class Othello {

	// Constructs and initializes the board of given size
	constructor(size, startPlayer, discColor) {
		// validate arguments
		if (size < 4 || size > 8 || size % 2 !== 0) {
			throw new Error("Invalid value for board size.");
		}
		if (startPlayer < 1 || startPlayer > 2) {
			throw new Error("Invalid value for player number.");
		}
		if (discColor !== Othello.WHITE && discColor !== Othello.BLACK) {
			throw new Error("Invalid value for disc.");
		}

		// set instance variables
		this.size = size;
		this.turn = startPlayer;
		this.disc = discColor;

		// set two more instance variables p1Disc and p2Disc
		if (this.turn === 1) {
			this.p1Disc = this.disc;
			this.p2Disc = this.disc === Othello.WHITE ? Othello.BLACK : Othello.WHITE;
		} else {
			this.p2Disc = this.disc;
			this.p1Disc = this.disc === Othello.WHITE ? Othello.BLACK : Othello.WHITE;
		}

		// create the grid (as array of arrays)
		this.board = new Array(this.size);
		for (let i = 0; i < this.board.length; i++) {
			this.board[i] = new Array(this.size);
			this.board[i].fill(0);
		}

		// initialize the grid
		this.initializeBoard();
	}

	// Getter for white disc
	static get WHITE() {
		return "W";
	}

	// Getter for black disc
	static get BLACK() {
		return "B";
	}

	// Getter for empty
	static get EMPTY() {
		return "-";
	}

	// Getter for tie
	static get TIE() {
		return "T";
	}

	// Initializes the board with start configuration of discs (as per project specs)
	initializeBoard() {
		console.log(this.size);
		for (let row = 0; row < this.size; row++) {
			for (let col = 0; col < this.size; col++) {
				if ((row == ((this.size / 2) - 1) && col == (this.size / 2) - 1 || (row == this.size / 2) && col == this.size / 2)) {
					this.board[row][col] = Othello.BLACK;
				}
				else if (((row == this.size / 2) && col == (this.size / 2) - 1) || row == (this.size / 2) - 1 && col == this.size / 2) {
					this.board[row][col] = Othello.WHITE;
				}
				else {
					this.board[row][col] = Othello.EMPTY;
				}
			}
		}

	}

	// Returns true if placing the disc of current player at row,col is valid; else returns false
	isValidMove(row, col) {
		return this.isValidMoveForDisc(row, col, this.disc);
	}
	/*
	checkNorth(row, col, disc) {
		var numDisc = 0;
		var numNotDisc = 0;
		var numEmpty = 0;

		for (let i = row + 1; i < this.size; i++) {
			if (i == size)
				break;
			if (this.board[i][col] === disc) {
				numDisc++;
				if (numDisc > 0 && numNotDisc == 0 || numEmpty > 0)
					return false;
				if (numNotDisc > 0 && numDisc > 0)
					return true;
			}
			if (this.board[i][col] != disc && board[i][col] !== Othello.EMPTY)
				numNotDisc++;
			if (board[i][col] === Othello.EMPTY)
				numEmpty++;
		}
		return false;
	}

	checkSouth(row, col, disc) {
		var numDisc = 0;
		var numNotDisc = 0;
		var numEmpty = 0;

		for (let i = row - 1; i >= 0; i--) {
			if (i < 0)
				break;
			if (this.board[i][col] === disc) {
				numDisc++;
				if (numDisc > 0 && numNotDisc == 0 || numEmpty > 0)
					return false;
				if (numNotDisc > 0 && numDisc > 0)
					return true;
			}
			if (this.board[i][col] != disc && board[i][col] !== Othello.EMPTY)
				numNotDisc++;
			if (board[i][col] === Othello.EMPTY)
				numEmpty++;
		}
		return false;
	}

	checkEast(row, col, disc) {
		var numDisc = 0;
		var numNotDisc = 0;
		var numEmpty = 0;

		for (let i = col + 1; i < this.size; i++) {
			if (i == size)
				break;
			if (this.board[row][i] === disc) {
				numDisc++;
				if (numDisc > 0 && numNotDisc == 0 || numEmpty > 0)
					return false;
				if (numNotDisc > 0 && numDisc > 0)
					return true;
			}
			if (this.board[row][i] != disc && board[row][i] !== Othello.EMPTY)
				numNotDisc++;
			if (board[row][i] === Othello.EMPTY)
				numEmpty++;
		}
		return false;
	}

	checkWest(row, col, disc) {
		var numDisc = 0;
		var numNotDisc = 0;
		var numEmpty = 0;

		for (let i = col - 1; i >= 0; i--) {
			if (i < 0)
				break;
			if (this.board[row][i] === disc) {
				numDisc++;
				if (numDisc > 0 && numNotDisc == 0 || numEmpty > 0)
					return false;
				if (numNotDisc > 0 && numDisc > 0)
					return true;
			}
			if (this.board[row][i] != disc && board[row][i] !== Othello.EMPTY)
				numNotDisc++;
			if (board[row][i] === Othello.EMPTY)
				numEmpty++;
		}
		return false;
	}

	checkNortheast(row, col, disc) {
		var numDisc = 0;
		var numNotDisc = 0;
		var numEmpty = 0;

		let j = col + 1
		for (let i = row - 1; i >= 0; i--) {
			if (i < 0 || j == size)
				break;
			if (this.board[i][j] === disc) {
				numDisc++;
				if (numDisc > 0 && numNotDisc == 0 || numEmpty > 0)
					return false;
				if (numNotDisc > 0 && numDisc > 0)
					return true;
			}
			if (this.board[i][j] != disc && board[i][j] !== Othello.EMPTY)
				numNotDisc++;
			if (board[i][j] === Othello.EMPTY)
				numEmpty++;
			j++;
		}
		return false;
	}

	checkSouthwest(row, col, disc) {
		var numDisc = 0;
		var numNotDisc = 0;
		var numEmpty = 0;

		let j = col - 1
		for (let i = row + 1; i < size; i++) {
			if (i == this.size || j < 0)
				break;
			if (this.board[i][j] === disc) {
				numDisc++;
				if (numDisc > 0 && numNotDisc == 0 || numEmpty > 0)
					return false;
				if (numNotDisc > 0 && numDisc > 0)
					return true;
			}
			if (this.board[i][j] != disc && board[i][j] !== Othello.EMPTY)
				numNotDisc++;
			if (board[i][j] === Othello.EMPTY)
				numEmpty++;
			j--;
		}
		return false;
	}

	checkSoutheast(row, col, disc) {
		var numDisc = 0;
		var numNotDisc = 0;
		var numEmpty = 0;

		let j = col + 1
		for (let i = row + 1; i < size; i++) {
			if (i == size || j == size)
				break;
			if (this.board[i][j] === disc) {
				numDisc++;
				if (numDisc > 0 && numNotDisc == 0 || numEmpty > 0)
					return false;
				if (numNotDisc > 0 && numDisc > 0)
					return true;
			}
			if (this.board[i][j] != disc && board[i][j] !== Othello.EMPTY)
				numNotDisc++;
			if (board[i][j] === Othello.EMPTY)
				numEmpty++;
			j++;
		}
		return false;
	}

	checkNorthwest(row, col, disc) {
		var numDisc = 0;
		var numNotDisc = 0;
		var numEmpty = 0;

		let j = col - 1
		for (let i = row - 1; i >= 0; i--) {
			if (i < 0 || j < 0)
				break;
			if (this.board[i][j] === disc) {
				numDisc++;
				if (numDisc > 0 && numNotDisc == 0 || numEmpty > 0)
					return false;
				if (numNotDisc > 0 && numDisc > 0)
					return true;
			}
			if (this.board[i][j] != disc && board[i][j] !== Othello.EMPTY)
				numNotDisc++;
			if (board[i][j] === Othello.EMPTY)
				numEmpty++;
			j--;
		}
		return false;
	}
	
	// Returns true if placing the specified disc at row,col is valid; else returns false
	isValidMoveForDisc(row, col, disc) {
		if (this.checkNorth || this.checkSouth || this.checkEast || this.checkWest ||
			this.checkNortheast || this.checkNorthwest || this.checkSoutheast || this.checkSouthwest) {
				return true;
			}
		// DO NOT DELETE - if control reaches this statement, then it is not a valid move
		return false; // not a valid move
	}

	// Places the disc of current player at row,col and flips the opponent discs as needed
	placeDiscAt(row, col) {
		if (!this.isValidMove(row, col)) {
			return;
		}

		if (checkWest(row, col, this.disc)) {
			let colPos = col - 1;
			//Make sure current pos it neither curr player disc color, nor empty spot (no discs)
			while (this.board[row][colPos] != this.disc && this.board[row][colPos] != Othello.EMPTY && colPos >= 0) {
				this.board[row][colPos] = this.disc;
				colPos--;
			}
		}
	
		//Same as above, but for E direction
		if (checkEast(row, col, this.disc)) {
			let colPos = col + 1;
			while (this.board[row][colPos] != this.disc && this.board[row][colPos] != Othello.EMPTY && colPos < size) {
				this.board[row][colPos] = this.disc;
				colPos++;
			}
		}
	
		//Same as above, but for S direction
		if (checkSouth(row, col, this.disc)) {
			let rowPos = row - 1;
			while (this.board[rowPos][col] != this.disc && this.board[rowPos][col] != Othello.EMPTY && rowPos >= 0) {
				this.board[rowPos][col] = this.disc;
				rowPos--;
			}
		}
	
		//Same as above, but for N direction
		if (checkNorth(row, col, this.disc)) {
			let rowPos = row + 1;
			while (this.board[rowPos][col] != this.disc&& this.board[rowPos][col] != Othello.EMPTY && rowPos < size) {
				this.board[rowPos][col] = this.disc;
				rowPos++;
			}
		}
	
		//Same as above, but for NE direction
		if (checkNortheast(row, col, this.disc)) {
			let diagPosRow = row - 1;
			let diagPosCol = col + 1;
			while (this.board[diagPosRow][diagPosCol] != this.disc && this.board[diagPosRow][diagPosCol] != Othello.EMPTY && diagPosRow >= 0 &&
				   diagPosCol < size) {
				this.board[diagPosRow][diagPosCol] = this.disc;
				diagPosRow--;
				diagPosCol++;
			}
		}
	
		//Same as above, but for SW direction
		if (checkSouthwest(row, col, this.disc)) {
			let diagPosRow = row + 1;
			let diagPosCol = col - 1;
			while (this.board[diagPosRow][diagPosCol] != this.disc && this.board[diagPosRow][diagPosCol] != Othello.EMPTY&& diagPosRow < size &&
				   diagPosCol >= 0) {
				this.board[diagPosRow][diagPosCol] = this.disc;
				diagPosRow++;
				diagPosCol--;
			}
		}
	
		//Same as above, but for SE direction
		if (checkSoutheast(row, col, this.disc)) {
			let diagPosRow = row + 1;
			let diagPosCol = col + 1;
			while (this.board[diagPosRow][diagPosCol] != this.disc && this.board[diagPosRow][diagPosCol] != Othello.EMPTY && diagPosRow < size &&
				   diagPosCol < size) {
				this.board[diagPosRow][diagPosCol] = this.disc;
				diagPosRow++;
				diagPosCol++;
			}
		}
	
		//Same as above, but for NW direction
		if (checkNorthwest(row, col, this.disc)) {
			let diagPosRow = row - 1;
			let diagPosCol = col - 1;
			while (this.board[diagPosRow][diagPosCol] != this.disc && this.board[diagPosRow][diagPosCol] != Othello.EMPTY && diagPosRow >= 0 && diagPosCol >= 0) {
				this.board[diagPosRow][diagPosCol] = this.disc;
				diagPosRow--;
				diagPosCol--;
			}
		}

		// place the current player's disc at row,col
		this.board[row][col] = this.disc;

		// DO NOT DELETE - prepares for next turn if game is not over
		if (!this.isGameOver()) {
			this.prepareNextTurn();
		}
	}
	*/
	// Sets turn and disc information for next player
	prepareNextTurn() {
		if (this.turn === 1) {
			this.turn = 2;
		} else {
			this.turn = 1;
		}
		if (this.disc === Othello.WHITE) {
			this.disc = Othello.BLACK;
		} else {
			this.disc = Othello.WHITE;
		}
	}

	// Returns true if a valid move for current player is available; else returns false
	isValidMoveAvailable() {
		return this.isValidMoveAvailableForDisc(this.disc);
	}

	// Returns true if a valid move for the specified disc is available; else returns false
	isValidMoveAvailableForDisc(disc) {
		for (let i = 0; i < this.size; i++) {
			for (let j = 0; j < this.size; j++) {
				if (board[i][j] === Othello.EMPTY) {
					if (this.isValidMoveForDisc(i, j, disc)) {
						return true;
					}
				}
			}
		}
		// DO NOT DELETE - if control reaches this statement, then a valid move is not available
		return false; // not a valid move
	}

	// Returns true if the board is fully occupied with discs; else returns false
	isBoardFull() {
		//Go row by row and col by col and check to see if there is any empty board spots. If there is, board is not full (false)
		for (let row = 0; row < this.size; row++) {
			for (let col = 0; col < this.size; col++) {
				if (this.board[row][col] === Othello.EMPTY) {
					return false;
				}
			}
		}
		return true;
	}

	// Returns true if either the board is full or a valid move is not available for either disc
	isGameOver() {
		return this.isBoardFull() ||
			(!this.isValidMoveAvailableForDisc(Othello.WHITE) &&
				!this.isValidMoveAvailableForDisc(Othello.BLACK));
	}

	// If there is a winner, it returns Othello.WHITE or Othello.BLACK.
	// In case of a tie, it returns Othello.TIE
	checkWinner() {
		var numBlack = 0; //Number of white pieces on the board
		var numWhite = 0; //Number of black pieces on the board


		//Go row by row and col by col and check what piece is in each section of the board, increment counts
		for (let row = 0; row < this.size; row++) {
			for (let col = 0; col < this.size; col++) {
				if (this.board[row][col] === Othello.BLACK) {
					numBlack++;
				}
				else if (this.board[row][col] === Othello.WHITE) {
					numWhite++;
				}
			}
		}
		// If more black pieces than white, return BLACK, more white than black return WHITE, otherwise it's a TIE
		if (numBlack > numBlack) {
			return Othello.BLACK;
		}
		if (numWhite > numBlack) {
			return Othello.WHITE;
		}
		else {
			return Othello.TIE;
		}
	}

	// Returns a string representation of the board (for display purposes)
	toString() {
		let str = '\n ';
		for (let i = 0; i < this.size; i++) {
			str += ' ' + (i + 1);
		}
		str += "\n";
		for (let i = 0; i < this.size; i++) {
			str += i + 1 + ' ';
			str += this.board[i].join(' ') + "\n";
		}
		return str;
	}
}

exports.Othello = Othello;
