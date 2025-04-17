import { describe, test } from "@jest/globals";
import { isValidMove } from "../src/utils/isValidMove";
import { pieces } from "../src/pieces";

// 🏇 White Knight
test('White Knight: Valid Moves', () => {
    board.setSquare(4, 4, pieces.whiteKnight);
    expect(isValidMove(pieces.whiteKnight, 4, 4, 6, 5)).toBe(true);
    expect(isValidMove(pieces.whiteKnight, 4, 4, 5, 6)).toBe(true);
    expect(isValidMove(pieces.whiteKnight, 4, 4, 3, 6)).toBe(true);
    expect(isValidMove(pieces.whiteKnight, 4, 4, 2, 5)).toBe(true);
});

test('White Knight: Invalid Moves', () => {
    board.setSquare(4, 4, pieces.whiteKnight);
    expect(isValidMove(pieces.whiteKnight, 4, 4, 5, 5)).toBe(false);
    expect(isValidMove(pieces.whiteKnight, 4, 4, 4, 6)).toBe(false);
    expect(isValidMove(pieces.whiteKnight, 4, 4, 6, 6)).toBe(false);
});

// ♖ White Rook
test('White Rook: Valid Moves', () => {
    board.setSquare(0, 0, pieces.whiteRook);
    board.setSquare(0, 5, pieces.blackPawn); // Enemy to capture
    expect(isValidMove(pieces.whiteRook, 0, 0, 0, 5)).toBe(true); // Capture
    expect(isValidMove(pieces.whiteRook, 0, 0, 0, 4)).toBe(true); // Move
});

test('White Rook: Invalid Moves', () => {
    board.setSquare(0, 0, pieces.whiteRook);
    board.setSquare(0, 1, pieces.whitePawn); // Blocked by same color
    expect(isValidMove(pieces.whiteRook, 0, 0, 0, 2)).toBe(false);
    expect(isValidMove(pieces.whiteRook, 0, 0, 1, 1)).toBe(false);
});

// ♗ White Bishop
test('White Bishop: Valid Moves', () => {
    board.setSquare(4, 4, pieces.whiteBishop);
    board.setSquare(2, 2, pieces.blackPawn); // Enemy to capture
    expect(isValidMove(pieces.whiteBishop, 4, 4, 2, 2)).toBe(true); // Capture
    expect(isValidMove(pieces.whiteBishop, 4, 4, 6, 6)).toBe(true); // Move
});

test('White Bishop: Invalid Moves', () => {
    board.setSquare(4, 4, pieces.whiteBishop);
    expect(isValidMove(pieces.whiteBishop, 4, 4, 4, 5)).toBe(false);
    expect(isValidMove(pieces.whiteBishop, 4, 4, 5, 4)).toBe(false);
});

// ♕ White Queen
test('White Queen: Valid Moves', () => {
    board.setSquare(3, 3, pieces.whiteQueen);
    board.setSquare(6, 6, pieces.blackPawn);
    expect(isValidMove(pieces.whiteQueen, 3, 3, 6, 6)).toBe(true);
    expect(isValidMove(pieces.whiteQueen, 3, 3, 3, 7)).toBe(true);
    expect(isValidMove(pieces.whiteQueen, 3, 3, 0, 3)).toBe(true);
});

test('White Queen: Invalid Moves', () => {
    board.setSquare(3, 3, pieces.whiteQueen);
    expect(isValidMove(pieces.whiteQueen, 3, 3, 2, 4)).toBe(false);
    expect(isValidMove(pieces.whiteQueen, 3, 3, 4, 5)).toBe(false);
});

// ♔ White King
test('White King: Valid Moves', () => {
    board.setSquare(4, 4, pieces.whiteKing);
    board.setSquare(5, 5, pieces.blackPawn);
    expect(isValidMove(pieces.whiteKing, 4, 4, 5, 5)).toBe(true); // Capture
    expect(isValidMove(pieces.whiteKing, 4, 4, 5, 4)).toBe(true);
    expect(isValidMove(pieces.whiteKing, 4, 4, 4, 3)).toBe(true);
});

test('White King: Invalid Moves', () => {
    board.setSquare(4, 4, pieces.whiteKing);
    expect(isValidMove(pieces.whiteKing, 4, 4, 6, 4)).toBe(false);
    expect(isValidMove(pieces.whiteKing, 4, 4, 4, 6)).toBe(false);
});

// ♙ White Pawn
test('White Pawn: Valid Moves', () => {
    board.setSquare(6, 4, pieces.whitePawn);
    expect(isValidMove(pieces.whitePawn, 6, 4, 5, 4)).toBe(true); // Single step
    expect(isValidMove(pieces.whitePawn, 6, 4, 4, 4)).toBe(true); // Double step

    board.setSquare(5, 5, pieces.blackPawn); // Enemy to capture
    expect(isValidMove(pieces.whitePawn, 6, 4, 5, 5)).toBe(true); // Diagonal capture
});

test('White Pawn: Invalid Moves', () => {
    board.setSquare(6, 4, pieces.whitePawn);
    expect(isValidMove(pieces.whitePawn, 6, 4, 6, 4)).toBe(false); // No movement
    expect(isValidMove(pieces.whitePawn, 6, 4, 5, 3)).toBe(false); // Illegal diagonal move
    expect(isValidMove(pieces.whitePawn, 6, 4, 4, 3)).toBe(false); // Impossible L-move
});