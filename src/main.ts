import { IDnaElement, IImage, ILayer, ILayerElement, IRemove } from '../utils/types';
import {
  baseUri,
  description,
  uniqueDnaTorrance,
  layerConfigurations,
  extraMetadata,
  namePrefix,
} from './config';
import { getExcludes } from './exclude_list';
import { getTraitName } from './names_list';
import shuffle from '../utils/shuffle';

import sha1 from 'sha1';
import { drawElement, loadLayerImg, saveImage } from '../utils/image';
import { layersSetup, saveMetaDataSingleFile, writeMetaData } from '../utils/fs';

const DNA_DELIMITER = '-';

let metadataList: any[] = [];
let attributesList: any[] = [];
let remove: IRemove[] = [];
const emptyElements: any[] = [];


const cleanDna = (_str: string) => {
  const withoutOptions = removeQueryStrings(_str);
  return Number(withoutOptions.split(':').shift());
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
  attributesList = [];
};

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

const constructLayerToDna = (_dna = '', baseLayers: ILayer[], layersList: ILayer[]): Array<IDnaElement> => {
  const dna: IDnaElement[] = [];
  baseLayers.forEach((layer, index) => {
    if (index > 1) return;
    let selectedElement = layer.elements.find(
      (e) => e.id === cleanDna(_dna.split(DNA_DELIMITER)[index]),
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

const filterDNAOptions = (_dna: string) => {
  const dnaItems = _dna.split(DNA_DELIMITER);
  const filteredDNA = dnaItems.filter((element) => {
    const query = /(\?.*$)/;
    const querystring = query.exec(element);
    if (!querystring) {
      return true;
    }
    const options = querystring[1].split('&').reduce((r, setting) => {
      const keyPairs = setting.split('=');
      return { ...r, [keyPairs[0]]: keyPairs[1] };
    }, []);

    // @ts-ignore
    return options.bypassDNA;
  });

  return filteredDNA.join(DNA_DELIMITER);
};

const removeQueryStrings = (_dna: string) => {
  const query = /(\?.*$)/;
  return _dna.replace(query, '');
};

const isDnaUnique = (dnaList: Set<string> = new Set(), dna = ''): boolean => {
  const _filteredDNA = filterDNAOptions(dna);
  return !dnaList.has(_filteredDNA);
};

const createDna = (baseLayers: ILayer[], layersList: ILayer[], max: number, min: number, failCount: number): string => {
  remove = [];
  let randNum: string[] = [];
  let dnaArray: ILayerElement[] = [];
  let blockedTraits: string[] = [];
  let traitsIds = getTraitsIds(max);
  baseLayers.forEach((layer, index) => {
      if (index > 1) return;
      blockedTraits.push(...getExcludes(layer.elements[0].name));

      return randNum.push(`${layer.elements[0].id}:${layer.elements[0].filename}`,
      );
    },
  );

  const randSort = [2, 3, ...shuffle([4, 5, 6, 7, 8, 9, 10])];

  randSort.forEach((index) => {
    let layer = layersList[index];
    let excludedLayer: ILayerElement[] = [];
    let excludedLayerIndexes: number[] = [];

    // delegate layer elements
    layer.elements.forEach((element, layerIndex: number) => {
        if (!traitsIds.includes(index) && index > 2) return;
        if (!blockedTraits.includes(element.name)) {
          const blockedByTrait = getExcludes(element.name);
          for (let i = 0; i < dnaArray.length; i++) {
            if (blockedByTrait.includes(dnaArray[i].name)) {
              return;
            }
          }
          excludedLayer.push(element);
          excludedLayerIndexes.push(layerIndex);
        }
      },
    );
    if (traitsIds.includes(index) && excludedLayer.length === 0) {
      traitsIds = changeTraitId(traitsIds, index);
    }
    // set layer element
    for (let i = 0; i < excludedLayer.length; i++) {
      if (!blockedTraits.includes(excludedLayer[i].name)) {
        const layersListIndex = excludedLayerIndexes[i];
        blockedTraits.push(...getExcludes(excludedLayer[i].name));

        remove.push({
          index: index,
          itemIndex: layersListIndex,
        });

        dnaArray.push(excludedLayer[i]);
        randNum[index] = `${excludedLayer[i].id}:${excludedLayer[i].filename}`;
        return;
      }
    }

    // add empty element
    randNum[index] = `${baseLayers[index].elements[0].id}:${baseLayers[index].elements[0].filename}`;
  });
  if (!dnaArray[1].path.includes('Body')) {
    return '';
  }
  // проверка на минимальное ( - 2 это базовые)
  if (dnaArray.length - 2 < min) {
    return '';
  }

  return randNum.join(DNA_DELIMITER);
};


const getTraitsIds = (count: number) => {
  let traitsIds = [4, 5, 6, 7, 8, 9];
  let returnedTraitsIds = [2, 3];
  for (let i = 0; i < count; i++) {
    const index = Math.floor(Math.random() * (traitsIds.length));
    returnedTraitsIds.push(...traitsIds.splice(index, 1));
  }
  return returnedTraitsIds;
};

const changeTraitId = (traitsIds: number[], index: number): number[] => {
  if (traitsIds.includes(index)) {
    return changeTraitId(traitsIds, index + 1);
  } else {
    return [...traitsIds, index];
  }
};


const changeOrder = (results: Array<IDnaElement>) => {

  for (let i = 0; i < results.length; i++) {
    let name = results[i]?.selectedElement.name;
    if (name) {
      // повязки на глаза
      let eyePatches = ['t84', 't85', 't86', 't89', 't90', 't94', 't98'];
      if (eyePatches.includes(name)) {
        results = changeOrderSingleTrait(results, i, 'Eyes');
      }

      if (name === 't59') {
        results = changeOrderSingleTrait(results, i, 'Head');
      }

      // ear wear
      let earWear = ['t100', 't101', 't102', 't104', 't105'];

      if (earWear.includes(name)) {
        results = changeOrderSingleTrait(results, i, 'Head');
      }
    }

  }

  return results;
};

const changeOrderSingleTrait = (results: Array<IDnaElement>, layerIndex: number, afterLayerName: string, afterItems: Array<string> = []) => {

  let afterLayerIndex = 0;

  if (afterLayerName === 'Eyes') {
    console.log('sss');
  }

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
// const changeOrder = (results: Array<IDnaElement | null>) => {
//   let earsToRight = false;
//   let earsToEnd = false;
//   // change layer order with t104
//   if (results[7]?.selectedElement?.name === 't104') {
//     const earsToEndHeads = [
//       't120', 't121', 't122', 't125', 't126', 't127', 't128', 't129', 't133', 't134', 't135', 't136', 't138',
//       't140', 't141', 't142', 't143', 't144', 't145', 't146', 't147', 't148', 't151', 't152', 't153', 't154'];
//     const isEarsToEnd = earsToEndHeads.find((item) => {
//       return item === results[10]?.selectedElement?.name;
//     });
//
//     const cloneEars = JSON.parse(JSON.stringify(results[7]));
//     console.log('Changing order t104!');
//     if (isEarsToEnd) {
//       results[7] = null;
//       results.push(cloneEars);
//       earsToEnd = true;
//     } else {
//       results[7] = results[8];
//       results[8] = cloneEars;
//       earsToRight = true;
//     }
//   }
//
//   // change layer order with t103
//   if (results[7]) {
//     if (results[7].selectedElement?.name === 't103') {
//       console.log('Changing order t103!');
//       const cloneEars = JSON.parse(JSON.stringify(results[7]));
//       results[7] = results[6];
//       results[6] = cloneEars;
//     }
//   }
//
//   // повязки на глаза
//   const eyeWear = ['t86', 't89', 't90', 't94'];
//   if (eyeWear.find((item) => {
//     return item === results[8]?.selectedElement?.name;
//   })) {
//     const cloneFaceMask = JSON.parse(JSON.stringify(results[6]));
//     if (earsToRight) {
//       results[6] = results[7];
//       results[7] = cloneFaceMask;
//     }
//     if (earsToEnd) {
//       results[6] = results[8];
//       results[8] = cloneFaceMask;
//     } else {
//       results[6] = results[8];
//       results[8] = results[7];
//       results[7] = cloneFaceMask;
//     }
//   }
//
//   return results;
// };

export const startCreating = async () => {
  let layerConfigIndex = 0;
  // количество созданных
  let editionCount = 1;
  let failedUniqueDnaCount = 0;
  let abstractedIndexes: number[] = [];
  let totalCount = 1;
  layerConfigurations.forEach((item) => {
    totalCount += item.count;
  });
  for (let i = 1; i <= totalCount; i++) {
    abstractedIndexes.push(i);
  }
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

      layer.elements = layer.elements.sort((a: any, b: any) => {
        return a.weight - b.weight;
      });
      const lastEmpty = layer.elements[layer.elements.length - 1].name === 'empty';

      for (let i = 0; i < layer.elements.length; i++) {
        let newLayerElement: ILayerElement = JSON.parse(JSON.stringify(layer.elements[i]));
        if (newLayerElement.name === 'empty') {
          emptyElements.push(newLayerElement);
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

  let dnaList = new Set<string>();
  dnaList.add('');

  while (layerConfigIndex < layerConfigurations.length) {
    let baseLayers = layersSetup(
      layerConfigurations[layerConfigIndex].layersOrder,
    );

    let currentLayerItemsCount = 1;
    let failCreateDnaCount = 0;
    while (currentLayerItemsCount <= layerConfigurations[layerConfigIndex].count) {
      let newDna = createDna(
        baseLayers,
        layersList,
        layerConfigurations[layerConfigIndex].maxTraits,
        layerConfigurations[layerConfigIndex].minTraits,
        failCreateDnaCount,
      );
      if (isDnaUnique(dnaList, newDna)) {
        failCreateDnaCount = 0;
        let results = constructLayerToDna(newDna, baseLayers, layersList);

        // remove used traits from layer
        remove.forEach((item) => {
          layersList[item.index].elements.splice(item.itemIndex, 1);
        });
        remove = [];

        let loadedElements: Promise<IImage | null>[] = [];
        results = changeOrder(results);

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
          saveImage(abstractedIndexes[0]);
          addMetadata(newDna, abstractedIndexes[0]);
          saveMetaDataSingleFile(abstractedIndexes[0], metadataList);
          console.log(
            `Created edition: ${abstractedIndexes[0]}, with DNA: ${sha1(
              newDna,
            )}`,
          );
        });

        dnaList.add(filterDNAOptions(newDna));
        editionCount++;
        abstractedIndexes.shift();
      } else {
        if (newDna === '') {
          console.log('Not enough traits, rebuild!');
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
