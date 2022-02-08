import { IDnaElement, IImage, ILayer, ILayerConfigurationItem, ILayerElement, IRemove } from '../utils/types';

const basePath = process.cwd();
const fs = require('fs');
const sha1 = require(`${basePath}/node_modules/sha1`);
const { createCanvas, loadImage } = require(`${basePath}/node_modules/canvas`);
const buildDir = `${basePath}/build`;
const layersDir = `${basePath}/layers`;
import {
  format,
  baseUri,
  description,
  background,
  uniqueDnaTorrance,
  layerConfigurations,
  rarityDelimiter,
  extraMetadata,
  namePrefix,
} from './config';
import { getExcludes } from './exclude_list';
import { getTraitName } from './names_list';
import shuffle from '../utils/shuffle';
import { Image } from 'canvas';

const canvas = createCanvas(format.width, format.height);
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = format.smoothing;

let metadataList: any[] = [];
let attributesList: any[] = [];
const DNA_DELIMITER = '-';
let remove: IRemove[] = [];
const emptyElements: any[] = [];

const buildSetup = () => {
  if (fs.existsSync(buildDir)) {
    fs.rmdirSync(buildDir, { recursive: true });
  }
  fs.mkdirSync(buildDir);
  fs.mkdirSync(`${buildDir}/json`);
  fs.mkdirSync(`${buildDir}/images`);
  fs.mkdirSync(`${buildDir}/csv`);
};

const getRarityWeight = (_str: string) => {
  let nameWithoutExtension = _str.slice(0, -4);
  let nameWithoutWeight = Number(nameWithoutExtension.split(rarityDelimiter).pop());
  if (isNaN(nameWithoutWeight)) {
    nameWithoutWeight = 1;
  }
  return nameWithoutWeight;
};

const cleanDna = (_str: string) => {
  const withoutOptions = removeQueryStrings(_str);
  return Number(withoutOptions.split(':').shift());
};

const cleanName = (_str: string) => {
  let nameWithoutExtension = _str.slice(0, -4);
  return nameWithoutExtension.split(rarityDelimiter).shift();
};

const getElements = (path: string): ILayerElement[] => {
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
        weight: getRarityWeight(i),
      };
    });
};

const layersSetup = (layersOrder: ILayerConfigurationItem['layersOrder']): ILayer[] => {
  return layersOrder.map((layerObj, index: number) => {
    return {
      id: index,
      elements: getElements(`${layersDir}/${layerObj.name}/`),
      name: layerObj.name,
      blend: 'source-over',
      opacity: 1,
      bypassDNA: false,
    };
  });
};

const saveImage = (_editionCount: number | string) => {
  fs.writeFileSync(
    `${buildDir}/images/${_editionCount}.png`,
    canvas.toBuffer('image/png'),
  );
};

const saveSingleImage = (number: number | string) => {
  fs.writeFileSync(
    `${buildDir}/single/${number}.png`,
    canvas.toBuffer('image/png'),
  );
};

