import { test, expect, describe } from '@jest/globals';
import { isValidMove } from '../src/utils/isValidMove.js';
import { pieces } from '../src/pieces.js';
import { board } from '../src/board.js';
// more efficient way to test all the moves

////////////////////////////////////////////////////////////////////////////////////////
// White Pieces
describe('isValidMove - White Pawn', () => {
    test('Single move forward', () => {
        for (let col = 0; col < 8; col++) {
            for (let row = 0; row < 8; row++) {
                board.setSquare(row, col) = pieces.emptySquare;
                
                if (!(row === 7 || row === 0)) {
                    expect(isValidMove(pieces.whitePawn, row, col, row - 1, col)).toBe(true);
                }
            }
        }
    });

    test('Double move forward from starting position', () => {
        for (let col = 0; col < 8; col++) {
            expect(isValidMove(pieces.whitePawn, 6, col, 4, col)).toBe(true);
        }
    });

    test('Capture move', () => {
        for (let startCol = 0; startCol < 8; startCol++) {
            for (let startRow = 1; startRow < 7; startRow++) {
                board.setSquare(startRow - 1, startCol - 1) = pieces.blackPawn;
                board[startRow - 1][startCol + 1] = pieces.blackPawn;
                expect(isValidMove(pieces.whitePawn, startRow, startCol, startRow + 1, startCol + 1)).toBe(true);
                expect(isValidMove(pieces.whitePawn, startRow, startCol, startRow + 1, startCol - 1)).toBe(true);
            }
        }
    });

    test('Invalid moves', () => {
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                if (!(row === 7 || row === 0 || (col === 4 && (row === 5 || row === 4)))) {
                    expect(isValidMove(pieces.whitePawn, 6, 4, row, col)).toBe(false);
                }
            }
        }
    });
});

describe('isValidMove - White Rook', () => {
    test('Vertical moves', () => {
        for (let col = 0; col < 8; col++) {
            for (let rowStart = 0; rowStart < 8; rowStart++) {
                for (let rowEnd = 0; rowEnd < 8; rowEnd++) {
                    if (!(rowStart === rowEnd)) {
                        expect(isValidMove(pieces.whiteRook, rowStart, col, rowEnd, col)).toBe(true);
                    }
                }
            }
        }
    })

    test('Horizontal moves', () => {
        for (let row = 0; row < 8; row++) {
            for (let colStart = 0; colStart < 8; colStart++) {
                for (let colEnd = 0; colEnd < 8; colEnd++) {
                    if (!(colStart === colEnd)) {
                        expect(isValidMove(pieces.whiteRook, row, colStart, row, colEnd)).toBe(true);
                    }
                }
            }
        }
    })

    test('Invalid moves', () => {
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                if (!(col === 0 || row === 7)) {
                    expect(isValidMove(pieces.whiteRook, 7, 0, row, col)).toBe(false);
                }
            }
        }
    });
});

describe('isValidMove - White Knight', () => {
    test('L-shaped moves', () => {
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                if (!(row - 2 < 0 || col - 1 < 0)) {
                    expect(isValidMove(pieces.whiteKnight, row, col, row - 2, col - 1)).toBe(true);
                }
                if (!(row - 2 < 0 || col + 1 > 7)) {
                    expect(isValidMove(pieces.whiteKnight, row, col, row - 2, col + 1)).toBe(true);
                }
                if (!(row - 1 < 0 || col + 2 > 7)) {
                    expect(isValidMove(pieces.whiteKnight, row, col, row - 1, col + 2)).toBe(true);
                }
                if (!(row + 1 > 7 || col + 2 > 7)) {
                    expect(isValidMove(pieces.whiteKnight, row, col, row + 1, col + 2)).toBe(true);
                }

                if (!(row + 2 > 7 || col - 1 < 0)) {
                    expect(isValidMove(pieces.whiteKnight, row, col, row + 2, col - 1)).toBe(true);
                }
                if (!(row + 2 > 7 || col + 1 > 7)) {
                    expect(isValidMove(pieces.whiteKnight, row, col, row + 2, col + 1)).toBe(true);
                }
                if (!(row - 1 < 0 || col - 2 < 0)) {
                    expect(isValidMove(pieces.whiteKnight, row, col, row - 1, col - 2)).toBe(true);
                }
                if (!(row + 1 > 7 || col - 2 < 0)) {
                    expect(isValidMove(pieces.whiteKnight, row, col, row + 1, col - 2)).toBe(true);
                }
            }
        }
    });

    test('Invalid moves', () => {
        for (let startRow = 0; startRow < 8; startRow++) {
            for (let startCol = 0; startCol < 8; startCol++) {
                for (let endRow = 0; endRow < 8; endRow++) {
                    for (let endCol = 0; endCol < 8; endCol++) {
                        if (!((Math.abs(startCol - endCol) === 2 && Math.abs(startRow - endRow) === 1) || (Math.abs(startCol - endCol) === 1 && Math.abs(startRow - endRow) === 2))) {
                            expect(isValidMove(pieces.whiteKnight, startRow, startCol, endRow, endCol)).toBe(false);
                        }
                    }
                }
            }
        }
    });
});

