const basePath = process.cwd();
const fs = require("fs");
const {getTraitByName} = require(`${basePath}/src/names_list.js`);
const {getExcludes} = require(`${basePath}/src/exclude_list.js`);
const separator = ";"
let rawData = [];

const getTraitImagesIndexes = (trait_type, name) => {
  let returnValue = "";
  rawData.forEach((row, index) => {
    row.attributes.forEach((item) => {
      if (item.trait_type === trait_type && item.name === name) {
        returnValue += `${index + 1},`;
      }
    })
  })
  return returnValue;
}

const getRawData = () => {
  for (let i = 1; i <= 10000; i++) {
    try {
      rawData.push(JSON.parse(fs.readFileSync(`${basePath}/build/json/${i}.json`)));
    } catch (e) {
      return;
    }
  }
}

const generateRarity = () => {
  getRawData();

  let traitList = {}
  let csv = '';

  rawData.forEach((row) => {
    row.attributes.forEach((item) => {
      if (!traitList[item.trait_type]) traitList[item.trait_type] = {}
      if (!traitList[item.trait_type][item.name]) traitList[item.trait_type][item.name] = 0

      traitList[item.trait_type][item.name]++;
    })
  })

  for (const traitType in traitList) {
    csv += `${traitType}${separator}Count${separator}id${separator}Excluded traits${separator}Images list id\n`

    for (const traitTypeKey in traitList[traitType]) {
      let traitId = getTraitByName(traitTypeKey, traitType);
      let imagesIndexes = getTraitImagesIndexes(traitType, traitTypeKey);

      csv += `${traitTypeKey}${separator}${traitList[traitType][traitTypeKey]}${separator}${traitId}${separator}${getExcludes(traitId)}${separator}${imagesIndexes}\n`;
    }
    csv += '\n';
  }

  fs.writeFileSync("./csv/rarity.csv", csv)
//fs.writeFileSync("./rarity.json", JSON.stringify(traitList, null, ' '))
}

module.exports = {
  generateRarity
}
