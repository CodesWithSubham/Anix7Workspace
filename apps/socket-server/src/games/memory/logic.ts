// import { GameState } from "./types";

// export function createMemoryGame(tgId: string): GameState {
//   const emojis = ["🐶", "🐱", "🦊", "🐻", "🐼", "🐸", "🐵", "🐔"];
//   const cards = [...emojis, ...emojis].sort(() => Math.random() - 0.5);
//   console.log("cards", cards);
//   return {
//     id: crypto.randomUUID(),
//     tgId,
//     board: cards,
//     revealed: Array(16).fill(false),
//     matched: Array(16).fill(false),
//     lastPick: null,
//     moves: 0,
//     createdAt: Date.now(),
//   };
// }

// export function revealCard(state: GameState, index: number) {
//   const { id, board, revealed, matched, lastPick, moves } = state;

//   // if already revealed or matched
//   if ((revealed[index] && index === lastPick) || matched[index]) return { valid: false, state };
//   // if index out of range
//   if (index < 0 || index >= 16) return { valid: false, state };
//   console.log("lastPick", lastPick);
//   const newState = {
//     ...state,
//     revealed: lastPick !== null ? [...state.revealed] : Array(16).fill(false),
//     matched: [...matched],
//   };
//   newState.revealed[index] = true;

//   // if move if first to match
//   if (lastPick === null) {
//     newState.lastPick = index;
//     return { valid: true, state: newState };
//   }

//   newState.moves++;
//   const first = lastPick;
//   const second = index;

//   if (newState.board[first] === newState.board[second]) {
//     newState.matched[first] = true;
//     newState.matched[second] = true;
//     newState.lastPick = null;
//     return { valid: true, state: newState, match: true };
//   } else {
//     newState.lastPick = null;
//     return { valid: true, state: newState, match: false };
//   }
// }

// type Score = { totalMoves: number; duration: number; matchedPairs: number };
// export function calculateMemoryPuzzleScore({ totalMoves, duration, matchedPairs }: Score) {
//   const mpS = matchedPairs * 100;
//   const tmS = totalMoves * 20;
//   const dS = duration * 2;

//   const finalScore = mpS - (tmS + dS);

//   return Math.max(0, Math.round(finalScore));
// }
