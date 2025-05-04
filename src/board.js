import { pieces } from './pieces.js';
import { isValidMove } from './utils/isValidMove.js';
import { getMovesForPiece } from './utils/getAllLegalMoves.js';

export class Board {
    constructor() {
        this.reset();
        this.colorToMove = "white";
        
        // Castling rights
        this.whiteCanCastleKingSide  = true;   // O‑O
        this.whiteCanCastleQueenSide = true;   // O‑O‑O
        this.blackCanCastleKingSide  = true;
        this.blackCanCastleQueenSide = true;
    }

    reset() {
        this.board = Array(8).fill(null).map(() => Array(8).fill(pieces.emptySquare));
        this.initializePieces();
    }

    initializePieces() {
        // Place all pieces for a standard chess game
        this.board[6].fill(pieces.whitePawn); // White Pawns
        this.board[1].fill(pieces.blackPawn); // Black Pawns

        this.board[7][0] = pieces.whiteRook;
        this.board[7][7] = pieces.whiteRook;

        this.board[7][1] = pieces.whiteKnight;
        this.board[7][6] = pieces.whiteKnight;

        this.board[7][2] = pieces.whiteBishop;
        this.board[7][5] = pieces.whiteBishop;

        this.board[7][3] = pieces.whiteQueen;
        this.board[7][4] = pieces.whiteKing;



        this.board[0][0] = pieces.blackRook;
        this.board[0][7] = pieces.blackRook;

        this.board[0][1] = pieces.blackKnight;
        this.board[0][6] = pieces.blackKnight;

        this.board[0][2] = pieces.blackBishop;
        this.board[0][5] = pieces.blackBishop;

        this.board[0][3] = pieces.blackQueen;
        this.board[0][4] = pieces.blackKing;
    }

    emptyBoard() {
        this.board = Array(8).fill(null).map(() => Array(8).fill(pieces.emptySquare));
    }

    getColorToMove() {
        return this.colorToMove;
    }

    setColorToMove(colorToMove) {
        this.colorToMove = colorToMove;
    }

    getCastlingRights(side) {
        switch (side) {
            case "K": return this.whiteCanCastleKingSide;
            case "Q": return this.whiteCanCastleQueenSide;
            case "k": return this.blackCanCastleKingSide;
            case "q": return this.blackCanCastleQueenSide;
            default: return {
                whiteCanCastleKingSide: this.whiteCanCastleKingSide,
                whiteCanCastleQueenSide: this.whiteCanCastleQueenSide,
                blackCanCastleKingSide: this.blackCanCastleKingSide,
                blackCanCastleQueenSide: this.blackCanCastleQueenSide
            };
        }
    }

    setCastlingRight(side, value) {
        switch (side) {
            case "K": this.whiteCanCastleKing  = !!value; break;
            case "Q": this.whiteCanCastleQueen = !!value; break;
            case "k": this.blackCanCastleKing  = !!value; break;
            case "q": this.blackCanCastleQueen = !!value; break;
            default:  throw new Error("Unknown castling side: " + side);
        }
    }

    getSquare(row, col) {
        if (row < 0 || row > 7 || col < 0 || col > 7) return false
        return this.board[row][col];
    }

    setSquare(row, col, piece) {
        this.board[row][col] = piece;
    }

    isOccupiedByWhite(row, col) {
        const square = this.getSquare(row, col);
        return [pieces.whitePawn, pieces.whiteRook, pieces.whiteKnight, pieces.whiteBishop, pieces.whiteQueen].includes(square);
    }

    isOccupiedByBlack(row, col) {
        const square = this.getSquare(row, col);
        return [pieces.blackPawn, pieces.blackRook, pieces.blackKnight, pieces.blackBishop, pieces.blackQueen].includes(square);
    }

    printBoard() {
        console.log(this.board);
    }

    isEmpty(row, col) {
        if (this.board[row][col] === pieces.emptySquare) return true
        return false
    }

    inBounds(row, col) {
        return row >= 0 && row < 8 && col >= 0 && col < 8;
    }

    isEnemyPiece(row, col, pieceThatMoves) {
        const targetPiece = this.board[row][col];
        if (!targetPiece) return false;
        if (targetPiece === pieces.emptySquare) return false;

        const color = pieceThatMoves.includes("white") ? "white" : pieceThatMoves.includes("black") ? "black" : null

        if (color === "black") {
            return (
                targetPiece === pieces.whitePawn ||
                targetPiece === pieces.whiteRook ||
                targetPiece === pieces.whiteKnight ||
                targetPiece === pieces.whiteBishop ||
                targetPiece === pieces.whiteQueen ||
                targetPiece === pieces.whiteKing
            );
        } else if (color === "white") {
            return (
                targetPiece === pieces.blackPawn ||
                targetPiece === pieces.blackRook ||
                targetPiece === pieces.blackKnight ||
                targetPiece === pieces.blackBishop ||
                targetPiece === pieces.blackQueen ||
                targetPiece === pieces.blackKing
            );
        }

        return false;
    }

    clone() {
        const newBoard = this.board.map(row => [...row]); 
        const cloned = new Board(); 
        cloned.board = newBoard;
        return cloned;
    }

