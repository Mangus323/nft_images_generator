import { IDnaElement, IImage, ILayer } from './types';
import { layerConfigurations } from '../src/config';
import sha1 from 'sha1';
import { drawElement, loadLayerImg, saveSingleImage } from './image';

const fs = require('fs');
const basePath = process.cwd();
const buildDir = `${basePath}/build`;
const DNA_DELIMITER = '-';
let metadataList: any[] = [];

(() => {
  createSingle();
})();

const createSingleDna = (dnaArray: any[]) => {
  let dna: any[] = [];
  dnaArray.forEach((layer) => {
    dna.push(
      `${layer.selectedElement.id}:${layer.selectedElement.filename}`,
    );
  });
  return dna.join(DNA_DELIMITER);
};

const saveSingleMetaData = (number: number) => {
  let metadata = metadataList.find((meta) => meta.edition === number);
  fs.writeFileSync(
    `${buildDir}/single/${number}.json`,
    JSON.stringify(metadata, null, 2),
  );
};

async function createSingle() {
  let number = 8;
  const baseList = 'b1, base, ';
  let layersList: ILayer[] = [];
  // @ts-ignore
  layersSetup(layerConfigurations[`${Number(baseList[1]) - 1}`].layersOrder).forEach((layer) => {
    let newLayer = JSON.parse(JSON.stringify(layer));
    newLayer.elements = [];
    for (let i = 0; i < layer.elements.length; i++) {
      let newLayerElement = JSON.parse(JSON.stringify(layer.elements[i]));
      newLayer.elements.push(newLayerElement);
    }
    layersList.push(newLayer);
  });

  const list = baseList + 't163, t80, t117, t97, t152, t26';

  const array = list.split(', ');
  let results: IDnaElement[] = [];

  while (array.length) {
    layersList.forEach((layer) => {
      layer.elements.forEach((trait) => {
        if (array[0] === trait.name) {
          results.push({
            name: layer.name,
            selectedElement: trait,
            blend: null,
            opacity: 1,
          });
          array.shift();
        }
      });
    });
  }
  let dna = createSingleDna(results);
  let loadedElements: Promise<IImage | null>[] = [];
  results.forEach((dna) => {
    if (dna) {
      loadedElements.push(loadLayerImg(dna));
    }
  });

  await Promise.all(loadedElements).then((renderObjectArray) => {
    renderObjectArray.forEach((renderObject) => {
      drawElement(renderObject);
    });
    saveSingleImage(number);
    saveSingleMetaData(number);
    console.log(
      `Created single image with number ${number} and DNA: ${sha1(
        dna,
      )}`,
    );
  });
}