describe('isValidMove - White Bishop', () => {
    test('Valid diagonal moves', () => {
        for (let startRow = 0; startRow < 8; startRow++) {
            for (let startCol = 0; startCol < 8; startCol++) {
                for (let offset = 1; offset < 8; offset++) {
                    // All four diagonal directions
                    if (startRow + offset < 8 && startCol + offset < 8) {
                        expect(isValidMove(pieces.whiteBishop, startRow, startCol, startRow + offset, startCol + offset)).toBe(true);
                    }
                    if (startRow - offset >= 0 && startCol - offset >= 0) {
                        expect(isValidMove(pieces.whiteBishop, startRow, startCol, startRow - offset, startCol - offset)).toBe(true);
                    }
                    if (startRow + offset < 8 && startCol - offset >= 0) {
                        expect(isValidMove(pieces.whiteBishop, startRow, startCol, startRow + offset, startCol - offset)).toBe(true);
                    }
                    if (startRow - offset >= 0 && startCol + offset < 8) {
                        expect(isValidMove(pieces.whiteBishop, startRow, startCol, startRow - offset, startCol + offset)).toBe(true);
                    }
                }
            }
        }
    });

    test('Invalid moves', () => {
        for (let startRow = 0; startRow < 8; startRow++) {
            for (let startCol = 0; startCol < 8; startCol++) {
                for (let endRow = 0; endRow < 8; endRow++) {
                    for (let endCol = 0; endCol < 8; endCol++) {
                        if (!(Math.abs(startCol - endCol) === Math.abs(startRow - endRow))) {
                            expect(isValidMove(pieces.whiteBishop, startRow, startCol, endRow, endCol)).toBe(false);
                        }
                    }
                }
            }
        }
    });
});

describe('isValidMove - White Queen', () => {
    test('Valid diagonal moves', () => {
        for (let startRow = 0; startRow < 8; startRow++) {
            for (let startCol = 0; startCol < 8; startCol++) {
                for (let offset = 1; offset < 8; offset++) {
                    // All four diagonal directions
                    if (startRow + offset < 8 && startCol + offset < 8) {
                        expect(isValidMove(pieces.whiteQueen, startRow, startCol, startRow + offset, startCol + offset)).toBe(true);
                    }
                    if (startRow - offset >= 0 && startCol - offset >= 0) {
                        expect(isValidMove(pieces.whiteQueen, startRow, startCol, startRow - offset, startCol - offset)).toBe(true);
                    }
                    if (startRow + offset < 8 && startCol - offset >= 0) {
                        expect(isValidMove(pieces.whiteQueen, startRow, startCol, startRow + offset, startCol - offset)).toBe(true);
                    }
                    if (startRow - offset >= 0 && startCol + offset < 8) {
                        expect(isValidMove(pieces.whiteQueen, startRow, startCol, startRow - offset, startCol + offset)).toBe(true);
                    }
                }
            }
        }
    });

    test('Vertical moves', () => {
        for (let col = 0; col < 8; col++) {
            for (let rowStart = 0; rowStart < 8; rowStart++) {
                for (let rowEnd = 0; rowEnd < 8; rowEnd++) {
                    if (!(rowStart === rowEnd)) {
                        expect(isValidMove(pieces.whiteQueen, rowStart, col, rowEnd, col)).toBe(true);
                    }
                }
            }
        }
    })

    test('Horizontal moves', () => {
        for (let row = 0; row < 8; row++) {
            for (let colStart = 0; colStart < 8; colStart++) {
                for (let colEnd = 0; colEnd < 8; colEnd++) {
                    if (!(colStart === colEnd)) {
                        expect(isValidMove(pieces.whiteQueen, row, colStart, row, colEnd)).toBe(true);
                    }
                }
            }
        }
    })

    test('Invalid moves', () => {
        for (let startRow = 0; startRow < 8; startRow++) {
            for (let startCol = 0; startCol < 8; startCol++) {
                for (let endRow = 0; endRow < 8; endRow++) {
                    for (let endCol = 0; endCol < 8; endCol++) {
                        const isValid = startRow === endRow || 
                                        startCol === endCol || 
                                        Math.abs(startRow - endRow) === Math.abs(startCol - endCol);
    
                        if (!isValid) {
                            expect(isValidMove(pieces.whiteQueen, startRow, startCol, endRow, endCol)).toBe(false);
                        }
                    }
                }
            }
        }
    });
});

