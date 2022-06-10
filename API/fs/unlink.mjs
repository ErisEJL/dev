async function unlink(path) {
  path = getValidatedPath(path);
  return binding.unlink(pathModule.toNamespacedPath(path), kUsePromises);
}