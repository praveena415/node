import * as readline from "readline";

type Player = {
  name: string;
  symbol: string;
};

type Cell = string;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question: string): Promise<string> {
  return new Promise((resolve) => rl.question(question, resolve));
}

class TicTacToe {
  private board: Cell[][];
  private players: Player[] = [];
  private currentPlayerIndex = 0;
  private lockedCenterOwner: string | null = null;
  private gameOver = false;

  constructor() {
    this.board = Array.from({ length: 3 }, () => Array(3).fill("_"));
  }

  async start() {
    console.log("=== Tic Tac Toe (Diagonal Lock Variant) ===\n");
    await this.registerPlayers();
    this.displayBoard();

    while (!this.gameOver) {
      await this.playTurn();
    }

    rl.close();
  }

  async registerPlayers() {
    for (let i = 0; i < 2; i++) {
      let name = await ask(`Enter name for Player ${i + 1}: `);
      let symbol = "";

      while (true) {
        symbol = (await ask(`Enter symbol for ${name}: `)).trim();

        if (symbol === "_") {
          console.log("❌ '_' is reserved for empty cells.");
          continue;
        }

        if (this.players.some((p) => p.symbol === symbol)) {
          console.log("❌ Symbol already taken. Choose another.");
          continue;
        }

        if (symbol.length !== 1) {
          console.log("❌ Symbol must be a single character.");
          continue;
        }

        break;
      }

      this.players.push({ name, symbol });
    }
  }

  async playTurn() {
    const player = this.players[this.currentPlayerIndex];
    const input = (await ask(`\n${player.name} (${player.symbol}) enter move (e.g., A1): `)).toUpperCase();

    try {
      const { row, col } = this.parseInput(input);
      this.validateMove(player, row, col);

      this.board[row][col] = player.symbol;
      this.applyDiagonalLock(player);
      this.displayBoard();

      if (this.checkWin(player.symbol)) {
        console.log(`🎉 ${player.name} wins!`);
        this.gameOver = true;
        return;
      }

      if (this.isDraw()) {
        console.log("🤝 Game ends in a draw.");
        this.gameOver = true;
        return;
      }

      this.switchTurn();
    } catch (error: any) {
      console.log(`❌ ${error.message}`);
    }
  }
  parseInput(input: string) {
    if (!/^[ABC][123]$/.test(input)) {
      throw new Error("Invalid input format. Use A1–C3.");
    }

    const row = input.charCodeAt(0) - 65;
    const col = parseInt(input[1]) - 1;

    return { row, col };
  }

  validateMove(player: Player, row: number, col: number) {
    if (this.board[row][col] !== "_") {
      throw new Error("Cell already occupied.");
    }

    if (
      row === 1 &&
      col === 1 &&
      this.lockedCenterOwner &&
      this.lockedCenterOwner !== player.symbol
    ) {
      throw new Error("Center cell is locked for the opponent.");
    }
  }

  applyDiagonalLock(player: Player) {
    if (this.board[1][1] !== "_") return;

    const s = player.symbol;
    const mainDiagonal = this.board[0][0] === s && this.board[2][2] === s;
    const antiDiagonal = this.board[0][2] === s && this.board[2][0] === s;

    if (mainDiagonal || antiDiagonal) {
      this.lockedCenterOwner = s;
      console.log("🔒 Center cell (B2) is now locked!");
    }
  }

  checkWin(symbol: string): boolean {
    for (let i = 0; i < 3; i++) {
      if (this.board[i].every((c) => c === symbol)) return true;
      if (this.board.every((row) => row[i] === symbol)) return true;
    }

    if (
      this.board[0][0] === symbol &&
      this.board[1][1] === symbol &&
      this.board[2][2] === symbol
    )
      return true;

    if (
      this.board[0][2] === symbol &&
      this.board[1][1] === symbol &&
      this.board[2][0] === symbol
    )
      return true;

    return false;
  }

  isDraw(): boolean {
    return this.board.flat().every((cell) => cell !== "_");
  }

  displayBoard() {
    console.log("\n   1 2 3");
    ["A", "B", "C"].forEach((label, i) => {
      console.log(`${label}  ${this.board[i].join(" ")}`);
    });
  }

  switchTurn() {
    this.currentPlayerIndex = 1 - this.currentPlayerIndex;
  }
}

const game = new TicTacToe();
game.start();