describe('isValidMove - White King', () => {
    test('Valid moves', () => {
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                if (row - 1 >= 0) expect(isValidMove(pieces.whiteKing, row, col, row - 1, col)).toBe(true);
                if (row - 1 >= 0 && col + 1 < 8) expect(isValidMove(pieces.whiteKing, row, col, row - 1, col + 1)).toBe(true);
                if (col + 1 < 8) expect(isValidMove(pieces.whiteKing, row, col, row, col + 1)).toBe(true);
                if (row + 1 < 8 && col + 1 < 8) expect(isValidMove(pieces.whiteKing, row, col, row + 1, col + 1)).toBe(true);

                if (row + 1 < 8) expect(isValidMove(pieces.whiteKing, row, col, row + 1, col)).toBe(true);
                if (row + 1 < 8 && col - 1 >= 0) expect(isValidMove(pieces.whiteKing, row, col, row + 1, col - 1)).toBe(true);
                if (col - 1 >= 0) expect(isValidMove(pieces.whiteKing, row, col, row, col - 1)).toBe(true);
                if (row - 1 >= 0 && col - 1 >= 0) expect(isValidMove(pieces.whiteKing, row, col, row - 1, col - 1)).toBe(true);

            }
        }
    });

    test('Invalid moves', () => {
        for (let startRow = 0; startRow < 8; startRow++) {
            for (let startCol = 0; startCol < 8; startCol++) {
                for (let endRow = 0; endRow < 8; endRow++) {
                    for (let endCol = 0; endCol < 8; endCol++) {
                        if (!(Math.abs(startRow - endRow) <= 1 && Math.abs(startCol - endCol) <= 1)) {
                            expect(isValidMove(pieces.whiteKing, startRow, startCol, endRow, endCol)).toBe(false);
                        }
                    }
                }
            }
        }
    });
});


////////////////////////////////////////////////////////////////////////////////////////
// Black Pieces
describe('isValidMove - Black Pawn', () => {
    test('Single move forward', () => {
        for (let col = 0; col < 8; col++) {
            for (let row = 0; row < 8; row++) {
                board[row][col] = pieces.emptySquare;
                if (!(row === 7 || row === 0)) {
                    expect(isValidMove(pieces.blackPawn, row, col, row - 1, col)).toBe(true);
                }
            }
        }
    });

    test('Double move forward from starting position', () => {
        for (let col = 0; col < 8; col++) {
            expect(isValidMove(pieces.blackPawn, 6, col, 4, col)).toBe(true);
        }
    });

    test('Invalid moves', () => {
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                if (!(row === 7 || row === 0 || (col === 4 && (row === 5 || row === 4)))) {
                    expect(isValidMove(pieces.blackPawn, 6, 4, row, col)).toBe(false);
                }
            }
        }
    });
});

describe('isValidMove - Black Rook', () => {
    test('Vertical moves', () => {
        for (let col = 0; col < 8; col++) {
            for (let rowStart = 0; rowStart < 8; rowStart++) {
                for (let rowEnd = 0; rowEnd < 8; rowEnd++) {
                    if (!(rowStart === rowEnd)) {
                        expect(isValidMove(pieces.blackRook, rowStart, col, rowEnd, col)).toBe(true);
                    }
                }
            }
        }
    })

    test('Horizontal moves', () => {
        for (let row = 0; row < 8; row++) {
            for (let colStart = 0; colStart < 8; colStart++) {
                for (let colEnd = 0; colEnd < 8; colEnd++) {
                    if (!(colStart === colEnd)) {
                        expect(isValidMove(pieces.blackRook, row, colStart, row, colEnd)).toBe(true);
                    }
                }
            }
        }
    })

    test('Invalid moves', () => {
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                if (!(col === 0 || row === 7)) {
                    expect(isValidMove(pieces.blackRook, 7, 0, row, col)).toBe(false);
                }
            }
        }
    });
});

