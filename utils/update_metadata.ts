const fs = require('fs');
const basePath = process.cwd();
const buildDir = `${basePath}/build`;



const getRawData = () => {
  for (let i = 1; i <= 10000; i++) {
    try {
      let rawData = (JSON.parse(fs.readFileSync(`${buildDir}/json/${i}.json`)));
      rawData.image = `ipfs://${hash}`;
      fs.writeFileSync(`${buildDir}/updated_json/${i}.json`, JSON.stringify(rawData, null, 2));
    } catch (e) {
      return;
    }
  }
};

getRawData();

