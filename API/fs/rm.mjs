async function rm(path, options) {
  path = pathModule.toNamespacedPath(getValidatedPath(path));
  options = await validateRmOptionsPromise(path, options, false);
  return rimrafPromises(path, options);
}