async function cp(src, dest, options) {
  options = validateCpOptions(options);
  src = pathModule.toNamespacedPath(getValidatedPath(src, 'src'));
  dest = pathModule.toNamespacedPath(getValidatedPath(dest, 'dest'));
  return lazyLoadCpPromises()(src, dest, options);
}