import { IJSONImage } from './types';
import { names_list } from '../src/names_list';
import { getExcludes } from '../src/exclude_list';

let namesList = JSON.parse(JSON.stringify(names_list));

export const getTraitByName = (name: string, trait_type: string) => {
  for (const namesListKey in namesList) {
    if (namesList[namesListKey] === name)
      if (!(trait_type !== 'Background' && namesListKey[0] === 'b')) {
        return namesListKey;
      }
  }
};

const basePath = process.cwd();
const fs = require('fs');
const separator = ';';
let rawData: IJSONImage[] = [];

const getTraitImagesIndexes = (trait_type: string, name: string) => {
  let returnValue = '';
  rawData.forEach((row, index) => {
    row.attributes.forEach((item) => {
      if (item.trait_type === trait_type && item.name === name) {
        returnValue += `${index + 1},`;
      }
    });
  });
  return returnValue;
};

const getRawData = () => {
  for (let i = 1; i <= 10000; i++) {
    try {
      rawData.push(JSON.parse(fs.readFileSync(`${basePath}/build/json/${i}.json`)));
    } catch (e) {
      return;
    }
  }
};

export const generateRarity = () => {
  getRawData();

  let traitList: any = {};
  let csv = '';

  rawData.forEach((row) => {
    row.attributes.forEach((item) => {
      if (!traitList[item.trait_type]) traitList[item.trait_type] = {};
      if (!traitList[item.trait_type][item.name]) traitList[item.trait_type][item.name] = 0;

      traitList[item.trait_type][item.name]++;
    });
  });

  for (const traitType in traitList) {
    csv += `${traitType}${separator}Count${separator}id${separator}Excluded traits${separator}Images list id\n`;

    for (const traitTypeKey in traitList[traitType]) {
      let traitId = getTraitByName(traitTypeKey, traitType);
      if (traitId) {
        namesList[traitId] = null;
      }

      let imagesIndexes = getTraitImagesIndexes(traitType, traitTypeKey);

      csv += `${traitTypeKey}${separator}${traitList[traitType][traitTypeKey]}${separator}${traitId}${separator}${getExcludes(traitId)}${separator}${imagesIndexes}\n`;
    }
    csv += '\n';
  }

  fs.writeFileSync('./build/csv/rarity.csv', csv);
//fs.writeFileSync("./rarity.json", JSON.stringify(traitList, null, ' '))
};
