import { ILayer, ILayerConfigurationItem, ILayerElement } from './types';
import { rarityDelimiter } from '../src/config';
import { getWeight } from '../src/weight_list';

const fs = require('fs');
const basePath = process.cwd();
const buildDir = `${basePath}/build`;
const layersDir = `${basePath}/layers`;

//устаревший метод
const getRarityWeight = (_str: string) => {
  let nameWithoutExtension = _str.slice(0, -4);
  let nameWithoutWeight = Number(nameWithoutExtension.split(rarityDelimiter).pop());
  if (isNaN(nameWithoutWeight)) {
    nameWithoutWeight = 1;
  }
  return nameWithoutWeight;
};

const cleanName = (_str: string): string => {
  let nameWithoutExtension = _str.slice(0, -4);

  let stroke = nameWithoutExtension.split(rarityDelimiter).shift();
  if (stroke) {
    return stroke;
  }
  console.log('ERROR NOT FOUND CLEAN NAME: ' + stroke);
  return '';
};

export const buildSetup = () => {
  if (fs.existsSync(buildDir)) {
    fs.rmdirSync(buildDir, { recursive: true });
  }
  fs.mkdirSync(buildDir);
  fs.mkdirSync(`${buildDir}/json`);
  fs.mkdirSync(`${buildDir}/images`);
  fs.mkdirSync(`${buildDir}/csv`);
};

export const saveMetaDataSingleFile = (_editionCount: number, metadataList: any[]) => {
  let metadata = metadataList.find((meta) => meta.edition === _editionCount);
  fs.writeFileSync(
    `${buildDir}/json/${_editionCount}.json`,
    JSON.stringify(metadata, null, 2),
  );
};

export const writeMetaData = (_data: any) => {
  fs.writeFileSync(`${buildDir}/json/_metadata.json`, _data);
};

export const getElements = (name: string): ILayerElement[] => {
  let path = `${layersDir}/${name}/`;
  return fs
    .readdirSync(path)
    .filter((item: string) => !/(^|\/)\.[^\/.]/g.test(item))
    .map((i: string, index: number) => {
      if (i.includes('-')) {
        throw new Error(`layer name can not contain dashes, please fix: ${i}`);
      }
      return {
        id: index,
        name: cleanName(i),
        filename: i,
        path: `${path}${i}`,
        weight: getWeight(cleanName(i)),
      };
    });
};

export const layersSetup = (layersOrder: ILayerConfigurationItem['layersOrder']): ILayer[] => {
  return layersOrder.map((layerObj, index: number) => {
    return {
      id: index,
      elements: getElements(layerObj.name),
      name: layerObj.name,
      blend: 'source-over',
      opacity: 1,
      bypassDNA: false,
    };
  });
};
