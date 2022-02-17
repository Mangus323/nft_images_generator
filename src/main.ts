import { IAttribute, IDnaElement, IImage, ILayer, ILayerElement, IMetadata } from '../utils/types';
import {
  baseUri,
  description,
  uniqueDnaTorrance,
  layerConfigurations,
  namePrefix, layerDefaultName,
} from './config';
import { getTraitName } from './names_list';
import shuffle from '../utils/shuffle';
import { drawElement, loadLayerImg, saveImage } from '../utils/image';
import { layersSetup, saveMetaDataSingleFile, writeMetaData } from '../utils/fs';
import { cleanDna, createDna, dnaToHash, generateDnaList, isDnaUnique } from './dna';

const DNA_DELIMITER = '-';

const addMetadata = (dna: string, edition: number, metadataList: IMetadata[], attributesList: IAttribute[]) => {
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

const addAttributes = (_element: IImage | null, attributesList: IAttribute[]) => {
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

const constructLayerToDna = (_dna = '', baseLayers: ILayer[], layersList: ILayer[]): Array<IDnaElement> => {
  const dna: IDnaElement[] = [];
  baseLayers.forEach((layer, index) => {
    if (index > 1) return;
    const id = cleanDna(_dna.split(DNA_DELIMITER)[index]);
    let selectedElement = layer.elements.find(
      (e) => e.id === id,
    );
    if (selectedElement) {
      dna.push({
        name: layer.name,
        blend: layer.blend,
        opacity: layer.opacity,
        selectedElement: selectedElement,
      });
    } else {
      console.log('ERROR NOT FOUND SELECTED ELEMENT: ' + _dna);
    }
  });
  layersList.forEach((layer, index) => {
    if (index < 2) return;
    const id = cleanDna(_dna.split(DNA_DELIMITER)[index]);
    if (id === 0 && index > 2) {
      dna.push({
        name: layer.name,
        blend: layer.blend,
        opacity: layer.opacity,
        selectedElement: baseLayers[index].elements[0],
      });
      return;
    }
    let selectedElement = JSON.parse(JSON.stringify(layer.elements.find(
      (e) => e.id === id,
    )));

    dna.push({
      name: layer.name,
      blend: layer.blend,
      opacity: layer.opacity,
      selectedElement: selectedElement,
    });
  });
  return dna;
};


// const changeOrder = (results: Array<IDnaElement>) => {
//
//   for (let i = 0; i < results.length; i++) {
//     let name = results[i]?.selectedElement.name;
//     if (name) {
//       // повязки на глаза
//       let eyePatches = ['t84', 't85', 't86', 't89', 't90', 't94', 't98'];
//       if (eyePatches.includes(name)) {
//         results = changeOrderSingleTrait(results, i, 'Eyes');
//       }
//
//       if (name === 't59') {
//         results = changeOrderSingleTrait(results, i, 'Head');
//       }
//
//       // ear wear
//       let earWear = ['t100', 't101', 't102', 't104', 't105'];
//
//       if (earWear.includes(name)) {
//         results = changeOrderSingleTrait(results, i, 'Head');
//       }
//     }
//
//   }
//
//   return results;
// };

const changeOrderSingleTrait = (results: Array<IDnaElement>, layerIndex: number, afterLayerName: string, afterItems: Array<string> = []) => {

  let afterLayerIndex = 0;

  let item = results.splice(layerIndex, 1);

  for (let i = 0; i < results.length; i++) {
    if (results[i].name === afterLayerName) {

      if (afterItems.length === 0 || afterItems.includes(results[i].selectedElement.name)) {
        afterLayerIndex = i;
        break;
      }
    }
  }

  results.splice(afterLayerIndex + 1, 0, ...item);
  return results;
};

//monkey
const changeOrder = (results: Array<IDnaElement | null>) => {
  let earsToRight = false;
  let earsToEnd = false;
  // change layer order with t104
  if (results[7]?.selectedElement?.name === 't104') {
    const earsToEndHeads = [
      't120', 't121', 't122', 't125', 't126', 't127', 't128', 't129', 't133', 't134', 't135', 't136', 't138',
      't140', 't141', 't142', 't143', 't144', 't145', 't146', 't147', 't148', 't151', 't152', 't153', 't154'];
    const isEarsToEnd = earsToEndHeads.find((item) => {
      return item === results[10]?.selectedElement?.name;
    });

    const cloneEars = JSON.parse(JSON.stringify(results[7]));
    console.log('Changing order t104!');
    if (isEarsToEnd) {
      results[7] = null;
      results.push(cloneEars);
      earsToEnd = true;
    } else {
      results[7] = results[8];
      results[8] = cloneEars;
      earsToRight = true;
    }
  }

  // change layer order with t103
  if (results[7]) {
    if (results[7].selectedElement?.name === 't103') {
      console.log('Changing order t103!');
      const cloneEars = JSON.parse(JSON.stringify(results[7]));
      results[7] = results[6];
      results[6] = cloneEars;
    }
  }

  // повязки на глаза
  const eyeWear = ['t86', 't89', 't90', 't94'];
  if (eyeWear.find((item) => {
    return item === results[8]?.selectedElement?.name;
  })) {
    const cloneFaceMask = JSON.parse(JSON.stringify(results[6]));
    if (earsToRight) {
      results[6] = results[7];
      results[7] = cloneFaceMask;
    }
    if (earsToEnd) {
      results[6] = results[8];
      results[8] = cloneFaceMask;
    } else {
      results[6] = results[8];
      results[8] = results[7];
      results[7] = cloneFaceMask;
    }
  }

  return results;
};

const getAbstractedIndexes = (): number[] => {
  let abstractedIndexes: number[] = [];
  let totalCount = 1;
  layerConfigurations.forEach((item) => {
    totalCount += item.count;
  });
  for (let i = 1; i <= totalCount; i++) {
    abstractedIndexes.push(i);
  }
  return abstractedIndexes;
};

export const startCreating = async () => {
  let metadataList: IMetadata[] = [];
  let attributesList: IAttribute[] = [];

  let layerConfigIndex = 0;
  let editionCount = 1;
  let failedUniqueDnaCount = 0;
  let abstractedIndexes = getAbstractedIndexes();

  // new unique layers
  let layersList: ILayer[] = [];
  layersSetup(layerConfigurations[0].layersOrder)
    .forEach((layer, index: number) => {
      if (index < 2) {
        layersList.push(layer);
        return;
      }
      let newLayer: ILayer = JSON.parse(JSON.stringify(layer));

      let sortedGroup: ILayerElement[] = [];
      newLayer.elements = [];

      let stepPercentage = Math.floor(layer.elements.length / 3);
      if (stepPercentage > 10) stepPercentage = 10;
      const steps = [stepPercentage, stepPercentage, layer.elements.length - (stepPercentage) * 2, 0];
      let step = steps[0];
      let stepIndex = 0;

      layer.elements = layer.elements.sort((a, b) => {
        return a.weight - b.weight;
      });
      const lastEmpty = layer.elements[layer.elements.length - 1].name === 'empty';

      for (let i = 0; i < layer.elements.length; i++) {
        let newLayerElement: ILayerElement = JSON.parse(JSON.stringify(layer.elements[i]));
        if (newLayerElement.name === 'empty') {
          continue;
        }

        for (let j = 0; j < newLayerElement.weight; j++) {
          sortedGroup.push({
            ...newLayerElement,
          });
        }

        if (lastEmpty && i === layer.elements.length - 2) {
          newLayer.elements.push(...shuffle(sortedGroup));
          sortedGroup = [];
          stepIndex++;
          step += steps[stepIndex];
        }

        if ((i % step === 0 && i !== 0) || i === layer.elements.length - 1) {
          newLayer.elements.push(...shuffle(sortedGroup));
          sortedGroup = [];
          stepIndex++;
          step += steps[stepIndex];
        }
      }
      layersList.push(newLayer);
    });

  let dnaHashList = generateDnaList();
  while (layerConfigIndex < layerConfigurations.length) {
    let baseLayers = layersSetup(
      layerConfigurations[layerConfigIndex].layersOrder,
    );

    let currentLayerItemsCount = 1;
    let failCreateDnaCount = 0;
    while (currentLayerItemsCount <= layerConfigurations[layerConfigIndex].count) {
      let { dna: newDna, removeObject } = createDna(
        baseLayers,
        layersList,
        layerConfigurations[layerConfigIndex].maxTraits,
        layerConfigurations[layerConfigIndex].minTraits,
        failCreateDnaCount,
      );
      let dnaHash = dnaToHash(newDna);
      if (isDnaUnique(dnaHashList, newDna)) {
        failCreateDnaCount = 0;
        let results = constructLayerToDna(newDna, baseLayers, layersList);

        // remove used traits from layer
        removeObject.forEach((item) => {
          layersList[item.index].elements.splice(item.itemIndex, 1);
        });

        let loadedElements: Promise<IImage | null>[] = [];
        // results = changeOrder(results);

        results.forEach((dna) => {
          if (dna) {
            loadedElements.push(loadLayerImg(dna));
          }
        });

        await Promise.all(loadedElements).then((renderObjectArray) => {
          renderObjectArray.forEach((renderObject) => {
            drawElement(renderObject);
            addAttributes(renderObject, attributesList);
          });
          saveImage(abstractedIndexes[0]);
          addMetadata(newDna, abstractedIndexes[0], metadataList, attributesList);
          attributesList = [];
          saveMetaDataSingleFile(abstractedIndexes[0], metadataList);
          console.log(
            `Created edition: ${abstractedIndexes[0]}, with DNA: ${dnaHash}`,
          );
        });

        dnaHashList.add(dnaHash);
        editionCount++;
        abstractedIndexes.shift();
        failCreateDnaCount = 0;
      } else {
        if (newDna === '') {
          if (failCreateDnaCount % 999 === 0 && failCreateDnaCount > 0) {
            console.log('Not enough traits, select next items!');
          }
          failCreateDnaCount++;
        } else {
          console.log('DNA exists!');
          failedUniqueDnaCount++;
        }
        if (failedUniqueDnaCount >= uniqueDnaTorrance) {
          console.log(
            `You need more layers or elements to grow your edition to ${layerConfigurations[layerConfigIndex].count} artworks!`,
          );
          // reshuffle
          let newLayersList: ILayer[] = [];
          layersList.forEach((layer, index) => {
            if (index < 2) {
              newLayersList.push(layer);
              return;
            }
            let newLayer = JSON.parse(JSON.stringify(layer));
            newLayer.elements = [];
            for (let j = 0; j < layer.elements.length; j++) {
              let newLayerElement = JSON.parse(JSON.stringify(layer.elements[j]));
              for (let k = 0; k < newLayerElement.weight; k++) {
                newLayer.elements.push({
                  ...newLayerElement,
                });
              }
            }
            newLayer.elements = shuffle(newLayer.elements);
            newLayersList.push(newLayer);
          });
          layersList = newLayersList;
          failedUniqueDnaCount = 0;
        }
        currentLayerItemsCount--;
      }
      currentLayerItemsCount++;
    }
    layerConfigIndex++;
  }
  writeMetaData(JSON.stringify(metadataList, null, 2));
};
