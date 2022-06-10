function ChildProcess() {
  FunctionPrototypeCall(EventEmitter, this);

  this._closesNeeded = 1;
  this._closesGot = 0;
  this.connected = false;

  this.signalCode = null;
  this.exitCode = null;
  this.killed = false;
  this.spawnfile = null;

  this._handle = new Process();
  this._handle[owner_symbol] = this;

  this._handle.onexit = (exitCode, signalCode) => {
    if (signalCode) {
      this.signalCode = signalCode;
    } else {
      this.exitCode = exitCode;
    }

    if (this.stdin) {
      this.stdin.destroy();
    }

    this._handle.close();
    this._handle = null;

    if (exitCode < 0) {
      const syscall = this.spawnfile ? 'spawn ' + this.spawnfile : 'spawn';
      const err = errnoException(exitCode, syscall);

      if (this.spawnfile)
        err.path = this.spawnfile;

      err.spawnargs = ArrayPrototypeSlice(this.spawnargs, 1);
      this.emit('error', err);
    } else {
      this.emit('exit', this.exitCode, this.signalCode);
    }

    // If any of the stdio streams have not been touched,
    // then pull all the data through so that it can get the
    // eof and emit a 'close' event.
    // Do it on nextTick so that the user has one last chance
    // to consume the output, if for example they only want to
    // start reading the data once the process exits.
    process.nextTick(flushStdio, this);

    maybeClose(this);
  };
}