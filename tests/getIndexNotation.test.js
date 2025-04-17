import { describe, expect } from "@jest/globals";
import { getIndexNotation } from "../src/utils/getIndexNotation";
import { pieces } from "../src/pieces";
import { board } from "../src/board";

const rowMap = { 0: "8", 1: "7", 2: "6", 3: "5", 4: "4", 5: "3", 6: "2", 7: "1" }
const colMap = { 0: "a", 1: "b", 2: "c", 3: "d", 4: "e", 5: "f", 6: "g", 7: "h" }

board.emptyBoard();

describe("2 chacters ", () => {
    test('Get index notation from chess notation: simple pawn moves', () => {
        for (let col = 0; col < 8; col++) {
            board.setSquare(6, col, pieces.whitePawn)
            expect(getIndexNotation(`${colMap[col]}4`, 0)).toStrictEqual({ piece: pieces.whitePawn, fromRow: 6, fromCol: col, toRow: 4, toCol: col });
            expect(getIndexNotation(`${colMap[col]}3`, 0)).toStrictEqual({ piece: pieces.whitePawn, fromRow: 6, fromCol: col, toRow: 5, toCol: col });
        }
    });
});

describe("3 chacters ", () => {
    describe("simple piece move", () => {
        test('Rook', () => {
            board.emptyBoard() 
            // white rook
            board.setSquare(4, 4, pieces.whiteRook) // places the white rook in the middle of the board
            // sigle moves
            expect(getIndexNotation("Re5", 0)).toStrictEqual({ piece: pieces.whiteRook, fromRow: 4, fromCol: 4, toRow: 3, toCol: 4 }); // rook moves one up 
            expect(getIndexNotation("Rf4", 0)).toStrictEqual({ piece: pieces.whiteRook, fromRow: 4, fromCol: 4, toRow: 4, toCol: 5 }); // rook moves one right 
            expect(getIndexNotation("Re3", 0)).toStrictEqual({ piece: pieces.whiteRook, fromRow: 4, fromCol: 4, toRow: 5, toCol: 4 }); // rook moves one down 
            expect(getIndexNotation("Rd4", 0)).toStrictEqual({ piece: pieces.whiteRook, fromRow: 4, fromCol: 4, toRow: 4, toCol: 3 }); // rook moves one left 
    
            // dubble moves
            expect(getIndexNotation("Re6", 0)).toStrictEqual({ piece: pieces.whiteRook, fromRow: 4, fromCol: 4, toRow: 2, toCol: 4 }); // rook moves two up 
            expect(getIndexNotation("Rg4", 0)).toStrictEqual({ piece: pieces.whiteRook, fromRow: 4, fromCol: 4, toRow: 4, toCol: 6 }); // rook moves two right 
            expect(getIndexNotation("Re2", 0)).toStrictEqual({ piece: pieces.whiteRook, fromRow: 4, fromCol: 4, toRow: 6, toCol: 4 }); // rook moves two down 
            expect(getIndexNotation("Rc4", 0)).toStrictEqual({ piece: pieces.whiteRook, fromRow: 4, fromCol: 4, toRow: 4, toCol: 2 }); // rook moves two left 
        });

        test('Knight', () => {
            // White Knight
            board.setSquare(4, 4, pieces.whiteKnight); // Places the white bishop in the middle of the board
            // sigle moves
            expect(getIndexNotation("Nf6", 0)).toStrictEqual({ piece: pieces.whiteKnight, fromRow: 4, fromCol: 4, toRow: 2, toCol: 5 });
            expect(getIndexNotation("Ng5", 0)).toStrictEqual({ piece: pieces.whiteKnight, fromRow: 4, fromCol: 4, toRow: 3, toCol: 6 });
            expect(getIndexNotation("Ng3", 0)).toStrictEqual({ piece: pieces.whiteKnight, fromRow: 4, fromCol: 4, toRow: 5, toCol: 6 });
            expect(getIndexNotation("Nf2", 0)).toStrictEqual({ piece: pieces.whiteKnight, fromRow: 4, fromCol: 4, toRow: 6, toCol: 5 });
            
            expect(getIndexNotation("Nd2", 0)).toStrictEqual({ piece: pieces.whiteKnight, fromRow: 4, fromCol: 4, toRow: 6, toCol: 3 });
            expect(getIndexNotation("Nc3", 0)).toStrictEqual({ piece: pieces.whiteKnight, fromRow: 4, fromCol: 4, toRow: 5, toCol: 2 });
            expect(getIndexNotation("Nc5", 0)).toStrictEqual({ piece: pieces.whiteKnight, fromRow: 4, fromCol: 4, toRow: 3, toCol: 2 });
            expect(getIndexNotation("Nd6", 0)).toStrictEqual({ piece: pieces.whiteKnight, fromRow: 4, fromCol: 4, toRow: 2, toCol: 3 });

        });
    
        test('Bishop', () => {
            // White bishop
            board.setSquare(4, 4, pieces.whiteBishop); // Places the white bishop in the middle of the board

            // Single moves
            expect(getIndexNotation("Bd5", 0)).toStrictEqual({ piece: pieces.whiteBishop, fromRow: 4, fromCol: 4, toRow: 3, toCol: 3 }); // up-left
            expect(getIndexNotation("Bf5", 0)).toStrictEqual({ piece: pieces.whiteBishop, fromRow: 4, fromCol: 4, toRow: 3, toCol: 5 }); // up-right
            expect(getIndexNotation("Bf3", 0)).toStrictEqual({ piece: pieces.whiteBishop, fromRow: 4, fromCol: 4, toRow: 5, toCol: 5 }); // down-right
            expect(getIndexNotation("Bd3", 0)).toStrictEqual({ piece: pieces.whiteBishop, fromRow: 4, fromCol: 4, toRow: 5, toCol: 3 }); // down-left

            // Double moves
            expect(getIndexNotation("Bc6", 0)).toStrictEqual({ piece: pieces.whiteBishop, fromRow: 4, fromCol: 4, toRow: 2, toCol: 2 }); // up-left 2
            expect(getIndexNotation("Bg6", 0)).toStrictEqual({ piece: pieces.whiteBishop, fromRow: 4, fromCol: 4, toRow: 2, toCol: 6 }); // up-right 2
            expect(getIndexNotation("Bg2", 0)).toStrictEqual({ piece: pieces.whiteBishop, fromRow: 4, fromCol: 4, toRow: 6, toCol: 6 }); // down-right 2
            expect(getIndexNotation("Bc2", 0)).toStrictEqual({ piece: pieces.whiteBishop, fromRow: 4, fromCol: 4, toRow: 6, toCol: 2 }); // down-left 2
        });

        test('Queen', () => {
            // White queen
            board.setSquare(4, 4, pieces.whiteQueen); // Places the white queen in the middle of the board

            // Rook-like moves (straight lines)
            expect(getIndexNotation("Qe5", 0)).toStrictEqual({ piece: pieces.whiteQueen, fromRow: 4, fromCol: 4, toRow: 3, toCol: 4 }); // Up
            expect(getIndexNotation("Qf4", 0)).toStrictEqual({ piece: pieces.whiteQueen, fromRow: 4, fromCol: 4, toRow: 4, toCol: 5 }); // Right
            expect(getIndexNotation("Qe3", 0)).toStrictEqual({ piece: pieces.whiteQueen, fromRow: 4, fromCol: 4, toRow: 5, toCol: 4 }); // Down
            expect(getIndexNotation("Qd4", 0)).toStrictEqual({ piece: pieces.whiteQueen, fromRow: 4, fromCol: 4, toRow: 4, toCol: 3 }); // Left

            // Bishop-like moves (diagonals)
            expect(getIndexNotation("Qd5", 0)).toStrictEqual({ piece: pieces.whiteQueen, fromRow: 4, fromCol: 4, toRow: 3, toCol: 3 }); // Up-left
            expect(getIndexNotation("Qf5", 0)).toStrictEqual({ piece: pieces.whiteQueen, fromRow: 4, fromCol: 4, toRow: 3, toCol: 5 }); // Up-right
            expect(getIndexNotation("Qf3", 0)).toStrictEqual({ piece: pieces.whiteQueen, fromRow: 4, fromCol: 4, toRow: 5, toCol: 5 }); // Down-right
            expect(getIndexNotation("Qd3", 0)).toStrictEqual({ piece: pieces.whiteQueen, fromRow: 4, fromCol: 4, toRow: 5, toCol: 3 }); // Down-left

            // Double moves (both rook- and bishop-like)
            expect(getIndexNotation("Qe6", 0)).toStrictEqual({ piece: pieces.whiteQueen, fromRow: 4, fromCol: 4, toRow: 2, toCol: 4 }); // Up 2 (rook move)
            expect(getIndexNotation("Qg4", 0)).toStrictEqual({ piece: pieces.whiteQueen, fromRow: 4, fromCol: 4, toRow: 4, toCol: 6 }); // Right 2 (rook move)
            expect(getIndexNotation("Qe2", 0)).toStrictEqual({ piece: pieces.whiteQueen, fromRow: 4, fromCol: 4, toRow: 6, toCol: 4 }); // Down 2 (rook move)
            expect(getIndexNotation("Qc4", 0)).toStrictEqual({ piece: pieces.whiteQueen, fromRow: 4, fromCol: 4, toRow: 4, toCol: 2 }); // Left 2 (rook move)

            expect(getIndexNotation("Qc6", 0)).toStrictEqual({ piece: pieces.whiteQueen, fromRow: 4, fromCol: 4, toRow: 2, toCol: 2 }); // Up-left 2 (bishop move)
            expect(getIndexNotation("Qg6", 0)).toStrictEqual({ piece: pieces.whiteQueen, fromRow: 4, fromCol: 4, toRow: 2, toCol: 6 }); // Up-right 2 (bishop move)
            expect(getIndexNotation("Qg2", 0)).toStrictEqual({ piece: pieces.whiteQueen, fromRow: 4, fromCol: 4, toRow: 6, toCol: 6 }); // Down-right 2 (bishop move)
            expect(getIndexNotation("Qc2", 0)).toStrictEqual({ piece: pieces.whiteQueen, fromRow: 4, fromCol: 4, toRow: 6, toCol: 2 }); // Down-left 2 (bishop move)
        });
    })

    describe("pawn check", () => {
        for (let col = 0; col < 8; col++) {
            board.emptyBoard();
            board.setSquare(6, col, pieces.whitePawn)
            board.setSquare(5, )
            expect(getIndexNotation(`${colMap[col]}4`, 0)).toStrictEqual({ piece: pieces.whitePawn, fromRow: 6, fromCol: col, toRow: 4, toCol: col });
            expect(getIndexNotation(`${colMap[col]}3`, 0)).toStrictEqual({ piece: pieces.whitePawn, fromRow: 6, fromCol: col, toRow: 5, toCol: col });
        }
    });

    describe("pawn checkmate", () => {

    });
});        