import { IJSONImage } from './types';
import { names_list } from '../src/names_list';

const fs = require('fs');
const basePath = process.cwd();
const buildDir = `${basePath}/build`;
const separator = ';';
let rawData: IJSONImage[] = [];

let namesList = JSON.parse(JSON.stringify(names_list));

const getTraitByName = (name: string, trait_type: string) => {
  for (const namesListKey in namesList) {
    if (namesList[namesListKey] === name)
      if (!(trait_type !== 'Background' && namesListKey[0] === 'b')) {
        return namesListKey;
      }
  }
};

const getRawData = () => {
  for (let i = 1; i <= 10000; i++) {
    try {
      rawData.push(JSON.parse(fs.readFileSync(`${buildDir}/json/${i}.json`)));
    } catch (e) {
      return;
    }
  }
};

export const generateUsedTraits = () => {
  getRawData();

  let csv = `Monkey #${separator}Used traits${separator}\n`;

  let rows = rawData.map((row, count) => {
    let returnString = `${count + 1}${separator}`;

    row.attributes.forEach((item) => {
      let traitId = getTraitByName(item.name, item.trait_type);

      if (traitId) {
        returnString += `${traitId}, `;
      }
    });
    return returnString;
  }).join('\n');
  csv += rows;

  fs.writeFileSync('./build/csv/used_traits.csv', csv);
};

