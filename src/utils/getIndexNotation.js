import { pieces } from "../pieces.js";
import { isValidMove } from "./isValidMove.js";
import { board } from "../board.js";

export function getIndexNotation(chessNotation, turnCount) {
    // Get the target square indices from chess notation
    let chessNotationArray = chessNotation.split('');

    // Maps
    const rowMap = { '1': 7, '2': 6, '3': 5, '4': 4, '5': 3, '6': 2, '7': 1, '8': 0 };
    const colMap = { 'a': 0, 'b': 1, 'c': 2, 'd': 3, 'e': 4, 'f': 5, 'g': 6, 'h': 7 };
    const pieceMap = { "R": pieces.whiteRook, "N": pieces.whiteKnight, "B": pieces.whiteBishop, "Q": pieces.whiteQueen, "K": pieces.whiteKing }

    const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
    const rows = ["1", "2", "3", "4", "5", "6", "7", "8"];
    
    let toRow = null;
    let toCol = null;

    // Find the piece type making the move
    let piece = pieces.emptySquare;
    let fromRow = -1;
    let fromCol = -1;

    let isCheck = chessNotationArray.includes("+");
    let isCheckMate = chessNotationArray.includes("#");
    let isCapture = chessNotationArray.includes("x");

    if (turnCount % 2 === 0) { // White's turn 
        for (let col = 0; col < 8; col++) {
            for (let row = 0; row < 8; row++) {
                if (chessNotationArray.length === 2) { // Pawn move

                    // sets toRow and toCol
                    toRow = rowMap[chessNotationArray[1]];
                    toCol = colMap[chessNotationArray[0]];

                    if (board.getSquare(row, col) === pieces.whitePawn && isValidMove(pieces.whitePawn, row, col, toRow, toCol)) {
                        piece = pieces.whitePawn;
                        fromRow = row;
                        fromCol = col;
                    }
                } else if (chessNotationArray.length === 3) { // Piece move / pawn checks / pawn checkmates
                    if (chessNotationArray[0] === "R" || chessNotationArray[0] === "N" || chessNotationArray[0] === "B" || chessNotationArray[0] === "Q" || chessNotationArray[0] === "K") { // piece moves

                        // sets toRow and toCol
                        toRow = rowMap[chessNotationArray[2]];
                        toCol = colMap[chessNotationArray[1]];

                        if (board.getSquare(row, col) === pieceMap[chessNotationArray[0]] && isValidMove(pieceMap[chessNotationArray[0]], row, col, toRow, toCol)) {
                            piece = pieceMap[chessNotationArray[0]];
                            fromRow = row;
                            fromCol = col;
                        }
                    } else if (chessNotationArray[2] === "+" || chessNotationArray[2] === "#") { // pawn checks / pawn checkmates

                        // sets toRow and toCol
                        toRow = rowMap[chessNotationArray[1]];
                        toCol = colMap[chessNotationArray[0]];

                        if (board.getSquare(row, col) === pieces.whitePawn && isValidMove(pieces.whitePawn, row, col, toRow, toCol)) {
                            piece = pieces.whitePawn;
                            fromRow = row;
                            fromCol = col;
                        }
                    }
                } else if (chessNotationArray.length === 4) { // pawn Captures / piece captures / Promotions / checks / checkmate / spesific piece moves by letter / and number
                    if (files.includes(chessNotationArray[0])) { // specified pawn move
                        // sets toRow and toCol
                        toRow = rowMap[chessNotationArray[3]];
                        toCol = colMap[chessNotationArray[2]];

                        if (board.getSquare(row, col) === pieces.whitePawn && isValidMove(pieces.whitePawn, row, col, toRow, toCol)) {
                            piece = pieces.whitePawn;
                            fromRow = row;
                            fromCol = col;
                        }
                    } else if (chessNotationArray[3] === "+" || chessNotationArray[3] === "#") { // piece checks / piece checkmates

                        // sets toRow and toCol
                        toRow = rowMap[chessNotationArray[2]];
                        toCol = colMap[chessNotationArray[1]];

                        const pieceType = pieceMap[chessNotationArray[0]];

                        if (pieceType && board.getSquare(row, col) === pieceType && isValidMove(pieceType, row, col, toRow, toCol)) {
                            piece = pieceType;
                            fromRow = row;
                            fromCol = col;
                        }
                    } else if (chessNotationArray[1] === "x") { // piece captures

                        // sets toRow and toCol
                        toRow = rowMap[chessNotationArray[3]];
                        toCol = colMap[chessNotationArray[2]];

                        const pieceType = pieceMap[chessNotationArray[0]];

                        if (pieceType && board.getSquare(row, col) === pieceType && isValidMove(pieceType, row, col, toRow, toCol)) {
                            piece = pieceType;
                            fromRow = row;
                            fromCol = col;
                        }
                    } else if (chessNotationArray[2] === "=") { // promotion
                        if (chessNotationArray[3] === "R" || chessNotationArray[3] === "N" || chessNotationArray[3] === "B" || chessNotationArray[3] === "Q") { // what piece does it promote too

                            // sets toRow and toCol
                            toRow = rowMap[chessNotationArray[1]];
                            toCol = colMap[chessNotationArray[0]];

                            if (board.getSquare(row, col) === pieces.whitePawn && isValidMove(pieces.whitePawn, row, col, toRow, toCol)) {
                                piece = pieces.whitePawn;
                                fromRow = row;
                                fromCol = col;
                            }
                        }
                    } else if (files.includes(chessNotationArray[1]) || rows.includes(chessNotationArray[1])) { // spesific piece moves by letter and number

                        // sets toRow and toCol
                        toRow = rowMap[chessNotationArray[3]];
                        toCol = colMap[chessNotationArray[2]];

                        const pieceType = pieceMap[chessNotationArray[0]];

                        if (pieceType && board.getSquare(row, col) === pieceType && isValidMove(pieceType, row, col, toRow, toCol)) {
                            piece = pieceType;
                            fromRow = row;
                            fromCol = col;
                        }
                    }
                } else if (chessNotationArray.length === 5) { // promotion Checks / promotion checkmate / specified checks / spesified checkmate / spesified takes / dubble specified /                    
                    if (chessNotationArray[2] === "=") { // promotion: checks / checkmate
                        if (chessNotationArray[4] === "+" || chessNotationArray[4] === "#") { // check / checkmates

                            // sets toRow and toCol
                            toRow = rowMap[chessNotationArray[1]];
                            toCol = colMap[chessNotationArray[0]];

                            if (pieceType && board.getSquare(row, col) === pieces.whitePawn && isValidMove(pieces.whitePawn, row, col, toRow, toCol)) {
                                piece = pieces.whitePawn;
                                fromRow = row;
                                fromCol = col;
                            }
                        }
                    } else if (chessNotationArray[4] === "+" || chessNotationArray[4] === "#") { // specified checks / specified checkmates / spesified captures                        
                        if (files.includes(chessNotationArray[1]) || rows.includes(chessNotationArray[1]) || chessNotationArray[1] === "x") { // spesific piece moves by letter and number check
                            // sets toRow and toCol
                            toRow = rowMap[chessNotationArray[3]];
                            toCol = colMap[chessNotationArray[2]];

                            const pieceType = pieceMap[chessNotationArray[0]];

                            if (board.getSquare(row, col) === pieceType && isValidMove(pieceType, row, col, toRow, toCol)) {
                                piece = pieceType;
                                fromRow = row;
                                fromCol = col;
                            }
                        }
                    } else if (chessNotationArray[2] === "x") {
                        if (files.includes(chessNotationArray[1]) || rows.includes(chessNotationArray[1])) { // spesific piece moves by letter and number check

                            // sets toRow and toCol
                            toRow = rowMap[chessNotationArray[4]];
                            toCol = colMap[chessNotationArray[3]];

                            const pieceType = pieceMap[chessNotationArray[0]];

                            if (pieceType && board.getSquare(row, col) === pieceType && isValidMove(pieceType, row, col, toRow, toCol)) {
                                piece = pieceType;
                                fromRow = row;
                                fromCol = col;
                            }
                        }
                    }
                    // dubble specified
                    for (let letter = 0; letter < 8; letter++) {
                        for (let number = 0; number < 8; number++) {
                            if (`${chessNotationArray[1]}${chessNotationArray[2]}` === `${files[letter]}${rows[number]}`) {

                                // sets toRow and toCol
                                toRow = rowMap[chessNotationArray[4]];
                                toCol = colMap[chessNotationArray[3]];

                                const pieceType = pieceMap[chessNotationArray[0]];

                                if (pieceType && board.getSquare(row, col) === pieceType && isValidMove(pieceType, row, col, toRow, toCol)) {
                                    piece = pieceType;
                                    fromRow = row;
                                    fromCol = col;
                                }
                            }
                        }
                    }
                } else if (chessNotationArray.length === 6) { // dubble specified checks / dubble specified checkmates / dubble spesified takes / specified takes check
                    // dubble specified checks / checkmate / takes
                    for (let letter = 0; letter < 8; letter++) {
                        for (let number = 0; number < 8; number++) {
                            if (chessNotationArray[5] === "+" || chessNotationArray[5] === "#") { // dubble specified check / dubble specified checkmates / dubble specified captures
                                if (`${chessNotationArray[1]}${chessNotationArray[2]}` === `${files[letter]}${rows[number]}`) {

                                    // sets toRow and toCol
                                    toRow = rowMap[chessNotationArray[4]];
                                    toCol = colMap[chessNotationArray[3]];

                                    const pieceType = pieceMap[chessNotationArray[0]];

                                    if (pieceType && board.getSquare(row, col) === pieceType && isValidMove(pieceType, row, col, toRow, toCol)) {
                                        piece = pieceType;
                                        fromRow = row;
                                        fromCol = col;
                                    }
                                }
                            } else if (chessNotationArray[3] === "x") {
                                if (`${chessNotationArray[1]}${chessNotationArray[2]}` === `${files[letter]}${rows[number]}`) {

                                    // sets toRow and toCol
                                    toRow = rowMap[chessNotationArray[5]];
                                    toCol = colMap[chessNotationArray[4]];

                                    const pieceType = pieceMap[chessNotationArray[0]];

                                    if (pieceType && board.getSquare(row, col) === pieceType && isValidMove(pieceType, row, col, toRow, toCol)) {
                                        piece = pieceType;
                                        fromRow = row;
                                        fromCol = col;
                                    }
                                }
                            }
                        }
                    }

                } else if (chessNotationArray.length === 7) { // dubble specified capture checks and mates / specified promotion takes with check
                    for (let letter = 0; letter < 8; letter++) {
                        for (let number = 0; number < 8; number++) {
                            if (chessNotationArray[3] === "x" || chessNotationArray[1] === "x") {
                                if (chessNotationArray[6] === "+" || chessNotationArray[6] === "#") { // dubble specified capture check / checkmate
                                    if (`${chessNotationArray[1]}${chessNotationArray[2]}` === `${files[letter]}${rows[number]}`) {

                                        // sets toRow and toCol
                                        toRow = rowMap[chessNotationArray[5]];
                                        toCol = colMap[chessNotationArray[4]];

                                        const pieceType = pieceMap[chessNotationArray[0]];

                                        if (pieceType && board.getSquare(row, col) === pieceType && isValidMove(pieceType, row, col, toRow, toCol)) {
                                            piece = pieceType;
                                            fromRow = row;
                                            fromCol = col;
                                        }
                                    }
                                } else if (chessNotationArray[4] === "=" && (chessNotationArray[6] === "+" || chessNotationArray[6] === "#")) { // specified promotion takes with check

                                    // sets toRow and toCol
                                    toRow = rowMap[chessNotationArray[3]];
                                    toCol = colMap[chessNotationArray[2]];

                                    if (board.getSquare(row, col) === pieces.whitePawn && isValidMove(pieces.whitePawn, row, col, toRow, toCol)) {
                                        piece = pieces.whitePawn;
                                        fromRow = row;
                                        fromCol = col;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    if (piece === pieces.emptySquare || toRow === undefined || toCol === undefined || fromCol === -1 || fromRow === -1) return false

    return {piece, fromRow, fromCol, toRow, toCol, isCapture, isCheck, isCheckMate};
} 

