async function stat(path, options = { bigint: false }) {
  path = getValidatedPath(path);
  const result = await binding.stat(pathModule.toNamespacedPath(path),
                                    options.bigint, kUsePromises);
  return getStatsFromBinding(result);
}