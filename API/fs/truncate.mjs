async function truncate(path, len = 0) {
  const fd = await open(path, 'r+');
  return handleFdClose(ftruncate(fd, len), fd.close);
}