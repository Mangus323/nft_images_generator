const basePath = process.cwd();
const {createSingle} = require(`${basePath}/src/main.js`);

(() => {
  createSingle();
})();
