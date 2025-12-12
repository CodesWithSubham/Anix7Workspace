// import type { Server, Socket } from "socket.io";
// import { calculateMemoryPuzzleScore, createMemoryGame, revealCard } from "./logic";
// import getMemoryCardPuzzleModel from "@shared/lib/db/models/games/MemoryCardPuzzle";
// import { GameState } from "./types";
// import { jwtVerify } from "jose";

// /*
// `${socketEventPrefix}-create`
// `${socketEventPrefix}-init`
// `${socketEventPrefix}-reveal`
// `${socketEventPrefix}-update`
// `${socketEventPrefix}-leave`
// `${socketEventPrefix}-end`
// */

// const PREFIX = "MemoryCardPuzzle";
// const games = new Map<string, GameState>();
// const TIME_LIMIT_MS = 3 * 60 * 1000; // 3 minutes

// export function registerMemorySocket(io: Server) {
//   io.on("connection", (socket: Socket) => {
//     console.log(`🟢 [memory] Connected: ${socket.id}`);

//     socket.on(`${PREFIX}-create`, ({ token }: { token: string }) =>
//       handleCreate(socket, io, token)
//     );
//     socket.on(`${PREFIX}-reveal`, (data) => handleReveal(io, socket, data));
//     socket.on("disconnect", () => console.log(`🔴 [memory] Disconnected: ${socket.id}`));
//   });
// }

// async function handleCreate(socket: Socket, io: Server, token: string) {
//   try {
//     const SOCKET_SECRET = process.env.SOCKET_SECRET;
//     if (!SOCKET_SECRET) throw new Error("SOCKET_SECRET is missing");

//     // Secret key (in production, use env var)
//     const secret = new TextEncoder().encode(SOCKET_SECRET);
//     // ✅ Verify and decode the token
//     const { payload } = await jwtVerify(token, secret);
//     const tgId = payload.tgId as string;

//     if (!tgId) throw new Error("Invalid token payload");
//     console.log("tgId", tgId, typeof tgId);

//     // ✅ Create and register game
//     const game = createMemoryGame(tgId); // pass tgId
//     games.set(game.id, game);

//     // ✅ Join socket room & notify
//     socket.join(game.id);
//     socket.emit(`${PREFIX}-init`, { gameId: game.id });

//     console.log(`🎮 Created game ${game.id}`);

//     // Auto close after time limit
//     setTimeout(() => endGame(io, game.id, "⏰ Game timed out!"), TIME_LIMIT_MS);
//   } catch (err) {
//     console.error("❌ Game creation failed:", err);
//     socket.emit(`${PREFIX}-error`, {
//       message: err instanceof Error ? err.message : "Invalid or expired token",
//     });
//   }
// }

// async function handleReveal(io: Server, socket: Socket, { gameId, index }: any) {
//   const game = games.get(gameId);
//   if (!game) return socket.emit("error", { message: "Game not found" });

//   const result = revealCard(game, index);
//   games.set(gameId, result.state);

//   const revealedBoard = result.state.board.map((v, i) =>
//     result.state.revealed[i] || result.state.matched[i] ? v : null
//   );

//   const data = {
//     valid: result.valid,
//     isMatched: result.match,
//     revealed: revealedBoard,
//     matched: result.state.matched,
//     moves: result.state.moves,
//     lastPick: result.state.lastPick,
//   };

//   io.to(gameId).emit(`${PREFIX}-update`, data);

//   // All pairs matched → end game
//   if (result.state.matched.every(Boolean)) await endGame(io, gameId, "🏁 All pairs matched!");
// }

// async function endGame(io: Server, gameId: string, message: string) {
//   const game = games.get(gameId);
//   if (!game) return;

//   const GameModel = await getMemoryCardPuzzleModel();

//   const totalMoves = game.moves;
//   const duration = (Date.now() - game.createdAt) / 1000;
//   const matchedPairs = game.matched.filter(Boolean).length / 2;
//   const score = calculateMemoryPuzzleScore({ totalMoves, duration, matchedPairs });

//   await GameModel.create({ gameId, id: game.tgId, totalMoves, duration, matchedPairs, score });

//   games.delete(gameId);

//   const data = { message, gameId, totalMoves, duration, matchedPairs, score };
//   io.to(gameId).emit(`${PREFIX}-end`, data);

//   console.log(`🏁 Game ended: ${gameId}`);
   
// }
