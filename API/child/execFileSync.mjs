function execFileSync(command, args, options) {
  options = normalizeSpawnArguments(command, args, options);

  const inheritStderr = !options.stdio;
  const ret = spawnSync(options.file,
                        ArrayPrototypeSlice(options.args, 1), options);

  if (inheritStderr && ret.stderr)
    process.stderr.write(ret.stderr);

  const err = checkExecSyncError(ret, options.args, undefined);

  if (err)
    throw err;

  return ret.stdout;
}