describe('isValidMove - Black Knight', () => {
    test('L-shaped moves', () => {
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                if (!(row - 2 < 0 || col - 1 < 0)) {
                    expect(isValidMove(pieces.blackKnight, row, col, row - 2, col - 1)).toBe(true);
                }
                if (!(row - 2 < 0 || col + 1 > 7)) {
                    expect(isValidMove(pieces.blackKnight, row, col, row - 2, col + 1)).toBe(true);
                }
                if (!(row - 1 < 0 || col + 2 > 7)) {
                    expect(isValidMove(pieces.blackKnight, row, col, row - 1, col + 2)).toBe(true);
                }
                if (!(row + 1 > 7 || col + 2 > 7)) {
                    expect(isValidMove(pieces.blackKnight, row, col, row + 1, col + 2)).toBe(true);
                }

                if (!(row + 2 > 7 || col - 1 < 0)) {
                    expect(isValidMove(pieces.blackKnight, row, col, row + 2, col - 1)).toBe(true);
                }
                if (!(row + 2 > 7 || col + 1 > 7)) {
                    expect(isValidMove(pieces.blackKnight, row, col, row + 2, col + 1)).toBe(true);
                }
                if (!(row - 1 < 0 || col - 2 < 0)) {
                    expect(isValidMove(pieces.blackKnight, row, col, row - 1, col - 2)).toBe(true);
                }
                if (!(row + 1 > 7 || col - 2 < 0)) {
                    expect(isValidMove(pieces.blackKnight, row, col, row + 1, col - 2)).toBe(true);
                }
            }
        }
    });

    test('Invalid moves', () => {
        for (let startRow = 0; startRow < 8; startRow++) {
            for (let startCol = 0; startCol < 8; startCol++) {
                for (let endRow = 0; endRow < 8; endRow++) {
                    for (let endCol = 0; endCol < 8; endCol++) {
                        if (!((Math.abs(startCol - endCol) === 2 && Math.abs(startRow - endRow) === 1) || (Math.abs(startCol - endCol) === 1 && Math.abs(startRow - endRow) === 2))) {
                            expect(isValidMove(pieces.blackKnight, startRow, startCol, endRow, endCol)).toBe(false);
                        }
                    }
                }
            }
        }
    });
});

describe('isValidMove - Black Bishop', () => {
    test('Valid diagonal moves', () => {
        for (let startRow = 0; startRow < 8; startRow++) {
            for (let startCol = 0; startCol < 8; startCol++) {
                for (let offset = 1; offset < 8; offset++) {
                    // All four diagonal directions
                    if (startRow + offset < 8 && startCol + offset < 8) {
                        expect(isValidMove(pieces.blackBishop, startRow, startCol, startRow + offset, startCol + offset)).toBe(true);
                    }
                    if (startRow - offset >= 0 && startCol - offset >= 0) {
                        expect(isValidMove(pieces.blackBishop, startRow, startCol, startRow - offset, startCol - offset)).toBe(true);
                    }
                    if (startRow + offset < 8 && startCol - offset >= 0) {
                        expect(isValidMove(pieces.blackBishop, startRow, startCol, startRow + offset, startCol - offset)).toBe(true);
                    }
                    if (startRow - offset >= 0 && startCol + offset < 8) {
                        expect(isValidMove(pieces.blackBishop, startRow, startCol, startRow - offset, startCol + offset)).toBe(true);
                    }
                }
            }
        }
    });

    test('Invalid moves', () => {
        for (let startRow = 0; startRow < 8; startRow++) {
            for (let startCol = 0; startCol < 8; startCol++) {
                for (let endRow = 0; endRow < 8; endRow++) {
                    for (let endCol = 0; endCol < 8; endCol++) {
                        if (!(Math.abs(startCol - endCol) === Math.abs(startRow - endRow))) {
                            expect(isValidMove(pieces.blackBishop, startRow, startCol, endRow, endCol)).toBe(false);
                        }
                    }
                }
            }
        }
    });
});

