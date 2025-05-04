import { board } from "../board.js";
import { pieces } from "../pieces.js";
import { isValidMove } from "./isValidMove.js";

export function getIndexNotation(board, chessNotation, colorToMove) {
    if (chessNotation === "") return "false: empty chessNotation";
    let chessNotationArray = chessNotation.split('');
    if (chessNotationArray.length === 1) return "false: to short chessNotation";

    // maps
    const rowMap = { '1': 7, '2': 6, '3': 5, '4': 4, '5': 3, '6': 2, '7': 1, '8': 0 };
    const colMap = { 'a': 0, 'b': 1, 'c': 2, 'd': 3, 'e': 4, 'f': 5, 'g': 6, 'h': 7 };
    const pieceMap = { "R": "Rook", "N": "Knight", "B": "Bishop", "Q": "Queen", "K": "King" }

    let piece = pieces.emptySquare;
    let fromRow = -1;
    let fromCol = -1;
    let toRow = -1;
    let toCol = -1;

    let pieceSecondary = null;

    let isKingSideCastle = false;
    let isQueenSideCastle = false;
    let isCapture = false;
    let isCheck = false;
    let isCheckMate = false;
    let promotedTo = null;

    if (chessNotationArray.includes("x")) {
        isCapture = true;
        chessNotationArray = chessNotationArray.filter(char => char !== "x");
    }
    if (chessNotationArray.includes("+")) {
        isCheck = true; 
        chessNotationArray = chessNotationArray.filter(char => char !== "+");
    }
    if (chessNotationArray.includes("#")) {
        isCheckMate = true;
        chessNotationArray = chessNotationArray.filter(char => char !== "#");
    }

    // if casteling move
    if (chessNotationArray.join("") === "O-O" || chessNotationArray.join("") === "O-O-O") {
        let fromRow = colorToMove === "white" ? 7 : 0;
        let fromColKing = 4; // King starts on 'e' file

        let fromColRook = chessNotation === "O-O" ? 7 : 0;
    
        let toColKing = chessNotation === "O-O" ? 6 : 2; // g or c file
        let toRowKing = fromRow;

        let toColRook = chessNotation === "O-O" ? 5 : 3;
        let toRowRook = fromRow;
    
        const pieceKing = `${colorToMove}King`;
        const pieceRook = `${colorToMove}Rook`;

        isKingSideCastle = chessNotationArray.join("") === "O-O" ? true : false;
        isQueenSideCastle = chessNotationArray.join("") === "O-O-O" ? true : false;
    
        return {
            isKingSideCastle: isKingSideCastle, 
            isQueenSideCastle: isQueenSideCastle,
            piece: pieceKing,
            fromRow: fromRow,
            fromCol: fromColKing,
            toRow: toRowKing,
            toCol: toColKing,
            pieceSecondary : {
                piece: pieceRook,
                fromRow: fromRow,
                fromCol: fromColRook,
                toRow: toRowRook,
                toCol: toColRook,
            },
            isCapture: isCapture,
            isCheck: isCheck,
            isCheckMate: isCheckMate,
            promotedTo: null,
        };
    }  
    
    // if move is promotion
    if (chessNotationArray.includes("=")) {
        promotedTo = chessNotationArray.slice(-1)[0]

        chessNotationArray = chessNotationArray.filter(char => char !== "=");
        chessNotationArray = chessNotationArray.filter(char => char !== `${chessNotationArray.slice(-1)}`);
    }

    const toSqure = chessNotationArray.slice(-2)
    toRow = rowMap[toSqure[1]];
    toCol = colMap[toSqure[0]];
    chessNotationArray = chessNotationArray.slice(0, chessNotationArray.length - 2);

    if (pieceMap[chessNotationArray[0]]) {
        piece = `${colorToMove}${pieceMap[chessNotationArray[0]]}`
        chessNotationArray = chessNotationArray.slice(1);
    } else {
        piece = `${colorToMove}Pawn`;
    }

    // setting fromRow and fromCol only if the move is disambiguated
    if (chessNotationArray.length === 2) {
        fromRow = rowMap[chessNotationArray[1]];
        fromCol = colMap[chessNotationArray[0]];
    } else if (chessNotationArray.length === 1) {
        if (rowMap[chessNotationArray[0]]) {
            fromRow = rowMap[chessNotationArray[0]];
        } else if (colMap[chessNotationArray[0]]) {
            fromCol = colMap[chessNotationArray[0]];
        }
    }

    // finding fromRow and fromCol
    for (let row = 3; row < 4; row++) {
        for (let col = 4; col < 5; col++) {
            if (board.getSquare(row, col) === piece && isValidMove(piece, row, col, toRow, toCol)) {
                if (fromRow !== -1 && fromCol !== -1) {
                    if (fromRow === row && fromCol === col) {
                        fromRow = row;
                        fromCol = col;
                    }
                } else if (fromRow !== -1) {
                    if (fromRow === row) {
                        fromRow = row;
                        fromCol = col;
                    }
                } else if (fromCol !== -1) {
                    if (fromCol === col) {
                        fromRow = row;
                        fromCol = col;
                    }
                } else {
                    fromRow = row;
                    fromCol = col; 
                }
            }
        }
    }

    if (piece === pieces.emptySquare || toRow === undefined || toCol === undefined || fromCol === -1 || fromRow === -1) return "false: invalid piece or cordinates";

    return {isKingSideCastle, isQueenSideCastle, piece, fromRow, fromCol, toRow, toCol, pieceSecondary, isCapture, isCheck, isCheckMate, promotedTo};
}