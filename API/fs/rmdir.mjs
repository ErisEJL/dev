async function rmdir(path, options) {
  path = pathModule.toNamespacedPath(getValidatedPath(path));
  options = validateRmdirOptions(options);

  if (options.recursive) {
    emitRecursiveRmdirWarning();
    const stats = await stat(path);
    if (stats.isDirectory()) {
      return rimrafPromises(path, options);
    }
  }

  return binding.rmdir(path, kUsePromises);
}