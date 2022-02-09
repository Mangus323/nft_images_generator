import { createCanvas, Image, loadImage } from 'canvas';
import { IDnaElement, IImage } from './types';
import { caching, format } from '../src/config';

const fs = require('fs');
const basePath = process.cwd();
const buildDir = `${basePath}/build`;

const canvas = createCanvas(format.width, format.height);
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = format.smoothing;
const cache = new Map<string, Image>();

export const loadLayerImg = async (dna: IDnaElement): Promise<IImage | null> => {
  try {
    return new Promise(async (resolve) => {
      const path = `${dna.selectedElement?.path}`;

      if (caching) {
        let cacheItem = cache.get(path);
        if (cacheItem) {
          resolve({ layer: dna, loadedImage: cacheItem });
        } else {
          const image = await loadImage(`${dna.selectedElement?.path}`);
          cache.set(path, image);
          resolve({ layer: dna, loadedImage: image });
        }
      } else {
        const image = await loadImage(`${dna.selectedElement?.path}`);
        resolve({ layer: dna, loadedImage: image });
      }
    });
  } catch (error) {
    console.error('Error loading image:', error);
    return null;
  }
};

export const drawElement = (renderObject: Awaited<IImage | null>) => {
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
};

export const saveImage = (_editionCount: number | string) => {
  fs.writeFileSync(
    `${buildDir}/images/${_editionCount}.png`,
    canvas.toBuffer('image/png'),
  );
  ctx.clearRect(0, 0, format.width, format.height);
};

export const saveSingleImage = (number: number | string) => {
  fs.writeFileSync(
    `${buildDir}/single/${number}.png`,
    canvas.toBuffer('image/png'),
  );
};
