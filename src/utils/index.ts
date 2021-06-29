import { LANG_POS_MAP } from '@/consts/index';

export const baseResourceToModel = (resource: any, index: number, lang: string) => {
  let explanation;
  try {
    explanation = JSON.parse(resource.explanation);
  } catch {
  // empty
  }
  const POS_MAP = LANG_POS_MAP[lang || 'en'];
  return {
    index: index + 1,
    word: resource.word,
    form: resource.form || 'base',
    status: resource.status || 'init',
    explanation: (explanation || []).map((item: any) => ({
      ...item,
      pos: POS_MAP[item.pos] ? [POS_MAP[item.pos], item.pos] : [item.pos],
    })),
  };
};

export const baseModelToResource = (resource: any) => ({
  word: resource.word,
  form: resource.form || 'base',
  status: resource.status || 'init',
  explanation: JSON.stringify(resource.explanation.map((item: any) => ({
    ...item,
    pos: item.pos.pop(),
  }))),
});

export const extensionResourceToModel = (resource: any, index: number) => {
  let extension;
  try {
    extension = JSON.parse(resource.extension);
  } catch {
  // empty
  }
  return {
    index: index + 1,
    word: resource.word,
    form: resource.form || 'base',
    status: resource.status || 'init',
    extension: extension || {},
  };
};

export const extensionModelToResource = (resource: any) => ({
  word: resource.word,
  form: resource.form || 'base',
  status: resource.status || 'init',
  extension: JSON.stringify(resource.extension),
});
