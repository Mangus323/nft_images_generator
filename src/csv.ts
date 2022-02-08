const basePath = process.cwd();
const { generateCSV } = require(`${basePath}/utils/generate_csv.js`);
const { generateRarity } = require(`${basePath}/utils/rarity.js`);

(() => {
    generateCSV();
    generateRarity();
})();
