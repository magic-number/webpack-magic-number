((g) => {
  const globalThis = g as any;
  globalThis.reportCoverage = () => {
      const { __coverage__, MagicClient } = globalThis;
      return MagicClient.reportCoverage(__coverage__);
  };
})(window);
