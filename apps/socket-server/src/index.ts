// import "dotenv/config";
// import express from "express";
// import { createServer } from "http";
// import cors from "cors";
// import { Server } from "socket.io";
// import { registerAllGameSockets } from "./games/registerSockets";

// const app = express();
// app.use(cors());
// app.use(express.json());

// const server = createServer(app);
// const io = new Server(server, {
//   cors: { origin: "*" },
// });

// // 🪩 Catch-all route → any route shows this message
// app.use((_req, res) => {
//   res.send(`
//     <div style="
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       min-height: 80vh;
//       font-size:30px;
//     ">
//       <h1>AniCoin Server</h1>
//     </div>
//   `);
// });


// // REST APIs
// // app.use("/api/games", gamesRouter);

// // ✅ Modular Socket.IO setup
// registerAllGameSockets(io);

// const PORT = 4000;
// server.listen(PORT, () => console.log(`🎮 Game backend running on port ${PORT}`));

console.log("Started!");
