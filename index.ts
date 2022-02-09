import { buildSetup } from './utils/fs';
import { startCreating } from './src/main';

(() => {
  buildSetup();
  startCreating();
})();
