import { Chess, SQUARES, type Square, type Move } from "chess.js";
import { Color } from "chessground/types";

/**
 * Computes all legal destination squares for each square on the board.
 * @param chess An instance of the Chess.js engine
 * @returns A map of source squares to destination squares
 */
export function computeDests(chess: Chess): Map<Square, Square[]> {
  const dests = new Map<Square, Square[]>();

  for (const square of SQUARES) {
    const moves = chess.moves({ square, verbose: true }) as Move[];
    const uniqueTos = [...new Set(moves.map(m => m.to))];
    if (uniqueTos.length > 0) {
      dests.set(square, uniqueTos);
    }
  }

  return dests;
}

/**
 * Converts the Chess.js turn character ("w" or "b") into a Chessground color.
 * @param turn Either "w" or "b"
 * @returns "white" or "black"
 */
export function getTurnColor(turn: "w" | "b",reverse = false): Color {
  if(!reverse)
  return turn === "w" ? "white" : "black";
  return turn === "w" ? "black" : "white";
}

/*
**promo = one char
*/
export function promoteAble(chess:Chess, promo: string | undefined, from: string, to: string): string | undefined {
  if (promo) return promo

  const piece = chess.get(from)
  if (piece?.type === 'p') {
    const targetRank = parseInt(to[1], 10)
    const isPromotionRank = (piece.color === 'w' && targetRank === 8) || 
                            (piece.color === 'b' && targetRank === 1)

    if (isPromotionRank) {
      return 'q'
    }
  }
  return undefined
}

export function parseUCIMove(chess:Chess,uci: string) {
  const from = uci.slice(0, 2)
  const to = uci.slice(2, 4)
  let promotion = promoteAble(chess,uci[4], from,to)

  return { from, to, promotion }
}