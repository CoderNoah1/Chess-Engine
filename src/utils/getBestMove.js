import { pieces } from "../pieces.js";
import { evaluateBoard } from "./evaluateBoard.js";
import { getAllLegalDetailedMoves, getAllLegalMoves } from "./getAllLegalMoves.js";

export function getBestMove (board, isWhiteToMove, depth = null) {
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






    let bestMove = null

    const allLegalDetailedMoves = getAllLegalDetailedMoves(board, isWhiteToMove)
    const randomIndex = Math.floor(Math.random() * allLegalDetailedMoves.length)

    bestMove = allLegalDetailedMoves[randomIndex];

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

    function minimax(node, depth, maximizingPlayer) {
        if (depth === 0 || node.children.length === 0) {
            return evaluateBoard(node.board); // Return evaluation at leaf
        }
    
        if (maximizingPlayer) {
            let maxEval = -Infinity;
            for (let child of node.children) {
                let evaluation = minimax(child, depth - 1, false);
                maxEval = Math.max(maxEval, evaluation);
            }
            return maxEval;
        } else {
            let minEval = Infinity;
            for (let child of node.children) {
                let evaluation = minimax(child, depth - 1, true);
                minEval = Math.min(minEval, evaluation);
            }
            return minEval;
        }
    }
    
}