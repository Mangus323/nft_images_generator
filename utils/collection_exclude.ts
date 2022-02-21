import { ICollectionItem, IDnaElement } from './types';
import fs from 'fs';

const basePath = process.cwd();
const rawData: ICollectionItem[] = [];

const getRawData = (path: string, collectionName: string): ICollectionItem[] => {
  let rawData: ICollectionItem[] = [];
  for (let i = 1; i <= 10000; i++) {
    try {
      rawData.push({
        collectionName: collectionName,
        ...JSON.parse((fs.readFileSync(`${path}/${i}.json`)).toString()),
      });
    } catch (e) {
      return rawData;
    }
  }
  return rawData;
};

const getCollections = () => {
  const subDirectories = fs.readdirSync(`${basePath}/collections`);
  subDirectories.forEach((directory) => {
    const path = `${basePath}/collections/${directory}`;
    rawData.push(...getRawData(path, directory));
  });
};

getCollections();

export const containInCollection = (results: IDnaElement[]): boolean => {
  const cloneResults: Array<IDnaElement | null> = JSON.parse(JSON.stringify(results));
  cloneResults.map((dna) => {
    if (dna?.selectedElement.weight === 0) return null;
    return dna;
  });

  let matchedCollectionName = '';

  rawData.forEach((item) => {
    if (!matchedCollectionName) {
      let isMatch = true;
      item.attributes.forEach((attribute) => {
        if (attribute.weight !== 0) {
          let containAttribute = false;
          cloneResults.forEach((dna) => {
            if (dna?.selectedElement.name === attribute.name && dna.name === attribute.trait_type) {
              containAttribute = true;
            }
          });
          if (!containAttribute) isMatch = false;
        }
      });
      if (isMatch) {
        matchedCollectionName = item.collectionName;
      }
    }
  });
  if (matchedCollectionName) {
    console.log('Dna is match to another item in collection! Collection Name: ' + matchedCollectionName);
    return false;
  }
  return true;
};



