async function writeFile(path, data, options) {
  options = getOptions(options, { encoding: 'utf8', mode: 0o666, flag: 'w' });
  const flag = options.flag || 'w';

  if (!isArrayBufferView(data) && !isCustomIterable(data)) {
    validatePrimitiveStringAfterArrayBufferView(data, 'data');
    data = Buffer.from(data, options.encoding || 'utf8');
  }

  validateAbortSignal(options.signal);
  if (path instanceof FileHandle)
    return writeFileHandle(path, data, options.signal, options.encoding);

  checkAborted(options.signal);

  const fd = await open(path, flag, options.mode);
  return handleFdClose(
    writeFileHandle(fd, data, options.signal, options.encoding), fd.close);
}