import { generateCSV } from '../utils/generate_csv';
import { generateRarity } from '../utils/rarity';
import { generateHash } from '../utils/generate_hash';
import { generateUsedTraits } from '../utils/generate_used_traits';
import { imageName } from './config';

(() => {
    generateCSV(imageName);
    generateRarity();
    // generateUsedTraits()
    // generateHash();
})();
