async function mkdtemp(prefix, options) {
  options = getOptions(options, {});

  validateString(prefix, 'prefix');
  nullCheck(prefix);
  warnOnNonPortableTemplate(prefix);
  return binding.mkdtemp(`${prefix}XXXXXX`, options.encoding, kUsePromises);
}