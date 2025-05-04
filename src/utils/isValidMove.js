import { pieces } from '../pieces.js';
import { board } from '../board.js';

export function isValidMove(piece, fromRow, fromCol, toRow, toCol) {
    const isSquareOccupiedByblackPiece = (row, col) => {
        return  board.getSquare(row, col) === pieces.blackPawn || 
                board.getSquare(row, col) === pieces.blackRook || 
                board.getSquare(row, col) === pieces.blackKnight || 
                board.getSquare(row, col) === pieces.blackBishop || 
                board.getSquare(row, col) === pieces.blackQueen;
    };
    const isSquareOccupiedByWhitePiece = (row, col) => { 
        return  board.getSquare(row, col) === pieces.whitePawn || 
                board.getSquare(row, col) === pieces.whiteRook || 
                board.getSquare(row, col) === pieces.whiteKnight || 
                board.getSquare(row, col) === pieces.whiteBishop || 
                board.getSquare(row, col) === pieces.whiteQueen;
    };
    const isEmptySquare = (row, col) => board.getSquare(row, col) === pieces.emptySquare;

    const isClearPath = (fromRow, fromCol, toRow, toCol) => {
        if (fromRow === toRow) { // Horizontal move
            if (fromCol === toCol) return false;
            const minCol = Math.min(fromCol, toCol);
            const maxCol = Math.max(fromCol, toCol);
            for (let col = minCol + 1; col < maxCol; col++) {
                if (!isEmptySquare(fromRow, col)) {
                    return false;
                }
            }
        } else if (fromCol === toCol) { // Vertical move
            if (fromRow === toRow) return false;
            const minRow = Math.min(fromRow, toRow);
            const maxRow = Math.max(fromRow, toRow);
            for (let row = minRow + 1; row < maxRow; row++) {
                if (!isEmptySquare(row, fromCol)) {
                    return false;
                }
            }
        } else if (Math.abs(fromRow - toRow === Math.abs(fromCol - toCol))) { // Diagonal move
            const minRow = Math.min(fromRow, toRow);
            const maxRow = Math.max(fromRow, toRow);
            for (let rowCol = minRow + 1; rowCol < maxRow; rowCol++) {
                if (!isEmptySquare(rowCol, rowCol)) {
                    return false;
                }
            }
        }
        return true;
    };

    switch (piece) {
        case pieces.whitePawn:
            return (
                // Normal move
                (fromCol === toCol && fromRow - toRow === 1 && isEmptySquare(toRow, toCol)) ||
                // Initial double move
                (fromRow === 6 && fromCol === toCol && fromRow - toRow === 2 && isEmptySquare(fromRow - 1, toCol) && isEmptySquare(toRow, toCol)) ||
                // Capture move
                (Math.abs(fromCol - toCol) === 1 && isSquareOccupiedByblackPiece(toRow, toCol) && fromRow - toRow === 1)
            );
        case pieces.whiteRook:
            return (
                (fromRow === toRow || fromCol === toCol) &&
                (isSquareOccupiedByblackPiece(toRow, toCol) || isEmptySquare(toRow, toCol)) && 
                isClearPath(fromRow, fromCol, toRow, toCol)
            );
        case pieces.whiteKnight: 
            return (
                ((Math.abs(fromRow - toRow) === 2 && Math.abs(fromCol - toCol) === 1) ||
                (Math.abs(fromRow - toRow) === 1 && Math.abs(fromCol - toCol) === 2)) &&
                (isEmptySquare(toRow, toCol) || isSquareOccupiedByblackPiece(toRow, toCol))
            );
        case pieces.whiteBishop:
            return (
                Math.abs(fromRow - toRow) === Math.abs(fromCol - toCol) &&
                (isSquareOccupiedByblackPiece(toRow, toCol) || isEmptySquare(toRow, toCol))
            );
        case pieces.whiteQueen:
            return (
                fromRow === toRow || fromCol === toCol || Math.abs(fromRow - toRow) === Math.abs(fromCol - toCol) &&
                (isSquareOccupiedByblackPiece(toRow, toCol) || isEmptySquare(toRow, toCol))
            );
        case pieces.whiteKing:
            return (
                (Math.abs(fromRow - toRow) <= 1 && Math.abs(fromCol - toCol) <= 1) &&
                (isSquareOccupiedByblackPiece(toRow, toCol) || isEmptySquare(toRow, toCol))
            );
        

            
        case pieces.blackPawn:
            return (
                // Normal move
                (fromCol === toCol && toRow - fromRow === 1 && isEmptySquare(toRow, toCol)) ||
                // Initial double move
                (fromRow === 1 && fromCol === toCol && toRow - fromRow === 2 && isEmptySquare(fromRow + 1, toCol) && isEmptySquare(toRow, toCol)) ||
                // Capture move
                (Math.abs(fromCol - toCol) === 1 && isSquareOccupiedByWhitePiece(toRow, toCol) && fromRow - toRow === - 1)
            );
        case pieces.blackRook:
            return (
                (fromRow === toRow || fromCol === toCol) &&
                (isSquareOccupiedByWhitePiece(toRow, toCol) || isEmptySquare(toRow, toCol)) && 
                isClearPath(fromRow, fromCol, toRow, toCol)
            );
        case pieces.blackKnight: 
            return (
                ((Math.abs(fromRow - toRow) === 2 && Math.abs(fromCol - toCol) === 1) ||
                (Math.abs(fromRow - toRow) === 1 && Math.abs(fromCol - toCol) === 2)) &&
                (isEmptySquare(toRow, toCol) || isSquareOccupiedByWhitePiece(toRow, toCol))
            );
        case pieces.blackBishop:
            return (
                Math.abs(fromRow - toRow) === Math.abs(fromCol - toCol) &&
                (isSquareOccupiedByWhitePiece(toRow, toCol) || isEmptySquare(toRow, toCol))
            );
        case pieces.blackQueen:
            return (
                fromRow === toRow || fromCol === toCol || Math.abs(fromRow - toRow) === Math.abs(fromCol - toCol) &&
                (isSquareOccupiedByWhitePiece(toRow, toCol) || isEmptySquare(toRow, toCol))
            );
        case pieces.blackKing:
            return (
                (Math.abs(fromRow - toRow) <= 1 && Math.abs(fromCol - toCol) <= 1) &&
                (isSquareOccupiedByWhitePiece(toRow, toCol) || isEmptySquare(toRow, toCol))
            );
        default:
            return false;
    }
}