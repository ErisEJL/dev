async function access(path, mode = F_OK) {
  path = getValidatedPath(path);

  mode = getValidMode(mode, 'access');
  return binding.access(pathModule.toNamespacedPath(path), mode,
                        kUsePromises);
}