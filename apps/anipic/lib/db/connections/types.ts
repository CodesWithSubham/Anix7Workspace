import { Connection } from "mongoose";

interface CachedConnection {
  conn: Connection | null;
  promise: Promise<Connection> | null;
}

// Extend the NodeJS global object to include
declare global {
  var _aniPicDb: CachedConnection | undefined;
}
