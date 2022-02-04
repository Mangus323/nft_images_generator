const basePath = process.cwd();
const {NETWORK} = require(`${basePath}/constants/network.js`);
const fs = require("fs");
const sha1 = require(`${basePath}/node_modules/sha1`);
const {createCanvas, loadImage} = require(`${basePath}/node_modules/canvas`);
const buildDir = `${basePath}/build`;
const layersDir = `${basePath}/layers`;
const {
  format,
  baseUri,
  description,
  background,
  uniqueDnaTorrance,
  layerConfigurations,
  rarityDelimiter,
  extraMetadata,
  namePrefix,
  network,
  solanaMetadata,
  gif,
} = require(`${basePath}/src/config.js`);

const {
  getExcludes
} = require(`${basePath}/src/exclude_list.js`);
const {
  getTraitName
} = require(`${basePath}/src/names_list.js`);
const canvas = createCanvas(format.width, format.height);
const ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = format.smoothing;
var metadataList = [];
var attributesList = [];
var dnaList = new Set();
const DNA_DELIMITER = "-";
let remove = [];

const buildSetup = () => {
  if (fs.existsSync(buildDir)) {
    fs.rmdirSync(buildDir, {recursive: true});
  }
  fs.mkdirSync(buildDir);
  fs.mkdirSync(`${buildDir}/json`);
  fs.mkdirSync(`${buildDir}/images`);
  if (gif.export) {
    fs.mkdirSync(`${buildDir}/gifs`);
  }
};

const getRarityWeight = (_str) => {
  let nameWithoutExtension = _str.slice(0, -4);
  let nameWithoutWeight = Number(
    nameWithoutExtension.split(rarityDelimiter).pop()
  );
  if (isNaN(nameWithoutWeight)) {
    nameWithoutWeight = 1;
  }
  return nameWithoutWeight;
};

const cleanDna = (_str) => {
  const withoutOptions = removeQueryStrings(_str);
  return Number(withoutOptions.split(":").shift());
};

const cleanName = (_str) => {
  let nameWithoutExtension = _str.slice(0, -4);
  return nameWithoutExtension.split(rarityDelimiter).shift();
};

