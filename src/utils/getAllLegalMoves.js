import { board } from "../board.js";
import { pieces } from "../pieces.js";

export function getAllLegalDetailedMoves(board, isWhiteToMove) {
    const legalMoves = [];

    // iterates over the whole board
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            // gets the piece
            const piece = board.getSquare(row, col);

            // gets all posible moves for all pieces in an array of objects example: moves = [{toRow: 1, toCol: 2}, {toRow: 3, toCol: 3}]
            let rawMoves;
            if (isWhiteToMove) {
                rawMoves = getMovesForPiece(board, piece, row, col, true);
            } else if (!isWhiteToMove) {
                rawMoves = getMovesForPiece(board, piece, row, col, false);
            }
            // filter so i dont get empty or invalid arrays
            const moves = (Array.isArray(rawMoves) ? rawMoves.flat() : []).filter(
                move => move && typeof move.toRow === 'number' && typeof move.toCol === 'number'
            );

            if (moves.length > 0) {
                // iterates all off the possible moves
                for (const move of moves) {
                    // clones the board to not edit the original board
                    const simulatedBoard = board.clone();
                    // moves piece
                    if (!simulatedBoard.movePiece(row, col, move.toRow, move.toCol)) continue;
                    // if it is white to move the king is white
                    const kingColor = isWhiteToMove ? "white" : "black";
                    // checks if the king can be taken by the oponent aka if the move loses the king
                    if (!canKingBeTaken(simulatedBoard, kingColor)) {
                        legalMoves.push({
                            piece,
                            fromRow: row,
                            fromCol: col,
                            toRow: move.toRow,
                            toCol: move.toCol,
                            pieceSecondary: move.pieceSecondary
                        });
                    }
                }
            }
        }
    }

    let detailedLeagalMoves = []
    for (let legalMove of legalMoves) {
        let realMove = enrichMove(board, legalMove)
        detailedLeagalMoves.push(realMove)
    }

    return detailedLeagalMoves
}

export function getAllLegalMoves(board, isWhiteToMove) {
    const legalMoves = [];

    // iterates over the whole board
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            // gets the piece
            const piece = board.getSquare(row, col);

            // gets all posible moves for all pieces in an array of objects example: moves = [{toRow: 1, toCol: 2}, {toRow: 3, toCol: 3}]
            let rawMoves;
            if (isWhiteToMove) {
                rawMoves = getMovesForPiece(board, piece, row, col, true);
            } else if (isWhiteToMove === false) {
                rawMoves = getMovesForPiece(board, piece, row, col, false);
            }
            // filter so i dont get empty or invalid arrays
            const moves = (Array.isArray(rawMoves) ? rawMoves.flat() : []).filter(
                move => move && typeof move.toRow === 'number' && typeof move.toCol === 'number'
            );

            if (moves.length > 0) {
                // iterates all off the possible moves
                for (const move of moves) {
                    // clones the board to not edit the original board
                    const simulatedBoard = board.clone();
                    // moves piece
                    if (!simulatedBoard.movePiece(row, col, move.toRow, move.toCol)) continue;

                    // if it is white to move the king is white
                    const kingColor = isWhiteToMove ? "white" : "black"
                    // checks if the king can be taken by the oponent aka if the move loses the king
                    if (!canKingBeTaken(simulatedBoard, kingColor)) {
                        legalMoves.push({
                            piece,
                            fromRow: row,
                            fromCol: col,
                            toRow: move.toRow,
                            toCol: move.toCol,
                            pieceSecondary: move.pieceSecondary
                        });
                    }
                }
            }
        }
    }

    return legalMoves;
}

