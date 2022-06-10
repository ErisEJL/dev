async function chown(path, uid, gid) {
  path = getValidatedPath(path);
  validateInteger(uid, 'uid', -1, kMaxUserId);
  validateInteger(gid, 'gid', -1, kMaxUserId);
  return binding.chown(pathModule.toNamespacedPath(path),
                       uid, gid, kUsePromises);
}