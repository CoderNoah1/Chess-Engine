import { board } from "../../board.js";
import { pieces } from "../../pieces.js";

export function evaluateBoard(board) {
    const PIECE_VALUES = {
        pawn: 100,
        knight: 300,
        bishop: 310,
        rook: 500,
        queen: 900,
        king: 10000
    };

    const positionalTables = {
        king: [
            [-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
            [-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
            [-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
            [-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
            [-2.0, -3.0, -3.0, -4.0, -4.0, -3.0, -3.0, -2.0],
            [-1.0, -2.0, -2.0, -2.0, -2.0, -2.0, -2.0, -1.0],
            [2.0, 3.0, 0.0, 0.0, 0.0, 0.0, 3.0, 2.0],
            [2.0, 3.0, 0.0, 0.0, 0.0, 0.0, 3.0, 2.0]
        ],
        queen: [
            [-2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0],
            [-1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -1.0],
            [-1.0, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -1.0],
            [-0.5, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -0.5],
            [0.0, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -0.5],
            [-1.0, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -1.0],
            [-1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -1.0],
            [-2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0]
        ],
        rook: [
            [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
            [0.5, 1.0, 1.0, 1.0, 1.0, 1.0, 0.0, -0.5],
            [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
            [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
            [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
            [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
            [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
            [0.0, 0.0, 0.0, 0.5, 0.0, 0.0, 0.0, 0.0]
        ],
        bishop: [
            [-2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0],
            [-1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -1.0],
            [-1.0, 0.0, 0.5, 1.0, 1.0, 0.5, 0.0, -1.0],
            [-1.0, 0.5, 0.5, 1.0, 1.0, 0.5, 0.5, -1.0],
            [-1.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0, -1.0],
            [-1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0],
            [-1.0, 0.5, 0.0, 0.0, 0.0, 0.0, 0.5, -1.0],
            [-2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0]
        ],
        knight: [
            [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0],
            [-4.0, -2.0, 0.0, 0.0, 0.0, 0.0, -2.0, -4.0],
            [-3.0, 0.5, 1.5, 2.0, 2.0, 1.5, 0.5, -3.0],
            [-3.0, 1.0, 2.5, 3.0, 3.0, 2.5, 1.0, -3.0],
            [-3.0, 1.0, 2.5, 3.0, 3.0, 2.5, 1.0, -3.0],
            [-3.0, 0.5, 1.5, 2.0, 2.0, 1.5, 0.5, -3.0],
            [-4.0, -2.0, 0.0, 0.5, 0.5, 0.0, -2.0, -4.0],
            [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0]
        ],
        pawn: [
            [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
            [5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0],
            [1.0, 1.0, 2.0, 3.0, 3.0, 2.0, 1.0, 1.0],
            [0.5, 0.5, 1.0, 2.5, 2.5, 1.0, 0.5, 0.5],
            [0.0, 0.0, 0.0, 2.0, 2.0, 0.0, 0.0, 0.0],
            [0.5, -0.5, -1.0, 0.0, 0.0, -1.0, -0.5, 0.5],
            [0.5, 1.0, 1.0, -2.0, -2.0, 1.0, 1.0, 0.5],
            [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]
        ]
    };

    let score = 0;

    // evaluate king saifty
    score += evaluateKingSafety(board) * 1
    // evaluate totale material
    score += evaluateMaterial(board) * 1
    // evaluate piece position
    score += evaluatePiecePosition(board) * 1

    return score;

    function evaluateKingSafety (board) {
        let kingPosition = { row: -1, col: -1 }
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                if (board.getSquare(row, col) === "whiteKing") {
                    kingPosition = { row: row, col: col }
                }
            }
        }
    
        let kingSafetyScore = positionalTables.king[kingPosition.row][kingPosition.col] * 100
        return kingSafetyScore;
    }

    function evaluateMaterial (board) {
        let whiteMaterial = 0;
        let blackMaterial = 0;
    
        const pieceMap = {
            "whitePawn": "pawn", "whiteRook": "rook", "whiteKnight": "knight",
            "whiteBishop": "bishop", "whiteQueen": "queen",
            "blackPawn": "pawn", "blackRook": "rook", "blackKnight": "knight",
            "blackBishop": "bishop", "blackQueen": "queen"
        };
    
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const piece = board.getSquare(row, col);
                
                if (piece in pieceMap) { // Check if the piece exists in the map
                    const pieceType = pieceMap[piece]; // Convert piece to generic type (pawn, knight, etc.)
                    const pieceValue = PIECE_VALUES[pieceType]; // Get its value
    
                    if (piece.startsWith("white")) {
                        whiteMaterial += pieceValue;
                    } else if (piece.startsWith("black")) {
                        blackMaterial += pieceValue;
                    }
                }
            }
        }
    
        return whiteMaterial - blackMaterial; // Positive means white is ahead, negative means black is ahead
    }

    function evaluatePiecePosition (board) {
        let score = 0;

        score += evaluateRookPosition(board);
        score += evaluateKnightPosition(board);
        score += evaluateBishopPosition(board);
        score += evaluateQueenPosition(board);
        score += evaluatePawnPosition(board);

        return score * 100;
        
        function evaluateRookPosition (board) {
            let rooksPositions = [];
            for (let row = 0; row < 8; row++) {
                for (let col = 0; col < 8; col++) {
                    if (board.getSquare(row, col) === "whiteRook") {
                        rooksPositions.push({ row: row, col: col })
                    }
                }
            }
        
            let rookPositionScore = 0;
            for (let rook of rooksPositions) {
                rookPositionScore += positionalTables.rook[rook.row][rook.col]
            }
        
            return rookPositionScore;
        }
        
        function evaluateKnightPosition (board) {
            let knightPositions = [];
            for (let row = 0; row < 8; row++) {
                for (let col = 0; col < 8; col++) {
                    if (board.getSquare(row, col) === "whiteKnight") {
                        knightPositions.push({ row: row, col: col })
                    }
                }
            }
        
            let knightPositionScore = 0;
            for (let knight of knightPositions) {
                knightPositionScore += positionalTables.knight[knight.row][knight.col]
            }
        
            return knightPositionScore;
        }
        
        function evaluateBishopPosition (board) {
            let bishopPositions = [];
            for (let row = 0; row < 8; row++) {
                for (let col = 0; col < 8; col++) {
                    if (board.getSquare(row, col) === "whiteBishop") {
                        bishopPositions.push({ row: row, col: col })
                    }
                }
            }
        
            let bishopPositionScore = 0;
            for (let bishop of bishopPositions) {
                bishopPositionScore += positionalTables.bishop[bishop.row][bishop.col]
            }
        
            return bishopPositionScore;
        }
        
        function evaluateQueenPosition (board) {
            let queenPositions = [];
            for (let row = 0; row < 8; row++) {
                for (let col = 0; col < 8; col++) {
                    if (board.getSquare(row, col) === "whiteQueen") {
                        queenPositions.push({ row: row, col: col })
                    }
                }
            }
        
            let queenPositionScore = 0;
            for (let queen of queenPositions) {
                queenPositionScore += positionalTables.queen[queen.row][queen.col]
            }
        
            return queenPositionScore;
        }

        function evaluatePawnPosition (board) {
            let pawnPositions = [];
            for (let row = 0; row < 8; row++) {
                for (let col = 0; col < 8; col++) {
                    if (board.getSquare(row, col) === "whitePawn") {
                        pawnPositions.push({ row: row, col: col })
                    }
                }
            }
        
            let pawnPositionScore = 0;
            for (let pawn of pawnPositions) {
                pawnPositionScore += positionalTables.pawn[pawn.row][pawn.col]
            }
        
            return pawnPositionScore;
        }
    }
    
}