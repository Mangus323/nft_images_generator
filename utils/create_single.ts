import { IDnaElement, IImage, ILayer } from './types';
import { baseUri, description, extraMetadata, layerConfigurations, namePrefix } from '../src/config';
import sha1 from 'sha1';
import { drawElement, loadLayerImg, saveSingleImage } from './image';
import { layersSetup } from './fs';
import { getTraitName } from '../src/names_list';

const fs = require('fs');
const basePath = process.cwd();
const buildDir = `${basePath}/build`;
const DNA_DELIMITER = '-';
let metadataList: any[] = [];
let attributesList: any[] = [];

(() => {
  createSingle();
})();

function createSingleDna(dnaArray: any[]) {
  let dna: any[] = [];
  dnaArray.forEach((layer) => {
    dna.push(
      `${layer.selectedElement.id}:${layer.selectedElement.filename}`,
    );
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

  let name = getTraitName(selectedElement.name);
  if (selectedElement.name === 'empty' && !(_element.layer.name.includes('Mouth'))) {
    name = 'N/A';
  }
  if (selectedElement.name === 'empty' && (_element.layer.name.includes('Eyes'))) {
    name = 'Black';
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

const addMetadata = (_dna: string, _edition: number) => {
  let dateTime = Date.now();
  let tempMetadata = {
    name: `${namePrefix} #${_edition}`,
    description: description,
    image: `${baseUri}/${_edition}.png`,
    dna: sha1(_dna),
    edition: _edition,
    date: dateTime,
    ...extraMetadata,
    attributes: attributesList,
    compiler: 'HashLips Art Engine',
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
      addAttributes(renderObject);
    });
    saveSingleImage(number);
    addMetadata(dna, number);
    saveSingleMetaData(number);
    console.log(
      `Created single image with number ${number} and DNA: ${sha1(
        dna,
      )}`,
    );
  });
}
