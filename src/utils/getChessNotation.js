import { pieces } from "../pieces.js";
import { isValidMove } from "./isValidMove.js";

export function getChessNotation(move) {
    const { isKingSideCastle, isQueenSideCastle, piece, fromRow, fromCol, toRow, toCol, isCapture, isCheck, isCheckMate, promotedTo } = move

    if (piece === pieces.emptySquare) return false
    // if (!isValidMove(piece, fromRow, fromCol, toRow, toCol)) return false
    
    let chessNotation = "";

    let piecePart = "";
    let specifiedFromPart = "";
    let capturePart = "";
    let toSqurePart = "";
    let promotedPart = "";
    let checkOrCheckMatePart = "";

    const rowMap = { 0: "8", 1: "7", 2: "6", 3: "5", 4: "4", 5: "3", 6: "2", 7: "1" };
    const colMap = { 0: "a", 1: "b", 2: "c", 3: "d", 4: "e", 5: "f", 6: "g", 7: "h" };

    if (isCapture) capturePart = "x";
    if (isCheck) checkOrCheckMatePart = "+";
    if (isCheckMate) checkOrCheckMatePart = "#";
    if (isKingSideCastle) return "O-O";
    if (isQueenSideCastle) return "O-O-O";
    if (promotedTo !== null) {
        promotedPart = `=${promotedTo}`;
    }
    toSqurePart = `${colMap[toCol]}${rowMap[toRow]}`;

    const basePiece = piece.replace("white", "").replace("black", "");
    switch (basePiece) {
        case "Pawn": 
            if (isCapture) specifiedFromPart = colMap[fromCol];
            break;
        case "Rook":
            piecePart = "R";
            break;
        case "Knight":
            piecePart = "N";
            break;
        case "Bishop":
            piecePart = "B";
            break;
        case "Queen":
            piecePart = "Q";
            break;
        case "King":
            piecePart = "K";
            break;
    }
    

    chessNotation = `${piecePart}${specifiedFromPart}${capturePart}${toSqurePart}${promotedPart}${checkOrCheckMatePart}`;

    return chessNotation;
}