function canKingBeTaken(board, kingColor) {
    const kingPiece = kingColor === 'white' ? pieces.whiteKing : pieces.blackKing;
    const oppositeKingColorBoolean = kingColor === 'white' ? false : true;


    // Step 1: Find king position
    let kingRow = -1;
    let kingCol = -1;

    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            if (board.getSquare(row, col) === kingPiece) {
                kingRow = row;
                kingCol = col;
                break;
            }
        }
        if (kingRow !== -1) break;
    }

    if (kingRow === -1) throw new Error("King not found on the board!");

    // Step 2: Generate all opponent pseudo-legal moves
    let opponentMoves = [];

    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const piece = board.getSquare(row, col);

            opponentMoves.push(...getMovesForPiece(board, piece, row, col, oppositeKingColorBoolean));
        }
    }

    // Step 3: Check if any of them target the king
    for (const move of opponentMoves) {
        if (move.toRow === kingRow && move.toCol === kingCol) {
            return true;
        }
    }

    return false;
}

export function getDetailedMovesForPiece(board, piece, row, col, onlyWhiteMoves = null) {
    let moves = [];

    if (onlyWhiteMoves === true) {
        if (piece.includes("black")) return moves;
    } else if (onlyWhiteMoves === false) {
        if (piece.includes("white")) return moves;
    }

    if (piece.includes("Pawn")) moves.push(...getPawnMoves(board, row, col, piece));
    if (piece.includes("Rook")) moves.push(...getRookMoves(board, row, col, piece));
    if (piece.includes("Knight")) moves.push(...getKnightMoves(board, row, col, piece));
    if (piece.includes("Bishop")) moves.push(...getBishopMoves(board, row, col, piece));
    if (piece.includes("Queen")) moves.push(...getQueenMoves(board, row, col, piece));
    if (piece.includes("King")) moves.push(...getKingMoves(board, row, col, piece));
    return moves;

    function getPawnMoves(board, row, col, piece) {
        const moves = [];
        // declare the color
        const color = piece.includes("white") ? "white" : piece.includes("black") ? "black" : null;
        // if it is white to move. the pawns only go up or -1 in the matrix. oppesite for black
        const direction = color === "white" ? -1 : 1;
        // the pawns start on the 2 and 7 rank of the board
        const startRow = color === "white" ? 6 : 1;
      
        // Forward move
        if (board.isEmpty(row + direction, col)) { // checks if square is destination square is empty
            // adds the move
            moves.push({ fromRow: row, fromCol: col, toRow: row + direction, toCol: col, isCapture: false, isCheck: board.isMoveCheck(row, col, row + direction, col) });
      
            // Double move from starting row
            if (row === startRow && board.isEmpty(row + 2 * direction, col)) { // accouting for the dobble move if on the starting rank
                moves.push({ fromRow: row, fromCol: col, toRow: row + 2 * direction, toCol: col, isCapture: false, isCheck: board.isMoveCheck(row, col, row + 2 * direction, col) });
            }
        }
      
        // Diagonal captures
        for (let dc of [-1, 1]) {
            const newRow = row + direction;
            const newCol = col + dc;
            if (board.inBounds(newRow, newCol) && board.isEnemyPiece(newRow, newCol, piece)) {
                moves.push({ fromRow: row, fromCol: col, toRow: newRow, toCol: newCol, isCapture: true, isCheck: board.isMoveCheck(row, col, newRow, newCol) });
            }
        }
        return moves;
    }

    function getRookMoves(board, row, col, piece) {
        const moves = [];
        const directions = [
            [-1, 0], [1, 0], // up, down
            [0, -1], [0, 1], // left, right
        ];
      
        for (let [dr, dc] of directions) {
            let r = row + dr;
            let c = col + dc;
            while (board.inBounds(r, c)) {
                if (board.isEmpty(r, c)) {
                    moves.push({ fromRow: row, fromCol: col, toRow: r, toCol: c, isCapture: false, isCheck: board.isMoveCheck(row, col, r, c) });
                } else if (board.isEnemyPiece(r, c, piece)) {
                    moves.push({ fromRow: row, fromCol: col, toRow: r, toCol: c, isCapture: true, isCheck: board.isMoveCheck(row, col, r, c) });
                    break;
                } else {
                    break;
                }
                r += dr;
                c += dc;
            }
        }
        
        return moves;
    }

    function getKnightMoves(board, row, col, piece) {
        const moves = [];
        const deltas = [
            [-2, -1], [-2, 1], [-1, -2], [-1, 2],
            [1, -2], [1, 2], [2, -1], [2, 1],
        ];
      
        for (let [dr, dc] of deltas) {
            const r = row + dr;
            const c = col + dc;
            if (board.inBounds(r, c)) {
                if (board.isEmpty(r, c)) {
                    moves.push({ fromRow: row, fromCol: col, toRow: r, toCol: c, isCapture: false, isCheck: board.isMoveCheck(row, col, r, c) });
                } else if (board.isEnemyPiece(r, c, piece)) {
                    moves.push({ fromRow: row, fromCol: col, toRow: r, toCol: c, isCapture: true, isCheck: board.isMoveCheck(row, col, r, c) });
                }
            }
        }
      
        return moves;
    }
    
    function getBishopMoves(board, row, col, piece) {
        const moves = [];
        const directions = [
            [-1, -1], [-1, 1], [1, -1], [1, 1] // Diagonals
        ];
    
        for (const [dRow, dCol] of directions) {
            let r = row + dRow;
            let c = col + dCol;
    
            while (board.inBounds(r, c)) {
                const target = board.getSquare(r, c);
                if (target === pieces.emptySquare) {
                    moves.push({ fromRow: row, fromCol: col, toRow: r, toCol: c, isCapture: false, isCheck: board.isMoveCheck(row, col, r, c) });
                } else if (board.isEnemyPiece(r, c, piece)) {
                    moves.push({ fromRow: row, fromCol: col, toRow: r, toCol: c, isCapture: true, isCheck: board.isMoveCheck(row, col, r, c) });
                    break;
                } else {
                    break;
                }
                r += dRow;
                c += dCol;
            }
        }
    
        return moves;           
    }
    
    function getQueenMoves(board, row, col, piece) {
        const moves = [];

        moves.push(...getRookMoves(board, row, col, piece), ...getBishopMoves(board, row, col, piece))

        return moves;

        // return [
        //     ...getRookMoves(board, row, col, piece),
        //     ...getBishopMoves(board, row, col, piece),
        // ];
    }
    
    function getKingMoves(board, row, col, piece) {
        const moves = [];
        const directions = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1],          [0, 1],
            [1, -1], [1, 0], [1, 1]
        ];
    
        for (const [dRow, dCol] of directions) {
            const r = row + dRow;
            const c = col + dCol;
    
            if (board.isEnemyPiece(row, col, piece)) {
                const target = board.getSquare(r, c);
                if (target === pieces.emptySquare) {
                    moves.push({ fromRow: row, fromCol: col, toRow: r, toCol: c, isCapture: false, isCheck: board.isMoveCheck(row, col, r, c) });
                } else if (board.isEnemyPiece(r, c, piece)) {
                    moves.push({ fromRow: row, fromCol: col, toRow: r, toCol: c, isCapture: true, isCheck: board.isMoveCheck(row, col, r, c) });
                }
            }
        }
    
        // You can implement castling later!
        return moves;
    }  
}

