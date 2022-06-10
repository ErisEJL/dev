async function symlink(target, path, type_) {
  const type = (typeof type_ === 'string' ? type_ : null);
  target = getValidatedPath(target, 'target');
  path = getValidatedPath(path);
  return binding.symlink(preprocessSymlinkDestination(target, type, path),
                         pathModule.toNamespacedPath(path),
                         stringToSymlinkType(type),
                         kUsePromises);
}