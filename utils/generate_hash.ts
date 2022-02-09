import { IJSONImage } from './types';

const fs = require('fs');
const basePath = process.cwd();
const buildDir = `${basePath}/build`;
let rawData: IJSONImage[] = [];

const getRawData = () => {
  for (let i = 1; i <= 10000; i++) {
    try {
      rawData.push(JSON.parse(fs.readFileSync(`${buildDir}/json/${i}.json`)));
    } catch (e) {
      return;
    }
  }
};

export const generateHash = () => {
  getRawData();

  let csv = ``;

  let rows = rawData.map((row) => {
    return `${row.dna}`;
  }).join('\n');
  csv += rows;

  fs.writeFileSync('./build/csv/hash.csv', csv);
};

