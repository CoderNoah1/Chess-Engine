import { updateBoard } from "../app.js";
import { board } from "../board.js";
import { pieces } from "../pieces.js";
import { evaluateBoard } from "./evaluateBoard.js";
import { getAllLegalDetailedMoves, getAllLegalMoves } from "./getAllLegalMoves.js";

export function getBestMove (board, isWhiteToMove, depth = 2) {
    // class MoveNode {
    //     constructor(board, move = null) {
    //         this.board = board; 
    //         this.move = move; 
    //         this.children = []; 
    //     }
    // }

    // let bestMove = "null";
    // let bestEval = isWhiteToMove ? -Infinity : Infinity;

    // const rootNode = buildMoveTree(board, depth, isWhiteToMove)
    // console.log(rootNode)
    // console.log("rootNode")

    // for (let child of rootNode.children) {
    //     let evaluation = minimax(child, depth - 1, !isWhiteToMove);

    //     if (isWhiteToMove && evaluation > bestEval) {
    //         bestEval = evaluation;
    //         bestMove = child.move;
    //     } else if (!isWhiteToMove && evaluation < bestEval) {
    //         bestEval = evaluation;
    //         bestMove = child.move;
    //     }
    // }






    let bestMove = null;
    let bestEval = isWhiteToMove ? -Infinity : Infinity;

    const allLegalMoves = getAllLegalDetailedMoves(board, isWhiteToMove);

    for (let move of allLegalMoves) {
        const simulatedBoard = board.clone();
        updateBoard(simulatedBoard, move);

        const evaluation = minimax(simulatedBoard, depth - 1, !isWhiteToMove, -Infinity, Infinity);

        if (
            (isWhiteToMove && evaluation > bestEval) ||
            (!isWhiteToMove && evaluation < bestEval)
        ) {
            bestEval = evaluation;
            bestMove = move;
        }
    }

    return bestMove;

    

    function buildMoveTree(board, depth, isWhiteToMove) {
        if (depth === 0) return null; // Stop recursion at max depth
    
        let root = new MoveNode(board);
        let legalMoves = getAllLegalMoves(board, isWhiteToMove); // Generate legal moves
    
        for (let move of legalMoves) {
            let newBoard = board.clone(); // Copy board to avoid modifying original
            newBoard.makeMove(move); // Apply move
    
            // Recursively build tree
            let childNode = buildMoveTree(newBoard, depth - 1, !isWhiteToMove);
            childNode.move = move
            root.children.push(childNode); 
        }
    
        return root;
    }

    function minimax(board, depth, isWhiteToMove, alpha, beta) {
        if (depth === 0) {
            return evaluateBoard(board);
        }
    
        const moves = getAllLegalDetailedMoves(board, isWhiteToMove);
    
        if (isWhiteToMove) {
            let maxEval = -Infinity;
            for (const move of moves) {
                const simulatedBoard = board.clone();
                updateBoard(simulatedBoard, move);
                const evalu = minimax(simulatedBoard, depth - 1, false, alpha, beta);
                maxEval = Math.max(maxEval, evalu);
                alpha = Math.max(alpha, evalu);
                if (beta <= alpha) break;
            }
            return maxEval;
        } else {
            let minEval = Infinity;
            for (const move of moves) {
                const simulatedBoard = board.clone();
                updateBoard(simulatedBoard, move);
                const evalu = minimax(simulatedBoard, depth - 1, true, alpha, beta);
                minEval = Math.min(minEval, evalu);
                beta = Math.min(beta, evalu);
                if (beta <= alpha) break;
            }
            return minEval;
        }
    }
    

    // function minimax1(node, depth, maximizingPlayer) {
    //     if (depth === 0 || node.children.length === 0) {
    //         return evaluateBoard(node.board); // Return evaluation at leaf
    //     }
    
    //     if (maximizingPlayer) {
    //         let maxEval = -Infinity;
    //         for (let child of node.children) {
    //             let evaluation = minimax(child, depth - 1, false);
    //             maxEval = Math.max(maxEval, evaluation);
    //         }
    //         return maxEval;
    //     } else {
    //         let minEval = Infinity;
    //         for (let child of node.children) {
    //             let evaluation = minimax(child, depth - 1, true);
    //             minEval = Math.min(minEval, evaluation);
    //         }
    //         return minEval;
    //     }
    // }

}