async function realpath(path, options) {
  options = getOptions(options, {});
  path = getValidatedPath(path);
  return binding.realpath(path, options.encoding, kUsePromises);
}