async function lstat(path, options = { bigint: false }) {
  path = getValidatedPath(path);
  const result = await binding.lstat(pathModule.toNamespacedPath(path),
                                     options.bigint, kUsePromises);
  return getStatsFromBinding(result);
}