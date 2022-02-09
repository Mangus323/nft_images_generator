import { generateCSV } from '../utils/generate_csv';
import { generateRarity } from '../utils/rarity';
import { generateHash } from '../utils/generate_hash';
import { generateUsedTraits } from '../utils/generate_used_traits';

(() => {
    generateCSV();
    generateRarity();
    generateUsedTraits()
    generateHash();
})();