export function getMovesForPiece(board, piece, row, col, onlyWhiteMoves = null) {
    let moves = [];

    if (onlyWhiteMoves === true) {
        if (piece.includes("black")) return moves;
    } else if (onlyWhiteMoves === false) {
        if (piece.includes("white")) return moves;
    }

    if (piece.includes("Pawn")) moves.push(...getPawnMoves(board, row, col, piece));
    if (piece.includes("Rook")) moves.push(...getRookMoves(board, row, col, piece));
    if (piece.includes("Knight")) moves.push(...getKnightMoves(board, row, col, piece));
    if (piece.includes("Bishop")) moves.push(...getBishopMoves(board, row, col, piece));
    if (piece.includes("Queen")) moves.push(...getQueenMoves(board, row, col, piece));
    if (piece.includes("King")) moves.push(...getKingMoves(board, row, col, piece));
    return moves;

    function getPawnMoves(board, row, col, piece) {
        const moves = [];
        // declare the color
        const color = piece.includes("white") ? "white" : piece.includes("black") ? "black" : null;
        // if it is white to move. the pawns only go up or -1 in the matrix. oppesite for black
        const direction = color === "white" ? -1 : 1;
        // the pawns start on the 2 and 7 rank of the board
        const startRow = color === "white" ? 6 : 1;
        const promotionRow = color === "white" ? 0 : 7
      
        // Forward move
        if (board.isEmpty(row + direction, col)) { // checks if square is destination square is empty
            // adds the move
            if (row + direction === promotionRow) {
                moves.push({ fromRow: row, fromCol: col, toRow: row + direction, toCol: col});
            } else {
                moves.push({ fromRow: row, fromCol: col, toRow: row + direction, toCol: col });
            }
      
            // Double move from starting row
            if (row === startRow && board.isEmpty(row + 2 * direction, col)) { // accouting for the dobble move if on the starting rank
                moves.push({ fromRow: row, fromCol: col, toRow: row + 2 * direction, toCol: col });
            }
        }
      
        // Diagonal captures
        for (let dc of [-1, 1]) {
            const newRow = row + direction;
            const newCol = col + dc;
            if (board.inBounds(newRow, newCol) && board.isEnemyPiece(newRow, newCol, piece)) {
                moves.push({ fromRow: row, fromCol: col, toRow: newRow, toCol: newCol });
            }
        }
        return moves;
    }

    function getRookMoves(board, row, col, piece) {
        const moves = [];
        const directions = [
            [-1, 0], [1, 0], // up, down
            [0, -1], [0, 1], // left, right
        ];
      
        for (let [dr, dc] of directions) {
            let r = row + dr;
            let c = col + dc;
            while (board.inBounds(r, c)) {
                if (board.isEmpty(r, c)) {
                    moves.push({ fromRow: row, fromCol: col, toRow: r, toCol: c });
                } else if (board.isEnemyPiece(r, c, piece)) {
                    moves.push({ fromRow: row, fromCol: col, toRow: r, toCol: c });
                    break;
                } else {
                    break;
                }
                r += dr;
                c += dc;
            }
        }
      
        return moves;
    }

    function getKnightMoves(board, row, col, piece) {
        const moves = [];
        const deltas = [
            [-2, -1], [-2, 1], [-1, -2], [-1, 2],
            [1, -2], [1, 2], [2, -1], [2, 1],
        ];
      
        for (let [dr, dc] of deltas) {
            const r = row + dr;
            const c = col + dc;
            if (board.inBounds(r, c)) {
                if (board.isEmpty(r, c) || board.isEnemyPiece(r, c, piece)) {
                    moves.push({ fromRow: row, fromCol: col, toRow: r, toCol: c });
                }
            }
        }
      
        return moves;
    }
    
    function getBishopMoves(board, row, col, piece) {
        const moves = [];
        const directions = [
            [-1, -1], [-1, 1], [1, -1], [1, 1] // Diagonals
        ];
    
        for (const [dRow, dCol] of directions) {
            let r = row + dRow;
            let c = col + dCol;
    
            while (board.inBounds(r, c)) {
                const target = board.getSquare(r, c);
                if (target === pieces.emptySquare) {
                    moves.push({ fromRow: row, fromCol: col, toRow: r, toCol: c });
                } else if (board.isEnemyPiece(r, c, piece)) {
                    moves.push({ fromRow: row, fromCol: col, toRow: r, toCol: c });
                    break;
                } else {
                    break;
                }
                r += dRow;
                c += dCol;
            }
        }
    
        return moves;           
    }
    
    function getQueenMoves(board, row, col, piece) {
        const moves = [];

        moves.push(...getRookMoves(board, row, col, piece), ...getBishopMoves(board, row, col, piece))

        return moves;

        // return [
        //     ...getRookMoves(board, row, col, piece),
        //     ...getBishopMoves(board, row, col, piece),
        // ];
    }
    
    function getKingMoves(board, row, col, piece) {
        const moves = [];
        const directions = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1],          [0, 1],
            [1, -1], [1, 0], [1, 1]
        ];
    
        for (const [dRow, dCol] of directions) {
            const r = row + dRow;
            const c = col + dCol;
    
            if (board.inBounds(r, c)) {
                const target = board.getSquare(r, c);
                if (target === pieces.emptySquare || board.isEnemyPiece(r, c, piece)) {
                    moves.push({ fromRow: row, fromCol: col, toRow: r, toCol: c });
                }
            }
        }

        if (piece.endsWith("King")) {
            const isWhite = piece.startsWith("white");
            
            const kingSide = isWhite ? "K" : "k";
            const queenSide = isWhite ? "Q" : "q";
            
            const baseRow = isWhite ? 7 : 0;
        
            if (board.getCastlingRights(kingSide) && (board.isEmpty(baseRow, 5) && board.isEmpty(baseRow, 6))) {
                moves.push({
                    fromRow: baseRow,
                    fromCol: 4,
                    toRow: baseRow,
                    toCol: 6,
                    pieceSecondary: {
                        piece: pieces[isWhite ? "whiteRook" : "blackRook"],
                        fromRow: baseRow,
                        fromCol: 7,
                        toRow: baseRow,
                        toCol: 5,
                    },
                });
            }
        
            if (board.getCastlingRights(queenSide) && (board.isEmpty(baseRow, 3) && board.isEmpty(baseRow, 2) && board.isEmpty(baseRow, 1))) {
                moves.push({
                    fromRow: baseRow,
                    fromCol: 4,
                    toRow: baseRow,
                    toCol: 2,
                    pieceSecondary: {
                        piece: pieces[isWhite ? "whiteRook" : "blackRook"],
                        fromRow: baseRow,
                        fromCol: 0,
                        toRow: baseRow,
                        toCol: 3,
                    },
                });
            }
        }

        return moves;
    }  
}

