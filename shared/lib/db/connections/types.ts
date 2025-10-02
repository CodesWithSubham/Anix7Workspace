import { Connection } from "mongoose";

interface CachedConnection {
  conn: Connection | null;
  promise: Promise<Connection> | null;
}

// Extend the NodeJS global object to include _userDb
declare global {
  // Avoid TS error on redeclaration in hot reload
  // eslint-disable-next-line no-var
  var _userDb: CachedConnection | undefined;
  var _imageUploadDb: CachedConnection | undefined;
  var _shortUrlDb: CachedConnection | undefined;
  var _aniPicDb: CachedConnection | undefined;
}
