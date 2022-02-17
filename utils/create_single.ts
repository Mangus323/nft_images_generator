import { IDnaElement, IImage, ILayer, IMetadata } from './types';
import { baseUri, description, layerConfigurations, layerDefaultName, namePrefix } from '../src/config';
import { drawElement, loadLayerImg, saveSingleImage } from './image';
import { layersSetup } from './fs';
import { getTraitName } from '../src/names_list';
import { dnaToHash } from '../src/dna';

const fs = require('fs');
const basePath = process.cwd();
const buildDir = `${basePath}/build`;
const DNA_DELIMITER = '-';
let metadataList: IMetadata[] = [];
let attributesList: any[] = [];

(() => {
  createSingle();
})();

function createSingleDna(dnaArray: IDnaElement[]) {
  let dna: string[] = [];
  dnaArray.forEach((layer) => {
    dna.push(layer.selectedElement.filename);
  });
  return dna.join(DNA_DELIMITER);
}

const addAttributes = (_element: IImage | null) => {
  if (!_element) return;
  let selectedElement = _element.layer.selectedElement;
  if (!selectedElement) return;
  if (_element.layer.name.includes('Base')) {
    return;
  }

  let name = '';
  if (selectedElement.name === 'empty') {
    layerDefaultName.forEach((value, key) => {
      if (_element.layer.name.includes(key)) {
        name = value;
      }
    });
    if (!name) {
      let defaultName = layerDefaultName.get('default');
      name = defaultName ? defaultName : 'N/A';
    }
  } else {
    name = getTraitName(selectedElement.name);
  }

  if (_element.layer.name.includes('Background')) {
    const layerName = _element.layer.name.slice(0, 10);
    const value = +(_element.layer.name.slice(10));
    attributesList.push({
      trait_type: layerName,
      value: value,
      weight: selectedElement.weight,
      name: name,
    });
    return;
  }

  attributesList.push({
    trait_type: _element.layer.name,
    value: selectedElement.id,
    weight: selectedElement.weight,
    name: name,
  });
};

const addMetadata = (dna: string, edition: number) => {
  let dateTime = Date.now();
  let tempMetadata = {
    name: `${namePrefix} #${edition}`,
    description: description,
    image: `${baseUri}/${edition}.png`,
    dna: dnaToHash(dna),
    edition: edition,
    date: dateTime,
    attributes: attributesList,
    compiler: 'NFT images generator',
  };
  metadataList.push(tempMetadata);
};

const saveSingleMetaData = (number: number) => {
  let metadata = metadataList.find((meta) => meta.edition === number);
  fs.writeFileSync(
    `${buildDir}/single/${number}.json`,
    JSON.stringify(metadata, null, 2),
  );
};

async function createSingle() {
  // change this
  const number = 1;
  const baseList = 'b1, base, ';
  const list = baseList + 't8';

  let layersList: ILayer[] = [];
  layersSetup(layerConfigurations[Number(baseList[1]) - 1].layersOrder).forEach((layer) => {
    let newLayer = JSON.parse(JSON.stringify(layer));
    newLayer.elements = [];
    for (let i = 0; i < layer.elements.length; i++) {
      let newLayerElement = JSON.parse(JSON.stringify(layer.elements[i]));
      newLayer.elements.push(newLayerElement);
    }
    layersList.push(newLayer);
  });

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
  // empty elements
  layersList.forEach((layer) => {
    let isLayer = false;
    results.forEach((dna) => {
      if (layer.name === dna.name) {
        isLayer = true;
      }
    });
    if (!isLayer) {
      results.push({
        name: layer.name,
        selectedElement: layer.elements[0],
        blend: null,
        opacity: 1,
      });
    }
  });

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
      addAttributes(renderObject);
    });
    saveSingleImage(number);
    addMetadata(dna, number);
    saveSingleMetaData(number);
    console.log(
      `Created single image with number ${number} and DNA: ${dnaToHash(dna)}`,
    );
  });
}
