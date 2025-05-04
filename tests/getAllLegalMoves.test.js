import { describe, expect, test } from "@jest/globals";
import { getAllLegalMoves } from "../src/utils/getAllLegalMoves.js";
import { board } from "../src/board.js";

describe("king is not in check", () => {
    test("start position", () => {
        expect(getAllLegalMoves(board, true)).toBe([
            [
                {
                  piece: 'whitePawn',
                  fromRow: 6,
                  fromCol: 0,
                  toRow: 5,
                  toCol: 0,
                  isCapture: false,
                  isCheck: false,
                  isCheckMate: false
                },
                {
                  piece: 'whitePawn',
                  fromRow: 6,
                  fromCol: 0,
                  toRow: 4,
                  toCol: 0,
                  isCapture: false,
                  isCheck: false,
                  isCheckMate: false
                },
                {
                  piece: 'whitePawn',
                  fromRow: 6,
                  fromCol: 1,
                  toRow: 5,
                  toCol: 1,
                  isCapture: false,
                  isCheck: false,
                  isCheckMate: false
                },
                {
                  piece: 'whitePawn',
                  fromRow: 6,
                  fromCol: 1,
                  toRow: 4,
                  toCol: 1,
                  isCapture: false,
                  isCheck: false,
                  isCheckMate: false
                },
                {
                  piece: 'whitePawn',
                  fromRow: 6,
                  fromCol: 2,
                  toRow: 5,
                  toCol: 2,
                  isCapture: false,
                  isCheck: false,
                  isCheckMate: false
                },
                {
                  piece: 'whitePawn',
                  fromRow: 6,
                  fromCol: 2,
                  toRow: 4,
                  toCol: 2,
                  isCapture: false,
                  isCheck: false,
                  isCheckMate: false
                },
                {
                  piece: 'whitePawn',
                  fromRow: 6,
                  fromCol: 3,
                  toRow: 5,
                  toCol: 3,
                  isCapture: false,
                  isCheck: false,
                  isCheckMate: false
                },
                {
                  piece: 'whitePawn',
                  fromRow: 6,
                  fromCol: 3,
                  toRow: 4,
                  toCol: 3,
                  isCapture: false,
                  isCheck: false,
                  isCheckMate: false
                },
                {
                  piece: 'whitePawn',
                  fromRow: 6,
                  fromCol: 4,
                  toRow: 5,
                  toCol: 4,
                  isCapture: false,
                  isCheck: false,
                  isCheckMate: false
                },
                {
                  piece: 'whitePawn',
                  fromRow: 6,
                  fromCol: 4,
                  toRow: 4,
                  toCol: 4,
                  isCapture: false,
                  isCheck: false,
                  isCheckMate: false
                },
                {
                  piece: 'whitePawn',
                  fromRow: 6,
                  fromCol: 5,
                  toRow: 5,
                  toCol: 5,
                  isCapture: false,
                  isCheck: false,
                  isCheckMate: false
                },
                {
                  piece: 'whitePawn',
                  fromRow: 6,
                  fromCol: 5,
                  toRow: 4,
                  toCol: 5,
                  isCapture: false,
                  isCheck: false,
                  isCheckMate: false
                },
                {
                  piece: 'whitePawn',
                  fromRow: 6,
                  fromCol: 6,
                  toRow: 5,
                  toCol: 6,
                  isCapture: false,
                  isCheck: false,
                  isCheckMate: false
                },
                {
                  piece: 'whitePawn',
                  fromRow: 6,
                  fromCol: 6,
                  toRow: 4,
                  toCol: 6,
                  isCapture: false,
                  isCheck: false,
                  isCheckMate: false
                },
                {
                  piece: 'whitePawn',
                  fromRow: 6,
                  fromCol: 7,
                  toRow: 5,
                  toCol: 7,
                  isCapture: false,
                  isCheck: false,
                  isCheckMate: false
                },
                {
                  piece: 'whitePawn',
                  fromRow: 6,
                  fromCol: 7,
                  toRow: 4,
                  toCol: 7,
                  isCapture: false,
                  isCheck: false,
                  isCheckMate: false
                },
                {
                  piece: 'whiteKnight',
                  fromRow: 7,
                  fromCol: 1,
                  toRow: 5,
                  toCol: 0,
                  isCapture: false,
                  isCheck: false,
                  isCheckMate: false
                },
                {
                  piece: 'whiteKnight',
                  fromRow: 7,
                  fromCol: 1,
                  toRow: 5,
                  toCol: 2,
                  isCapture: false,
                  isCheck: false,
                  isCheckMate: false
                },
                {
                  piece: 'whiteKnight',
                  fromRow: 7,
                  fromCol: 6,
                  toRow: 5,
                  toCol: 5,
                  isCapture: false,
                  isCheck: false,
                  isCheckMate: false
                },
                {
                  piece: 'whiteKnight',
                  fromRow: 7,
                  fromCol: 6,
                  toRow: 5,
                  toCol: 7,
                  isCapture: false,
                  isCheck: false,
                  isCheckMate: false
                }
              ]
        ])
    })

    describe("random position", () => {
        test("1", () => {
            board
            expect(getAllLegalMoves(board, true)).toBe
        })
    })
})
