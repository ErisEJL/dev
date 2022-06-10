async function readdir(path, options) {
  options = getOptions(options, {});
  path = getValidatedPath(path);
  const result = await binding.readdir(pathModule.toNamespacedPath(path),
                                       options.encoding,
                                       !!options.withFileTypes,
                                       kUsePromises);
  return options.withFileTypes ?
    getDirectoryEntriesPromise(path, result) :
    result;
}