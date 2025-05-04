import { Chess } from "chess.js";
import { getIndexNotation } from "./src/utils/getIndexNotation.js";
import { board } from "./src/board.js";
import { getAllLegalDetailedMoves } from "./src/utils/getAllLegalMoves.js";
import { getChessNotation } from "./src/utils/getChessNotation.js";

// const FEN = "r1bqk2r/ppp2ppp/2n2n2/3pp3/1b1P2P1/N7/PPP1PP1P/R1BQKBNR w Kkq - 1 6"
// // const FEN = "r1bqk2r/ppp2ppp/2n2nB1/3pp3/1b1P2P1/N7/PPPQPP1P/R1B1K1NR w Kkq - 9 10"

// const chess = new Chess(FEN);
// board.loadFENCode(FEN);

// const allLegalMovesFasit = chess.moves()
// const allLegalMoves = getAllLegalDetailedMoves(board, true);
// console.log("fasit: ", allLegalMovesFasit)

// for (let move of allLegalMoves) {
//     let jfefjeslfje = getChessNotation(move);
//     console.log(jfefjeslfje)
// }



