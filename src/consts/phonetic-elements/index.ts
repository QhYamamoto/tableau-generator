import { CONSONANTS } from './consonants'
import { ALVEO_PALATAL_SYMBOLS } from './consonants/alveo-palatal'
import { CORONAL_SYMBOLS } from './consonants/coronal'
import { LABIAL_SYMBOLS } from './consonants/labial'
import { LARYNGEAL_SYMBOLS } from './consonants/laryngeal'
import { OTHER_CONSONANT_SYMBOLS } from './consonants/others'
import { PALATAL_SYMBOLS } from './consonants/palatal'
import { RETROFLEX_SYMBOLS } from './consonants/retroflex'
import { UVULAR_SYMBOLS } from './consonants/uvular'
import { VELAR_SYMBOLS } from './consonants/velar'
import { NON_SOUND_ELEMENTS } from './others'
import { VOWELS, VOWEL_SYMBOLS } from './vowels'

/**
 * Array of default phonetic element object.
 * 'Phonetic element' includes all segmental sound elements and all utility elements (like '_' that indicate deleted element).
 */
export const PHONETIC_ELEMENTS: PhoneticElement[] = [
  ...CONSONANTS,
  ...VOWELS,
  ...NON_SOUND_ELEMENTS,
]

/**
 * Array of symbols of all types of phonetic elements
 */
export const ALL_SYMBOLS = PHONETIC_ELEMENTS.map((el) => el.symbol).sort(
  (a, b) => b.length - a.length
)

/**
 * Array of symbols of segmental sound elements
 */
export const SOUND_SYMBOLS: string[] = [...CONSONANTS, ...VOWELS]
  .map((el) => el.symbol)
  .sort((a, b) => b.length - a.length)

const nonSoundSymbols: string[] = NON_SOUND_ELEMENTS.map((el) => el.symbol)
nonSoundSymbols.push('◌\u{032F}', 'ː')

/**
 * Array of symbols of utility elements and symbols dependent to some sound elements (like 'ː' of long vowels)
 */
export const NON_SOUND_SYMBOLS = nonSoundSymbols

/**
 * Symbols which can be included in Input instance's value
 */
export const INPUT_VALID_SYMBOLS: string[] = [
  ...SOUND_SYMBOLS,
  '-',
  '{',
  '}',
  ',',
]

/**
 * All symbols with categorization key
 */
export const CATEGORIZED_SYMBOL_ARRAYS: { [key: string]: string[] } = {
  Vowels: VOWEL_SYMBOLS,
  Labials: LABIAL_SYMBOLS,
  Coronals: CORONAL_SYMBOLS,
  Retroflexes: RETROFLEX_SYMBOLS,
  'Alveo-palatals, Palatals': [...ALVEO_PALATAL_SYMBOLS, ...PALATAL_SYMBOLS],
  'Velars, Uvulars': [...VELAR_SYMBOLS, ...UVULAR_SYMBOLS],
  'Laryngeals, Others consonants': [
    ...LARYNGEAL_SYMBOLS,
    ...OTHER_CONSONANT_SYMBOLS,
  ],
  'Other symbols': NON_SOUND_SYMBOLS,
}

/**
 * Array of filtering target object, which contains 'type' and 'regexp' property
 */
export const FILTERING_TARGET_OBJS: FilteringTargetObj[] = [
  { type: 'morpheme-border', regexp: /-/g },
  { type: 'syllable-border', regexp: /\./g },
  { type: 'mutation-border', regexp: /<|>/g },
  { type: 'deleted-segment', regexp: /_/g },
  { type: 'index', regexp: /[1-9]|,/g },

  // Don't switch order of the following two objects
  { type: 'coalescence-content', regexp: /(?<=\{).*?(?=\})/g },
  { type: 'coalescence-border', regexp: /\{|\}/g },

  // Don't switch order of the following two objects
  { type: 'insertion-content', regexp: /(?<=\().*?(?=\))/g },
  { type: 'insertion-border', regexp: /\(|\)/g },
]