    movePiece(fromRow, fromCol, toRow, toCol, isForce) {
        if (!this.inBounds(toRow, toCol)) return false
        const piece = this.board[fromRow][fromCol];
        const target = this.board[toRow][toCol];
        const color = piece.includes("white") ? "white" : piece.includes("black") ? "black" : null

        if (!isForce) {
            if (isValidMove(piece, fromRow, fromCol, toRow, toCol) === false) return "Move is not Valid";
        }

        // ── update castling flags ───────────────────────────
        if (piece === pieces.whiteKing) {
            this.whiteCanCastleKingSide  = false;
            this.whiteCanCastleQueenSide = false;
        } else if (piece === pieces.blackKing) {
            this.blackCanCastleKingSide  = false;
            this.blackCanCastleQueenSide = false;
        } else if (piece === pieces.whiteRook) {
            if (fromRow === 7 && fromCol === 0) this.whiteCanCastleQueenSide = false; // a1 rook moved
            if (fromRow === 7 && fromCol === 7) this.whiteCanCastleKingSide  = false; // h1 rook moved
        } else if (piece === pieces.blackRook) {
            if (fromRow === 0 && fromCol === 0) this.blackCanCastleQueenSide = false; // a8 rook moved
            if (fromRow === 0 && fromCol === 7) this.blackCanCastleKingSide  = false; // h8 rook moved
        }

        // Also revoke the right if that rook is **captured**
        if (target === pieces.whiteRook) {
            if (toRow === 7 && toCol === 0) this.whiteCanCastleQueenSide = false;
            if (toRow === 7 && toCol === 7) this.whiteCanCastleKingSide  = false;
        } else if (target === pieces.blackRook) {
            if (toRow === 0 && toCol === 0) this.blackCanCastleQueenSide = false;
            if (toRow === 0 && toCol === 7) this.blackCanCastleKingSide  = false;
        }

        if (color === "white") {
            if (!piece.includes("white")) return false;
        } else if (color === "black") {
            if (!piece.includes("black")) return false;
        }
        
        if (piece === pieces.emptySquare) return false;
    
        if (!this.isEnemyPiece(toRow, toCol, color) && target !== pieces.emptySquare) {
            return false; // can't capture your own piece
        }
    
        this.board[fromRow][fromCol] = pieces.emptySquare;
        this.board[toRow][toCol] = piece;
    
        return true;
    }

    isMoveCheck(fromRow, fromCol, toRow, toCol) {
        const simulatedBoard = this.clone();
        simulatedBoard.movePiece(fromRow, fromCol, toRow, toCol);

        const piece = simulatedBoard.getSquare(toRow, toCol);
        if (piece === pieces.emptySquare) return "emptySquere false"
        const color = piece.includes("white") ? "white" : "black"
        const oppesiteKingPiece = color === "white" ? pieces.blackKing : pieces.whiteKing
        const colorBoolean = color === 'white' ? true : false;

        let enemyKingRow = -1;
        let enemyKingCol = -1;

        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                if (this.getSquare(row, col) === oppesiteKingPiece) {
                    enemyKingRow = row;
                    enemyKingCol = col;
                    break;
                }
            }
            if (enemyKingRow !== -1) break;
        }

        let myMoves = [];

        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const piece = simulatedBoard.getSquare(row, col)
                myMoves.push(...getMovesForPiece(simulatedBoard, piece, row, col, colorBoolean));
            }
        }
            
        for (const move of myMoves) {
            if (move.toRow === enemyKingRow && move.toCol === enemyKingCol) {
                return true;
            }
        }
    
        return false;
    }

    loadFENCode(FENCode) {
        const parts = FENCode.split(" ");
        const piecePlacement = parts[0];
        const rows = piecePlacement.split("/");
        const FENToPieceMap = { "r": pieces.blackRook, "n": pieces.blackKnight, "b": pieces.blackBishop, "q": pieces.blackQueen, "k": pieces.blackKing, "p": pieces.blackPawn, "R": pieces.whiteRook, "N": pieces.whiteKnight, "B": pieces.whiteBishop, "Q": pieces.whiteQueen, "K": pieces.whiteKing, "P": pieces.whitePawn, }

        for (let row = 0; row < 8; row++) {
            let col = 0;
            for (const char of rows[row]) {
                if (isNaN(char)) {
                    this.board[row][col] = FENToPieceMap[char];
                    col++;
                } else {
                    const emptyCount = parseInt(char);
                    for (let i = 0; i < emptyCount; i++) {
                        this.board[row][col] = pieces.emptySquare;
                        col++;
                    }
                }
            }
        }

        const colorToMove = parts[1] === "w" ? "white" : "black";
        this.setColorToMove(colorToMove); 

        const castlingRights = parts[2];   // "KQkq" or "-" etc.
        this.whiteCanCastleKingSide  = castlingRights.includes("K");
        this.whiteCanCastleQueenSide = castlingRights.includes("Q");
        this.blackCanCastleKingSide  = castlingRights.includes("k");
        this.blackCanCastleQueenSide = castlingRights.includes("q");
    }
}

export const board = new Board();