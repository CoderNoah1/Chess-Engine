import { pieces } from "../pieces.js";
import { isValidMove } from "./isValidMove.js";

export function getChessNotation(piece, fromRow, fromCol, toRow, toCol, isCapture, isCheck, isCheckMate) {
    if (piece === pieces.emptySquare) return false
    // if (!isValidMove(piece, fromRow, fromCol, toRow, toCol)) return false
    
    let chessNotation = "";

    let piecePart = "";
    let specifiedFromPart = "";
    let capturePart = "";
    let toSqurePart = "";
    let checkOrCheckMatePart = "";

    const rowMap = { 0: "8", 1: "7", 2: "6", 3: "5", 4: "4", 5: "3", 6: "2", 7: "1" };
    const colMap = { 0: "a", 1: "b", 2: "c", 3: "d", 4: "e", 5: "f", 6: "g", 7: "h" };

    if (isCapture) capturePart = "x";
    if (isCheck) checkOrCheckMatePart = "+";
    if (isCheckMate) checkOrCheckMatePart = "#";
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
    

    chessNotation = `${piecePart}${specifiedFromPart}${capturePart}${toSqurePart}${checkOrCheckMatePart}`;

    return chessNotation;
}