describe('isValidMove - Black Queen', () => {
    test('Valid diagonal moves', () => {
        for (let startRow = 0; startRow < 8; startRow++) {
            for (let startCol = 0; startCol < 8; startCol++) {
                for (let offset = 1; offset < 8; offset++) {
                    // All four diagonal directions
                    if (startRow + offset < 8 && startCol + offset < 8) {
                        expect(isValidMove(pieces.blackQueen, startRow, startCol, startRow + offset, startCol + offset)).toBe(true);
                    }
                    if (startRow - offset >= 0 && startCol - offset >= 0) {
                        expect(isValidMove(pieces.blackQueen, startRow, startCol, startRow - offset, startCol - offset)).toBe(true);
                    }
                    if (startRow + offset < 8 && startCol - offset >= 0) {
                        expect(isValidMove(pieces.blackQueen, startRow, startCol, startRow + offset, startCol - offset)).toBe(true);
                    }
                    if (startRow - offset >= 0 && startCol + offset < 8) {
                        expect(isValidMove(pieces.blackQueen, startRow, startCol, startRow - offset, startCol + offset)).toBe(true);
                    }
                }
            }
        }
    });

    test('Vertical moves', () => {
        for (let col = 0; col < 8; col++) {
            for (let rowStart = 0; rowStart < 8; rowStart++) {
                for (let rowEnd = 0; rowEnd < 8; rowEnd++) {
                    if (!(rowStart === rowEnd)) {
                        expect(isValidMove(pieces.blackQueen, rowStart, col, rowEnd, col)).toBe(true);
                    }
                }
            }
        }
    })

    test('Horizontal moves', () => {
        for (let row = 0; row < 8; row++) {
            for (let colStart = 0; colStart < 8; colStart++) {
                for (let colEnd = 0; colEnd < 8; colEnd++) {
                    if (!(colStart === colEnd)) {
                        expect(isValidMove(pieces.blackQueen, row, colStart, row, colEnd)).toBe(true);
                    }
                }
            }
        }
    })

    test('Invalid moves', () => {
        for (let startRow = 0; startRow < 8; startRow++) {
            for (let startCol = 0; startCol < 8; startCol++) {
                for (let endRow = 0; endRow < 8; endRow++) {
                    for (let endCol = 0; endCol < 8; endCol++) {
                        const isValid = startRow === endRow || 
                                        startCol === endCol || 
                                        Math.abs(startRow - endRow) === Math.abs(startCol - endCol);
    
                        if (!isValid) {
                            expect(isValidMove(pieces.blackQueen, startRow, startCol, endRow, endCol)).toBe(false);
                        }
                    }
                }
            }
        }
    });
});

describe('isValidMove - Black King', () => {
    test('Valid moves', () => {
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                if (row - 1 >= 0) expect(isValidMove(pieces.blackKing, row, col, row - 1, col)).toBe(true);
                if (row - 1 >= 0 && col + 1 < 8) expect(isValidMove(pieces.blackKing, row, col, row - 1, col + 1)).toBe(true);
                if (col + 1 < 8) expect(isValidMove(pieces.blackKing, row, col, row, col + 1)).toBe(true);
                if (row + 1 < 8 && col + 1 < 8) expect(isValidMove(pieces.blackKing, row, col, row + 1, col + 1)).toBe(true);

                if (row + 1 < 8) expect(isValidMove(pieces.blackKing, row, col, row + 1, col)).toBe(true);
                if (row + 1 < 8 && col - 1 >= 0) expect(isValidMove(pieces.blackKing, row, col, row + 1, col - 1)).toBe(true);
                if (col - 1 >= 0) expect(isValidMove(pieces.blackKing, row, col, row, col - 1)).toBe(true);
                if (row - 1 >= 0 && col - 1 >= 0) expect(isValidMove(pieces.blackKing, row, col, row - 1, col - 1)).toBe(true);

            }
        }
    });

    test('Invalid moves', () => {
        for (let startRow = 0; startRow < 8; startRow++) {
            for (let startCol = 0; startCol < 8; startCol++) {
                for (let endRow = 0; endRow < 8; endRow++) {
                    for (let endCol = 0; endCol < 8; endCol++) {
                        if (!(Math.abs(startRow - endRow) <= 1 && Math.abs(startCol - endCol) <= 1)) {
                            expect(isValidMove(pieces.blackKing, startRow, startCol, endRow, endCol)).toBe(false);
                        }
                    }
                }
            }
        }
    });
});