const genColor = () => {
  let hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, 100%, ${background.brightness})`;
};

const drawBackground = () => {
  ctx.fillStyle = background.static ? background.default : genColor();
  ctx.fillRect(0, 0, format.width, format.height);
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

const addAttributes = (_element: any) => {
  let selectedElement = _element.layer.selectedElement;
  if (_element.layer.name.includes('Base')) {
    return;
  }

  let name = getTraitName(selectedElement.name);
  if (selectedElement.name === 'empty' && !(_element.layer.name.includes('Mouth'))) {
    name = 'N/A';
  }
  if (selectedElement.name === 'empty' && (_element.layer.name.includes('Eyes'))) {
    name = 'Brown';
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

const cache = new Map<string, Image>();

const loadLayerImg = async (dna: IDnaElement): Promise<IImage | null> => {
  try {
    return new Promise(async (resolve) => {
      const path = `${dna.selectedElement?.path}`;
      let cacheItem = cache.get(path);
      if (cacheItem) {
        resolve({ layer: dna, loadedImage: cacheItem });
      } else {
        const image = await loadImage(`${dna.selectedElement?.path}`);
        cache.set(path, image);
        resolve({ layer: dna, loadedImage: image });
      }
    });
  } catch (error) {
    console.error('Error loading image:', error);
    return null;
  }
};

const drawElement = (renderObject: Awaited<IImage | null>) => {
  if (renderObject) {
    ctx.globalAlpha = renderObject.layer.opacity;
    ctx.globalCompositeOperation = renderObject.layer.blend;
    ctx.drawImage(
      renderObject.loadedImage,
      0,
      0,
      format.width,
      format.height,
    );
  }

  addAttributes(renderObject);
};

const constructLayerToDna = (_dna = '', baseLayers: ILayer[], layersList: ILayer[]): Array<IDnaElement | null> => {
  const dna: IDnaElement[] = [];
  baseLayers.forEach((layer, index) => {
    if (index > 1) return;
    let selectedElement = layer.elements.find(
      (e) => e.id === cleanDna(_dna.split(DNA_DELIMITER)[index]),
    );
    dna.push({
      name: layer.name,
      blend: layer.blend,
      opacity: layer.opacity,
      selectedElement: selectedElement,
    });
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

const createDna = (baseLayers: ILayer[], layersList: ILayer[], max: number, min: number): string => {
  remove = [];
  let randNum: string[] = [];
  let dnaArray: ILayerElement[] = [];
  let blockedTraits: string[] = [];
  let traitsIds = getTraitsIds(max);
  baseLayers.forEach((layer, index) => {
      if (index > 1) return;
      const name = layer.elements[0].filename.split('#')[0];
      blockedTraits.push(...getExcludes(name));

      return randNum.push(
        `${layer.elements[0].id}:${layer.elements[0].filename}${
          layer.bypassDNA ? '?bypassDNA=true' : ''
        }`,
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
      const name = excludedLayer[i].filename.split('#')[0];
      if (!blockedTraits.includes(name)) {
        const layersListIndex = excludedLayerIndexes[i];
        blockedTraits.push(...getExcludes(name));

        remove.push({
          index: index,
          itemIndex: layersListIndex,
        });

        dnaArray.push(excludedLayer[i]);
        randNum[index] =
          `${excludedLayer[i].id}:${excludedLayer[i].filename}${
            layer.bypassDNA ? '?bypassDNA=true' : ''
          }`;
        return;
      }
    }

    // add empty element
    randNum[index] =
      `${baseLayers[index].elements[0].id}:${baseLayers[index].elements[0].filename}${
        layer.bypassDNA ? '?bypassDNA=true' : ''
      }`;
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

const writeMetaData = (_data: any) => {
  fs.writeFileSync(`${buildDir}/json/_metadata.json`, _data);
};

const saveMetaDataSingleFile = (_editionCount: number) => {
  let metadata = metadataList.find((meta) => meta.edition === _editionCount);
  fs.writeFileSync(
    `${buildDir}/json/${_editionCount}.json`,
    JSON.stringify(metadata, null, 2),
  );
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
      // change layer order with t103
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

const startCreating = async () => {
  let layerConfigIndex = 0;
  // количество созданных
  let editionCount = 1;
  let failedCount = 0;
  let abstractedIndexes: number[] = [];
  let totalCount = 1;
  layerConfigurations.forEach((item) => {
    totalCount += item.count;
  });
  for (let i = 1; i <= totalCount; i++) {
    abstractedIndexes.push(i + 1);
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

    let currentLayer = 1;
    while (currentLayer <= layerConfigurations[layerConfigIndex].count) {
      let newDna = createDna(
        baseLayers,
        layersList,
        layerConfigurations[layerConfigIndex].maxTraits,
        layerConfigurations[layerConfigIndex].minTraits,
      );
      if (isDnaUnique(dnaList, newDna)) {
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
          ctx.clearRect(0, 0, format.width, format.height);
          if (background.generate) {
            drawBackground();
          }
          renderObjectArray.forEach((renderObject) => {
            drawElement(renderObject);
          });
          saveImage(abstractedIndexes[0]);
          addMetadata(newDna, abstractedIndexes[0]);
          saveMetaDataSingleFile(abstractedIndexes[0]);
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
        } else {
          console.log('DNA exists!');
          failedCount++;
        }
        if (failedCount >= uniqueDnaTorrance) {
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
          failedCount = 0;
        }
        currentLayer--;
      }
      currentLayer++;
    }
    layerConfigIndex++;
  }
  writeMetaData(JSON.stringify(metadataList, null, 2));
};

const createSingleDna = (dnaArray: any[]) => {
  let randNum: any[] = [];
  dnaArray.forEach((layer) => {
    randNum.push(
      `${layer.selectedElement.id}:${layer.selectedElement.filename}`,
    );
  });
  return randNum.join(DNA_DELIMITER);
};

const saveSingleMetaData = (number: number) => {
  let metadata = metadataList.find((meta) => meta.edition === number);
  fs.writeFileSync(
    `${buildDir}/single/${number}.json`,
    JSON.stringify(metadata, null, 2),
  );
};

const createSingle = async (number: number) => {
  const baseList = 'b1, base, ';
  let layersList: any[] = [];
  let layer0 = layersSetup(
    layerConfigurations[0].layersOrder,
  );

  layer0.forEach((layer: any) => {
    let newLayer = JSON.parse(JSON.stringify(layer));
    newLayer.elements = [];
    for (let i = 0; i < layer.elements.length; i++) {
      let newLayerElement = JSON.parse(JSON.stringify(layer.elements[i]));
      newLayer.elements.push(newLayerElement);
    }
    layersList.push(newLayer);
  });

  const list = baseList + 't1, t130, t103';
  number = 1;

  const array = list.split(', ');
  let results: any[] = [];

  layersList.forEach((layer) => {
    layer.elements.forEach((trait: any) => {
      if (array.includes(trait.name)) {
        results.push({
          name: layer.name,
          selectedElement: trait,
        });
      }
    });
  });
  let dna = createSingleDna(results);
  let loadedElements: any[] = [];
  results.forEach((layer) => {
    if (layer) {
      loadedElements.push(loadLayerImg(layer));
    }
  });

  await Promise.all(loadedElements).then((renderObjectArray) => {
    ctx.clearRect(0, 0, format.width, format.height);
    renderObjectArray.forEach((renderObject) => {
      drawElement(renderObject);
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

};

module.exports = { startCreating, buildSetup, getElements, createSingle };
