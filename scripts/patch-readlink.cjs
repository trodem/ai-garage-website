"use strict";

/**
 * Node 24 on this Windows filesystem throws EISDIR from fs.readlink on regular
 * (non-symlink) files, where Node normally returns EINVAL ("not a symbolic
 * link"). webpack/enhanced-resolve calls readlink on every resolved file and
 * only tolerates EINVAL/ENOENT/UNKNOWN, so the EISDIR aborts `next build`.
 *
 * This module is preloaded via NODE_OPTIONS=--require so the patch applies to
 * every process Next spawns (including build workers). The project uses no
 * symlinked packages, so translating EISDIR -> EINVAL is safe: each file is
 * then treated as its own real path.
 */
const fs = require("fs");

function makeEinval(path) {
  const err = new Error(`EINVAL: invalid argument, readlink '${String(path)}'`);
  err.code = "EINVAL";
  err.errno = -22;
  err.syscall = "readlink";
  err.path = String(path);
  return err;
}

const origReadlinkSync = fs.readlinkSync;
fs.readlinkSync = function (path, options) {
  try {
    return origReadlinkSync.call(this, path, options);
  } catch (e) {
    if (e && e.code === "EISDIR") throw makeEinval(path);
    throw e;
  }
};

const origReadlink = fs.readlink;
fs.readlink = function (path, options, callback) {
  const cb = typeof options === "function" ? options : callback;
  const opts = typeof options === "function" ? undefined : options;
  return origReadlink.call(this, path, opts, function (err, link) {
    if (err && err.code === "EISDIR") return cb(makeEinval(path));
    return cb(err, link);
  });
};

if (fs.promises && fs.promises.readlink) {
  const origReadlinkPromise = fs.promises.readlink;
  fs.promises.readlink = async function (path, options) {
    try {
      return await origReadlinkPromise.call(this, path, options);
    } catch (e) {
      if (e && e.code === "EISDIR") throw makeEinval(path);
      throw e;
    }
  };
}
