// General metadata for Ethereum
import { ILayerConfigurationItem } from '../utils/types';

const namePrefix = 'Your Collection';
const description = 'Remember to replace this description';
const baseUri = 'ipfs://NewUriToReplace';

const layerConfigurations: ILayerConfigurationItem[] = [
  {
    count: 9,
    maxTraits: 8,
    minTraits: 5,
    layersOrder: [
      { name: 'Background1' },
      { name: 'Base' },
      { name: 'Fur' },
      { name: 'Body' },
      { name: 'Mouth' },
      { name: 'Eyes' },
      { name: 'Face Masks' },
      { name: 'Ears' },
      { name: 'Eye Wear' },
      { name: 'Nose Wear' },
      { name: 'Head' },
    ],
  },
  {
    count: 25,
    maxTraits: 6,
    minTraits: 5,
    layersOrder: [
      { name: 'Background2' },
      { name: 'Base' },
      { name: 'Fur' },
      { name: 'Body' },
      { name: 'Mouth' },
      { name: 'Eyes' },
      { name: 'Face Masks' },
      { name: 'Ears' },
      { name: 'Eye Wear' },
      { name: 'Nose Wear' },
      { name: 'Head' },
    ],
  },
  {
    count: 50,
    maxTraits: 5,
    minTraits: 5,
    layersOrder: [
      { name: 'Background3' },
      { name: 'Base' },
      { name: 'Fur' },
      { name: 'Body' },
      { name: 'Mouth' },
      { name: 'Eyes' },
      { name: 'Face Masks' },
      { name: 'Ears' },
      { name: 'Eye Wear' },
      { name: 'Nose Wear' },
      { name: 'Head' },
    ],
  }, {
    count: 85,
    maxTraits: 5,
    minTraits: 4,
    layersOrder: [
      { name: 'Background4' },
      { name: 'Base' },
      { name: 'Fur' },
      { name: 'Body' },
      { name: 'Mouth' },
      { name: 'Eyes' },
      { name: 'Face Masks' },
      { name: 'Ears' },
      { name: 'Eye Wear' },
      { name: 'Nose Wear' },
      { name: 'Head' },
    ],
  }, {
    count: 130,
    maxTraits: 4,
    minTraits: 4,
    layersOrder: [
      { name: 'Background5' },
      { name: 'Base' },
      { name: 'Fur' },
      { name: 'Body' },
      { name: 'Mouth' },
      { name: 'Eyes' },
      { name: 'Face Masks' },
      { name: 'Ears' },
      { name: 'Eye Wear' },
      { name: 'Nose Wear' },
      { name: 'Head' },
    ],
  }, {
    count: 165,
    maxTraits: 4,
    minTraits: 3,
    layersOrder: [
      { name: 'Background6' },
      { name: 'Base' },
      { name: 'Fur' },
      { name: 'Body' },
      { name: 'Mouth' },
      { name: 'Eyes' },
      { name: 'Face Masks' },
      { name: 'Ears' },
      { name: 'Eye Wear' },
      { name: 'Nose Wear' },
      { name: 'Head' },
    ],
  }, {
    count: 235,
    maxTraits: 3,
    minTraits: 3,
    layersOrder: [
      { name: 'Background7' },
      { name: 'Base' },
      { name: 'Fur' },
      { name: 'Body' },
      { name: 'Mouth' },
      { name: 'Eyes' },
      { name: 'Face Masks' },
      { name: 'Ears' },
      { name: 'Eye Wear' },
      { name: 'Nose Wear' },
      { name: 'Head' },
    ],
  }, {
    count: 300,
    maxTraits: 2,
    minTraits: 2,
    layersOrder: [
      { name: 'Background8' },
      { name: 'Base' },
      { name: 'Fur' },
      { name: 'Body' },
      { name: 'Mouth' },
      { name: 'Eyes' },
      { name: 'Face Masks' },
      { name: 'Ears' },
      { name: 'Eye Wear' },
      { name: 'Nose Wear' },
      { name: 'Head' },
    ],
  },
];

const caching = true;

const format = {
  width: 2048,
  height: 2048,
  smoothing: false,
};

const extraMetadata = {};

const rarityDelimiter = '#';

const uniqueDnaTorrance = 100000;

export {
  format,
  baseUri,
  description,
  uniqueDnaTorrance,
  layerConfigurations,
  rarityDelimiter,
  extraMetadata,
  namePrefix,
  caching
};
