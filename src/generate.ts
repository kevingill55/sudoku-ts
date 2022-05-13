// starting board is a 9x9 matrix of 0s

/**
 * Backtracking Sudoku Algorithm:
 * (1) Get next empty cell
 * (2) Generate random order of numbers 1-9
 * (3) Starting at the beginning of the array, determine if current number is safe to play. Must be row, column, and box safe.
 * (4) Continue this process for each number that is safely entered.
 * (5) If a number is not safe to play and there are no more options left, backtrack to last "safe" move and continue.
 */

type Square = {
  row: number,
  col: number,
}

type SafetyCheckProps = {
  board: number[][],
  empty: Square,
  num: number,
}

const SUDOKU_NUMBERS = [1,2,3,4,5,6,7,8,9];
const EMPTY_BOARD = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0]
];

function getNextEmpty (board: number[][]) {
  const next: Square = { row: -1, col: -1 };
  for (let i = 0; i < board.length; i++) {
    const row = board[i];
    const firstEmpty = row.find(col => col === 0);
    if (firstEmpty === undefined) continue;
    
    next.row = i;
    next.col = row.indexOf(firstEmpty);
    break;
  }
  return next;
}

function shuffle (arr: number[]) {
  const tempArr = [...arr];
  for (let i = 0; i < tempArr.length; i++) {
    const j = Math.floor(Math.random() * (i + 1));
    [tempArr[i], tempArr[j]] = [tempArr[j], tempArr[i]];
  }
  return tempArr;
}

function isRowSafe (props: SafetyCheckProps) {
  const { board, empty: { row: rowIndex }, num } = props;
  return !board[rowIndex].some(square => square === num);
}

function isColSafe (props: SafetyCheckProps) {
  const { board, empty: { col: colIndex }, num } = props;
  for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
    if (board[rowIndex][colIndex] === num) return false;
  }
  return true;
}

function isBoxSafe (props: SafetyCheckProps) {
  const { board, empty: { row: rowIndex, col: colIndex }, num } = props;
  const startingRow = rowIndex - (rowIndex % 3);
  const startingCol = colIndex - (colIndex % 3);

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[startingRow + i][startingCol + j] === num) return false;
    }
  }

  return true;
}

function safe (props: SafetyCheckProps) {
  return isRowSafe(props) && isColSafe(props) && isBoxSafe(props);
}

function generate (board: number[][]) {
  const empty = getNextEmpty(board);
  if (empty.row === -1 || empty.col === -1) return [];

  const shuffledNumbers = shuffle(SUDOKU_NUMBERS);
  for (let i = 0; i < shuffledNumbers.length; i++) {
    const num = shuffledNumbers[i];
    const safetyCheckArguments = { board, empty, num };

    if (safe(safetyCheckArguments)) {
      board[empty.row][empty.col] = num;
      const proceed = generate(board);
      if (proceed) return board;
      board[empty.row][empty.col] = 0;
    }
  }
  return false;
}

export function instantiate () {
  const starting = [...EMPTY_BOARD];
  return generate(starting);
}
