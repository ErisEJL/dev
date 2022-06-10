async function lchown(path, uid, gid) {
  path = getValidatedPath(path);
  validateInteger(uid, 'uid', -1, kMaxUserId);
  validateInteger(gid, 'gid', -1, kMaxUserId);
  return binding.lchown(pathModule.toNamespacedPath(path),
                        uid, gid, kUsePromises);
}