function enrichMove(board, move) {
    const {fromRow, fromCol, toRow, toCol} = move;
    let pieceSecondary = null;
    if (move.pieceSecondary) pieceSecondary = move.pieceSecondary;
    const piece   = board.getSquare(fromRow, fromCol);
    const target  = board.getSquare(toRow, toCol);
    const color   = piece.startsWith('white') ? 'white' : 'black';

    // clone & play
    const simulatedBoard = board.clone();
    simulatedBoard.movePiece(fromRow, fromCol, toRow, toCol);

    const isKingSideCastle  = piece.endsWith('King') && fromCol === 4 && toCol === 6;
    const isQueenSideCastle = piece.endsWith('King') && fromCol === 4 && toCol === 2;
    const isCapture         = target !== pieces.emptySquare;
    const promotedTo        = piece.endsWith('Pawn') &&
                              ((color==='white' && toRow===0) || (color==='black' && toRow===7))
                              ? `${color}Queen`   // or ask UI
                              : null;
    if (promotedTo !== null) simulatedBoard.setSquare(toRow, toCol, promotedTo)

    const opponentColor = color === 'white' ? 'black' : 'white';
    const opponentColorBoolean = color === 'white' ? false : true;
    const isCheck       = canKingBeTaken(simulatedBoard, color);
    const isCheckMate   = isCheck && getAllLegalMoves(simulatedBoard, opponentColorBoolean).length === 0;

    return {
        isKingSideCastle,
        isQueenSideCastle,
        piece,
        fromRow, fromCol, toRow, toCol,
        isCapture,
        isCheck,
        isCheckMate,
        promotedTo,
        pieceSecondary,
    };
}