async function* watch(filename, options = {}) {
  const path = toNamespacedPath(getValidatedPath(filename));
  validateObject(options, 'options');

  const {
    persistent = true,
    recursive = false,
    encoding = 'utf8',
    signal,
  } = options;

  validateBoolean(persistent, 'options.persistent');
  validateBoolean(recursive, 'options.recursive');
  validateAbortSignal(signal, 'options.signal');

  if (encoding && !isEncoding(encoding)) {
    const reason = 'is invalid encoding';
    throw new ERR_INVALID_ARG_VALUE(encoding, 'encoding', reason);
  }

  if (signal?.aborted)
    throw new AbortError(undefined, { cause: signal?.reason });

  const handle = new FSEvent();
  let { promise, resolve, reject } = createDeferredPromise();
  const oncancel = () => {
    handle.close();
    reject(new AbortError(undefined, { cause: signal?.reason }));
  };

  try {
    signal?.addEventListener('abort', oncancel, { once: true });
    handle.onchange = (status, eventType, filename) => {
      if (status < 0) {
        const error = uvException({
          errno: status,
          syscall: 'watch',
          path: filename
        });
        error.filename = filename;
        handle.close();
        reject(error);
        return;
      }

      resolve({ eventType, filename });
    };

    const err = handle.start(path, persistent, recursive, encoding);
    if (err) {
      const error = uvException({
        errno: err,
        syscall: 'watch',
        path: filename,
        message: err === UV_ENOSPC ?
          'System limit for number of file watchers reached' : ''
      });
      error.filename = filename;
      handle.close();
      throw error;
    }

    while (!signal?.aborted) {
      yield await promise;
      ({ promise, resolve, reject } = createDeferredPromise());
    }
    throw new AbortError(undefined, { cause: signal?.reason });
  } finally {
    handle.close();
    signal?.removeEventListener('abort', oncancel);
  }
}