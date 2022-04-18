// General metadata for Ethereum
import { ILayerConfigurationItem } from '../utils/types';

const namePrefix = 'Your Collection';
const description = 'Remember to replace this description';
const baseUri = 'ipfs://NewUriToReplace';

const layerConfigurations: ILayerConfigurationItem[] = [
  {
    count: 10,
    maxTraits: 8,
    minTraits: 5,
    layersOrder: [
      { name: 'Background1' },
      { name: 'Base' },
      { name: 'Fur' },
      { name: 'Body' },
      { name: 'Mouth' },
      { name: 'Eyes' },
      { name: 'Face' },
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
      { name: 'Face' },
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
      { name: 'Face' },
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
      { name: 'Face' },
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
      { name: 'Face' },
      { name: 'Ears' },
      { name: 'Eye Wear' },
      { name: 'Nose Wear' },
      { name: 'Head' },
    ],
  }, {
    count: 165,
    maxTraits: 3,
    minTraits: 3,
    layersOrder: [
      { name: 'Background6' },
      { name: 'Base' },
      { name: 'Fur' },
      { name: 'Body' },
      { name: 'Mouth' },
      { name: 'Eyes' },
      { name: 'Face' },
      { name: 'Ears' },
      { name: 'Eye Wear' },
      { name: 'Nose Wear' },
      { name: 'Head' },
    ],
  }, {
    count: 235,
    maxTraits: 2,
    minTraits: 2,
    layersOrder: [
      { name: 'Background7' },
      { name: 'Base' },
      { name: 'Fur' },
      { name: 'Body' },
      { name: 'Mouth' },
      { name: 'Eyes' },
      { name: 'Face' },
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
      { name: 'Face' },
      { name: 'Ears' },
      { name: 'Eye Wear' },
      { name: 'Nose Wear' },
      { name: 'Head' },
    ],
  },
];

// indexes for layers which may not be
const optionalLayers = [4, 5, 6, 7, 8, 9, 10];

const layerDefaultName = new Map<string, string>();

// lion  Light Brown
// rhino koala cheetah warthog elephant  brown
// panda hyena  black
layerDefaultName.set('Eyes', 'Brown');
layerDefaultName.set('Mouth', 'Frown');
layerDefaultName.set('default', 'N/A');

// increase build speed, but takes more RAM and CPU usage
const caching = true;

//used for csv files
const imageName = 'Monkey';

const format = {
  width: 2048,
  height: 2048,
  smoothing: false,
};

const uniqueDnaTorrance = 100000;

export {
  baseUri,
  description,
  layerConfigurations,
  namePrefix,
  optionalLayers,
  layerDefaultName,
  caching,
  imageName,
  format,
  uniqueDnaTorrance,
};
