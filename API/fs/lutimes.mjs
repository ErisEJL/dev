async function lutimes(path, atime, mtime) {
  path = getValidatedPath(path);
  return binding.lutimes(pathModule.toNamespacedPath(path),
                         toUnixTimestamp(atime),
                         toUnixTimestamp(mtime),
                         kUsePromises);
}