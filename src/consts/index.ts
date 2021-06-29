import { POS_CASCADER_OPTIONS_EN, POS_MAP_EN } from './en';
import { POS_CASCADER_OPTIONS_ES, POS_MAP_ES } from './es';

export * from './en';
export * from './es';

export const FORM_OPTIONS = [
  {
    label: 'base form',
    value: 'base',
  },
  {
    label: 'inflection form',
    value: 'inflection',
  },
];

export const STATUS = ['init', 'edited', 'abstained', 'checked'];

export const FILE_EXTENSION_POS_MAP: {
  [key: string]: string;
} = {
  adj: 'adj.',
  noun: 'n.',
  verbs: 'v.',
};

export const LANG_POS_CASCADER_OPTIONS_MAP: {
  [key: string]: any;
} = {
  en: POS_CASCADER_OPTIONS_EN,
  es: POS_CASCADER_OPTIONS_ES,
};

export const LANG_POS_MAP: {
  [key: string]: any;
} = {
  en: POS_MAP_EN,
  es: POS_MAP_ES,
};

export const LANG_DICTIONARY_MAP: {
  [key: string]: string;
} = {
  en: 'https://dictionary.cambridge.org/dictionary/english-chinese-simplified/',
  es: 'https://zh.pons.com/%E7%BF%BB%E8%AF%91/%E8%A5%BF%E7%8F%AD%E7%89%99%E8%AF%AD-%E4%B8%AD%E6%96%87/',
};
