const path = require('path');

module.exports = {
  library: {
  	name: 'hadronAppRegistryMiddleware',
  	target: 'umd'
  },
  path: {
    src: path.join(__dirname, '/../src'),
    output: path.join(__dirname, '/../lib'),
  }
};
