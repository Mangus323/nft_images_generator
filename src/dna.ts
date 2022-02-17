import sha1 from 'sha1';
import { ILayer, ILayerElement, IRemove } from '../utils/types';
import { getExcludes } from './exclude_list';
import shuffle from '../utils/shuffle';
import { getHashes } from '../utils/generate_hash';
import { optionalLayers } from './config';

const DNA_DELIMITER = '-';

export const cleanDna = (_str: string) => {
  return Number(_str.split(':').shift());
};

export const generateDnaList = (): Set<string> => {
  let dnaList = new Set<string>();
  dnaList.add('');

  let hashTable = getHashes();

  hashTable.forEach((hash) => {
    dnaList.add(hash);
  });

  return dnaList;
};

export const isDnaUnique = (dnaList: Set<string> = new Set(), dna = ''): boolean => {
  if (!dna) return false;

  return !dnaList.has(dnaToHash(dna));
};

export const dnaToHash = (dna: string) => {
  let array = dna.split(DNA_DELIMITER)
    .map((part) => {
      return part.split(':')[1];
    });
  array.shift();
  return sha1(
    array.sort()
      .join(DNA_DELIMITER),
  );

};

const getTraitsIds = (count: number) => {
  const traitsIds = [...optionalLayers];
  traitsIds.pop();
  const returnedTraitsIds = [2, 3];

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

export const createDna = (baseLayers: ILayer[], layersList: ILayer[], max: number, min: number, failCount: number):
  {
    dna: string,
    removeObject: IRemove[],
  } => {
  let removeObject: IRemove[] = [];
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

  const randSort = [2, 3, ...shuffle(optionalLayers)];

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
          if (!(failCount > 1000 && failCount % 1000 === index && layerIndex === 0)) {
            excludedLayer.push(element);
            excludedLayerIndexes.push(layerIndex);
          }
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

        removeObject.push({
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
    return {
      dna: '',
      removeObject,
    };
  }
  if (dnaArray.length - 2 < min) {
    return {
      dna: '',
      removeObject,
    };
  }

  return {
    dna: randNum.join(DNA_DELIMITER),
    removeObject,
  };
};
