async function readlink(path, options) {
  options = getOptions(options, {});
  path = getValidatedPath(path, 'oldPath');
  return binding.readlink(pathModule.toNamespacedPath(path),
                          options.encoding, kUsePromises);
}