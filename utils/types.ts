import { Image } from 'canvas';

export interface ILayerConfigurationItem {
  count: number;
  maxTraits: number;
  minTraits: number;
  layersOrder: Array<{
    name: string;
  }>
}

export interface ILayerElement {
  id: number,
  name: string,
  filename: string,
  path: string,
  weight: number,
}

export interface ILayer {
  bypassDNA: any;
  blend: any;
  elements: ILayerElement[];
  name: any;
  id: number;
  opacity: any;
}

export interface IRemove {
  index: number;
  itemIndex: number;
}

export interface IDnaElement {
  name: string;
  blend: any;
  opacity: any;
  selectedElement: ILayerElement | undefined;
}

export interface IImage {
  loadedImage: Image;
  layer: IDnaElement;
}

export interface IJSONImage {
  dna: string;
  attributes: IAttribute[];
}

export interface IAttribute {
  trait_type: string;
  value: number;
  weight: number;
  name: string;
}

