async function open(path, flags, mode) {
  path = getValidatedPath(path);
  const flagsNumber = stringToFlags(flags);
  mode = parseFileMode(mode, 'mode', 0o666);
  return new FileHandle(
    await binding.openFileHandle(pathModule.toNamespacedPath(path),
                                 flagsNumber, mode, kUsePromises));
}