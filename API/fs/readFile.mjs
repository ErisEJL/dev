async function readFile(path, options) {
  options = getOptions(options, { flag: 'r' });
  const flag = options.flag || 'r';

  if (path instanceof FileHandle)
    return readFileHandle(path, options);

  checkAborted(options.signal);

  const fd = await open(path, flag, 0o666);
  return handleFdClose(readFileHandle(fd, options), fd.close);
}