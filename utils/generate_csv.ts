import { IJSONImage } from './types';

const fs = require('fs');
const basePath = process.cwd();
const buildDir = `${basePath}/build`;
const separator = ';';
const totalCount = 1000;
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

const getScore = (trait_type: string, name: string, index: number) => {
  let traitCount = 0;
  for (let i = 0; i < rawData.length; i++) {
    for (let j = 0; j < rawData[i].attributes.length; j++) {
      if (rawData[i].attributes[j].trait_type === trait_type && rawData[i].attributes[j].name === name) {
        traitCount++;
      }
    }
  }
  if (trait_type === 'Background') {
    let backgroundModifier = 0;
    switch (name) {
      case 'Gold':
        backgroundModifier = 490;
        break;
      case 'Red':
        backgroundModifier = 475;
        break;
      case 'Blue':
        backgroundModifier = 425;
        break;
      case 'Pink':
        backgroundModifier = 400;
        break;
      case 'Purple':
        backgroundModifier = 350;
        break;
      case 'Green':
        backgroundModifier = 200;
        break;
      case 'Aqua':
        backgroundModifier = 100;
        break;
      case 'Grey':
        backgroundModifier = 0;
        break;
    }
    backgroundModifier += (1000 - index) / 50;
    return (backgroundModifier + totalCount * (Math.sqrt(200)) / traitCount).toFixed(3);
  }
  return ((totalCount / (traitCount + 3)) / 1.25).toFixed(3);
};

const getTraitsCountScore = (count: number) => {
  let traitsCount = 0;
  for (let i = 0; i < rawData.length; i++) {
    let traitCount = 0;
    rawData[i].attributes.forEach((item, index) => {
      if (index < 3) return;
      if (item.value) {
        traitCount++;
      }
    });
    if (traitCount === count) {
      traitsCount++;
    }
  }
  return (totalCount / traitsCount).toFixed(3);
};

export const generateCSV = (imageName: string) => {
  getRawData();

  let csv = `${imageName} #${separator}No. of traits${separator}Points${separator}`;

  rawData[1].attributes.forEach((item) => {
    csv += `${item.trait_type}${separator}Points${separator}`;
  });
  csv += 'Total Score \n';

  let sumTrait = 0;

  let rows = rawData.map((row, count) => {
    let returnString = `${count + 1}${separator}`;
    let traitCount = 0;
    let totalScore = 0;
    row.attributes.forEach((item, index) => {
      if (index < 3) return;
      if (item.value) {
        traitCount++;
      }
    });

    let traitsCountScore = getTraitsCountScore(traitCount);
    totalScore += +traitsCountScore;
    returnString += `${traitCount}${separator}${traitsCountScore}${separator}`;

    row.attributes.forEach((item) => {
      let score = getScore(item.trait_type, item.name, count);
      totalScore += +score;
      returnString += `${item.name}${separator}${score}${separator}`;
    });
    sumTrait += traitCount;
    returnString += totalScore.toFixed(3);
    return returnString;
  }).join('\n');
  csv += rows;

  console.log('sum traits: ' + sumTrait);
  fs.writeFileSync('./build/csv/list.csv', csv);
};

