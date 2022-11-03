const path = require('path');

module.exports = () => {
  return {
    name: 'vuepress-plugin-code-try',
    clientRootMixin: path.resolve(__dirname, 'clientRootMixin.js'),
  };
}
