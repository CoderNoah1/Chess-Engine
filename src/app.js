import readline from "readline";
import { getIndexNotation } from "./utils/getIndexNotation.js"
import { evaluateBoard } from "./utils/evaluateBoard/evaluateBoard.js";
import { isValidMove } from "./utils/isValidMove.js";
import { pieces } from "./pieces.js";
import { board } from "./board.js";
import { getBestMove } from "./utils/getBestMove.js";
import { getChessNotation } from "./utils/getChessNotation.js";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

export let turnCount = 0;

function turn () {

    const engineMove = getBestMove(board, false);
    // console.log("engineMove in indexNotation: ", engineMove)
    console.log("engineMove in chessNotation: ", getChessNotation(engineMove.piece, engineMove.fromRow, engineMove.fromCol, engineMove.toRow, engineMove.toCol, engineMove.isCapture, engineMove.isCheck, false))

    rl.question(engineMove, (move) => {

        // get index notation from chess notation
        // turnCount++;
        // const indexNotationEngine = getIndexNotation(engineMove, turnCount);
        const indexNotationPerson = getIndexNotation(move, turnCount);

        // update Board
        board.setSquare(engineMove.fromRow, engineMove.fromCol, pieces.emptySquare);
        board.setSquare(engineMove.toRow, engineMove.toCol, engineMove.piece);

        board.setSquare(indexNotationPerson.fromRow, indexNotationPerson.fromCol, pieces.emptySquare);
        board.setSquare(indexNotationPerson.toRow, indexNotationPerson.toCol, indexNotationPerson.piece);
        // board.printBoard();

        turn();
    });
}

turn();