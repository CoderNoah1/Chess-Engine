import readline from "readline";
import { getIndexNotation } from "./utils/getIndexNotation.js"
import { evaluateBoard } from "./utils/evaluateBoard.js";
import { isValidMove } from "./utils/isValidMove.js";
import { pieces } from "./pieces.js";
import { board } from "./board.js";
import { getBestMove } from "./utils/getBestMove.js";
import { getChessNotation } from "./utils/getChessNotation.js";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

export let colorTurn = "white";

function updateBoard (board, move) {
    const { isKingSideCastle, isQueenSideCastle, piece, fromRow, fromCol, toRow, toCol, pieceSecondary, isCapture, isCheck, isCheckMate, promotedTo } = move;

    const color = piece.includes("white") ? "white" : piece.includes("black") ? "black" : null
    const pieceMap = {"Q": `${color}Queen`,
                      "R": `${color}Rook`,
                      "B": `${color}Bishop`,
                      "N": `${color}Knight`,
    }

    if (isKingSideCastle || isQueenSideCastle) {
        board.movePiece(fromRow, fromCol, toRow, toCol);
        board.movePiece(pieceSecondary.fromRow, pieceSecondary.fromCol, pieceSecondary.toRow, pieceSecondary.toCol);
        return "true casteling";
    }

    if (promotedTo !== null) {
        board.movePiece(fromRow, fromCol, toRow, toCol);
        board.setSquare(toRow, toCol, pieceMap[promotedTo]);
        return "true promotion";
    }

    board.movePiece(fromRow, fromCol, toRow, toCol);
    return "true normal move";
}

function turn (board) {

    const engineMove = getBestMove(board, true);
    colorTurn = "black";
    const chessNotationEngineMove = getChessNotation(engineMove);

    rl.question(chessNotationEngineMove + ": ", (move) => {
        // get index notation from chess notation
        const indexNotationPerson = getIndexNotation(board, move, colorTurn);
        colorTurn = "white";

        // update Board
        updateBoard(board, engineMove);
        updateBoard(board, indexNotationPerson);

        turn(board);
    });
}

turn(board);
