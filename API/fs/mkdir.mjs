async function mkdir(path, options) {
  if (typeof options === 'number' || typeof options === 'string') {
    options = { mode: options };
  }
  const {
    recursive = false,
    mode = 0o777
  } = options || {};
  path = getValidatedPath(path);
  validateBoolean(recursive, 'options.recursive');

  return binding.mkdir(pathModule.toNamespacedPath(path),
                       parseFileMode(mode, 'mode', 0o777), recursive,
                       kUsePromises);
}