const getElements = (path) => {
  return fs
    .readdirSync(path)
    .filter((item) => !/(^|\/)\.[^\/.]/g.test(item))
    .map((i, index) => {
      if (i.includes("-")) {
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

const layersSetup = (layersOrder) => {
  return layersOrder.map((layerObj, index) => ({
    id: index,
    elements: getElements(`${layersDir}/${layerObj.name}/`),
    name:
      layerObj.options?.["displayName"] !== undefined
        ? layerObj.options?.["displayName"]
        : layerObj.name,
    blend:
      layerObj.options?.["blend"] !== undefined
        ? layerObj.options?.["blend"]
        : "source-over",
    opacity:
      layerObj.options?.["opacity"] !== undefined
        ? layerObj.options?.["opacity"]
        : 1,
    bypassDNA:
      layerObj.options?.["bypassDNA"] !== undefined
        ? layerObj.options?.["bypassDNA"]
        : false,
  }));
};

const saveImage = (_editionCount) => {
  fs.writeFileSync(
    `${buildDir}/images/${_editionCount}.png`,
    canvas.toBuffer("image/png")
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

const addMetadata = (_dna, _edition) => {
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
    compiler: "HashLips Art Engine",
  };
  if (network === NETWORK.sol) {
    tempMetadata = {
      //Added metadata for solana
      name: tempMetadata.name,
      symbol: solanaMetadata.symbol,
      description: tempMetadata.description,
      //Added metadata for solana
      seller_fee_basis_points: solanaMetadata.seller_fee_basis_points,
      image: `${_edition}.png`,
      //Added metadata for solana
      external_url: solanaMetadata.external_url,
      edition: _edition,
      ...extraMetadata,
      attributes: tempMetadata.attributes,
      properties: {
        files: [
          {
            uri: `${_edition}.png`,
            type: "image/png",
          },
        ],
        category: "image",
        creators: solanaMetadata.creators,
      },
    };
  }
  metadataList.push(tempMetadata);
  attributesList = [];
};

const addAttributes = (_element) => {
  let selectedElement = _element.layer.selectedElement;
  let name = getTraitName(selectedElement.name);
  if (selectedElement.name === 'empty' && !(_element.layer.name.includes('Mouth'))) {
    name = "N/A";
  }
  if (selectedElement.name === 'empty' && (_element.layer.name.includes('Eyes'))) {
    name = "Brown";
  }
  if (_element.layer.name.includes('Base')) {
    return;
  }
  if (_element.layer.name.includes('Background')) {
    const layerName = _element.layer.name.slice(0, 10);
    const value = +(_element.layer.name.slice(10));
    attributesList.push({
      trait_type: layerName,
      value: value,
      weight: selectedElement.weight,
      name: name
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

const loadLayerImg = async (_layer) => {
  try {
    return new Promise(async (resolve) => {
      const image = await loadImage(`${_layer.selectedElement.path}`);
      resolve({layer: _layer, loadedImage: image});
    });
  } catch (error) {
    console.error("Error loading image:", error);
  }
};

const drawElement = (_renderObject, _index, _layersLen) => {
  ctx.globalAlpha = _renderObject.layer.opacity;
  ctx.globalCompositeOperation = _renderObject.layer.blend;
  ctx.drawImage(
    _renderObject.loadedImage,
    0,
    0,
    format.width,
    format.height
  );

  addAttributes(_renderObject);
};

const constructLayerToDna = (_dna = "", _layers = [], layersList) => {
  const dna = [];
  _layers.forEach((layer, index) => {
    if (index > 1) return;
    let selectedElement = layer.elements.find(
      (e) => e.id === cleanDna(_dna.split(DNA_DELIMITER)[index])
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
        selectedElement: emptyElements[0],
      });
      return;
    }
    let selectedElement = JSON.parse(JSON.stringify(layer.elements.find(
      (e) => e.id === id
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

/**
 * In some cases a DNA string may contain optional query parameters for options
 * such as bypassing the DNA isUnique check, this function filters out those
 * items without modifying the stored DNA.
 *
 * @param {String} _dna New DNA string
 * @returns new DNA string with any items that should be filtered, removed.
 */
const filterDNAOptions = (_dna) => {
  const dnaItems = _dna.split(DNA_DELIMITER);
  const filteredDNA = dnaItems.filter((element) => {
    const query = /(\?.*$)/;
    const querystring = query.exec(element);
    if (!querystring) {
      return true;
    }
    const options = querystring[1].split("&").reduce((r, setting) => {
      const keyPairs = setting.split("=");
      return {...r, [keyPairs[0]]: keyPairs[1]};
    }, []);

    return options.bypassDNA;
  });

  return filteredDNA.join(DNA_DELIMITER);
};

/**
 * Cleaning function for DNA strings. When DNA strings include an option, it
 * is added to the filename with a ?setting=value query string. It needs to be
 * removed to properly access the file name before Drawing.
 *
 * @param {String} _dna The entire newDNA string
 * @returns Cleaned DNA string without querystring parameters.
 */
const removeQueryStrings = (_dna) => {
  const query = /(\?.*$)/;
  return _dna.replace(query, "");
};

const isDnaUnique = (_DnaList = new Set(), _dna = "") => {
  const _filteredDNA = filterDNAOptions(_dna);
  return !_DnaList.has(_filteredDNA);
};

const createDna = (_layers, layersList, max, min) => {
  remove = [];
  let randNum = [];
  let dnaArray = [];
  let blockedTraits = [];
  let traitsIds = getTraitsIds(max);
  _layers.forEach((layer, index) => {
    if (index > 1) return;
    let totalWeight = 0;
    layer.elements.forEach((element) => {
      totalWeight += element.weight;
    });
    let random = Math.floor(Math.random() * totalWeight);
    for (let i = 0; i < layer.elements.length; i++) {
      random -= layer.elements[i].weight;
      if (random < 0) {
        const name = layer.elements[i].filename.split('#')[0];
        blockedTraits.push(...getExcludes(name));

        return randNum.push(
          `${layer.elements[i].id}:${layer.elements[i].filename}${
            layer.bypassDNA ? "?bypassDNA=true" : ""
          }`
        );
      }
    }
  });

  const randSort = [2, 3, ...shuffle([4, 5, 6, 7, 8, 9, 10])];

  randSort.forEach((index) => {
    let layer = layersList[index];
    let excludedLayer = [];
    let excludedLayerIndexes = [];

    // delegate layer elements
    layer.elements.forEach((element, layerIndex) => {
        if (!traitsIds.includes(index) && index > 2) return;
        if (!blockedTraits.includes(element.name)) {
          const blockedByTrait = getExcludes(element.name)
          for (let i = 0; i < dnaArray.length; i++) {
            if (blockedByTrait.includes(dnaArray[i].name)) {
              return;
            }
          }
          excludedLayer.push(element);
          excludedLayerIndexes.push(layerIndex);
        }
      }
    )
    if (index === 2 && layer.elements.length < 800) {
      console.log('ttu');
    }
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
          itemIndex: layersListIndex
        });

        dnaArray.push(excludedLayer[i]);
        randNum[index] =
          `${excludedLayer[i].id}:${excludedLayer[i].filename}${
            layer.bypassDNA ? "?bypassDNA=true" : ""
          }`;
        return;
      }
    }

    randNum[index] =
      `${_layers[index].elements[0].id}:${_layers[index].elements[0].filename}${
        layer.bypassDNA ? "?bypassDNA=true" : ""
      }`;
  })
  if (!dnaArray[1].path.includes('Clothes')) {
    return "";
  }

  if (dnaArray.length - 2 < min) {
    return "";
  }

  return randNum.join(DNA_DELIMITER);
};

const writeMetaData = (_data) => {
  fs.writeFileSync(`${buildDir}/json/_metadata.json`, _data);
};

const saveMetaDataSingleFile = (_editionCount) => {
  let metadata = metadataList.find((meta) => meta.edition === _editionCount);
  fs.writeFileSync(
    `${buildDir}/json/${_editionCount}.json`,
    JSON.stringify(metadata, null, 2)
  );
};

function shuffle(array) {
  let currentIndex = array.length;
  let randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}

const addQuantityModifier = (layers, count) => {
  const modifier = count / 125;
  layers.forEach((layer, index) => {
    if (index === 0 || index === 1) {
      return;
    }
    for (let i = 0; i < layer.elements.length; i++) {
      if (layer.elements[i].name === 'empty') {
        layer.elements[i].weight = layer.elements[i].weight * modifier;
      }
    }
  })
}

const getTraitsIds = (count) => {
  let traitsIds = [4, 5, 6, 7, 8, 9];
  let returnedTraitsIds = [2, 3];
  for (let i = 0; i < count; i++) {
    const index = Math.floor(Math.random() * (traitsIds.length))
    returnedTraitsIds.push(...traitsIds.splice(index, 1))
  }
  return returnedTraitsIds;
}

const changeTraitId = (traitsIds, index) => {
  if (traitsIds.includes(index)) {
    return changeTraitId(traitsIds, index + 1)
  } else {
    return [...traitsIds, index];
  }
}

const emptyElements = [];

const startCreating = async () => {
  let layerConfigIndex = 0;
  let editionCount = 1;
  let failedCount = 0;
  let abstractedIndexes = [];
  let totalCount = 0;
  layerConfigurations.forEach((item) => {
    totalCount += item.count;
  })
  for (let i = 0; i <= totalCount; i++) {
    abstractedIndexes.push(i + 1);
  }
  // new unique layers
  let layersList = [];
  let layer0 = layersSetup(
    layerConfigurations[0].layersOrder
  );

  layer0.forEach((layer, index) => {
    if (index < 2) {
      layersList.push({});
      return;
    }
    let newLayer = JSON.parse(JSON.stringify(layer));

    let sortedGroup = []
    newLayer.elements = [];

    let stepPercentage = Math.floor(layer.elements.length / 3)
    if (stepPercentage > 10) stepPercentage = 10
    const steps = [stepPercentage, stepPercentage, layer.elements.length - (stepPercentage) * 2, 0];
    let step = steps[0]
    let stepIndex = 0;

    layer.elements = layer.elements.sort((a, b) => {
      return a.weight - b.weight
    })
    const lastEmpty = layer.elements[layer.elements.length - 1].name === 'empty';

    for (let i = 0; i < layer.elements.length; i++) {
      let newLayerElement = JSON.parse(JSON.stringify(layer.elements[i]));
      if (newLayerElement.name === 'empty') {
        emptyElements.push(newLayerElement);
        continue;
      }

      for (let j = 0; j < newLayerElement.weight; j++) {
        sortedGroup.push({
          ...newLayerElement,
        })
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
    layersList.push(newLayer)
  })

  dnaList.add("");

  while (layerConfigIndex < layerConfigurations.length) {
    let layers = layersSetup(
      layerConfigurations[layerConfigIndex].layersOrder
    );
    addQuantityModifier(layersList, layerConfigurations[layerConfigIndex].count);

    let layerCount = 1;
    while (layerCount <= layerConfigurations[layerConfigIndex].count) {
      let newDna = createDna(layers,
        layersList,
        layerConfigurations[layerConfigIndex].maxTraits,
        layerConfigurations[layerConfigIndex].minTraits
      );
      if (isDnaUnique(dnaList, newDna)) {
        let results = constructLayerToDna(newDna, layers, layersList);
        // getWeight(results);
        remove.forEach((item) => {
          layersList[item.index].elements.splice(item.itemIndex, 1);
        })
        remove = [];

        let loadedElements = [];

        results.forEach((layer) => {
          loadedElements.push(loadLayerImg(layer));
        });

        await Promise.all(loadedElements).then((renderObjectArray) => {
          ctx.clearRect(0, 0, format.width, format.height);
          if (background.generate) {
            drawBackground();
          }
          renderObjectArray.forEach((renderObject, index) => {
            drawElement(
              renderObject,
              index,
              layerConfigurations[layerConfigIndex].layersOrder.length
            );
          });
          saveImage(abstractedIndexes[0]);
          addMetadata(newDna, abstractedIndexes[0]);
          saveMetaDataSingleFile(abstractedIndexes[0]);
          console.log(
            `Created edition: ${abstractedIndexes[0]}, with DNA: ${sha1(
              newDna
            )}`
          );
        });

        dnaList.add(filterDNAOptions(newDna));
        editionCount++;
        abstractedIndexes.shift();
      } else {
        if (newDna === '') {
          console.log("Not enough traits!");
        } else {
          console.log("DNA exists!");
          failedCount++;
        }
        if (failedCount >= uniqueDnaTorrance) {
          console.log(
            `You need more layers or elements to grow your edition to ${layerConfigurations[layerConfigIndex].count} artworks!`
          );
          // reshuffle
          let newLayersList = [];
          layersList.forEach((layer, index) => {
            if (index < 2) {
              newLayersList.push({});
              return;
            }
            let newLayer = JSON.parse(JSON.stringify(layer));
            newLayer.elements = [];
            for (let j = 0; j < layer.elements.length; j++) {
              let newLayerElement = JSON.parse(JSON.stringify(layer.elements[j]));
              for (let k = 0; k < newLayerElement.weight; k++) {
                newLayer.elements.push({
                  ...newLayerElement,
                })
              }
            }
            newLayer.elements = shuffle(newLayer.elements);
            newLayersList.push(newLayer)
          })
          layersList = newLayersList;
          failedCount = 0;
        }
        layerCount--;
      }
      layerCount++;
    }
    layerConfigIndex++;
  }
  writeMetaData(JSON.stringify(metadataList, null, 2));
};

module.exports = {startCreating, buildSetup, getElements};
