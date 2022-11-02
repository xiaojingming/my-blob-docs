const path = require('path')

module.exports = (options) => {
  return {
    name: 'vuepress-plugin-code-copy',
    define: {
      copyButtonText: options.copyButtonText || 'copy',
      copiedButtonText: options.copiedButtonText || 'copied!',
    },
    clientRootMixin: path.resolve(__dirname, 'clientRootMixin.js'),
  };
};
