export const POS_V_OPTIONS_EN = [
  {
    label: 'v. 动词',
    value: 'v.',
  },
  {
    label: 'vt. 及物动词',
    value: 'v.vt.',
  },
  {
    label: 'vi. 不及物动词',
    value: 'v.vi.',
  },
  {
    label: 'aux. 助动词',
    value: 'v.aux.',
  },
  {
    label: 'link. 系动词',
    value: 'v.link.',
  },
  {
    label: 'modal. 情态动词',
    value: 'v.modal.',
  },
];

export const POS_CASCADER_OPTIONS_EN = [
  {
    label: 'n. 名词',
    value: 'n.',
    children: [
      {
        label: 'n. 名词',
        value: 'n.',
      },
      {
        label: 'n.C. 可数名词',
        value: 'n.C.',
      },
      {
        label: 'n.U. 不可数名词',
        value: 'n.U.',
      },
    ],
  },
  {
    label: 'v. 动词',
    value: 'v.',
    children: POS_V_OPTIONS_EN,
  },
  {
    label: 'adj. 形容词',
    value: 'adj.',
  },
  {
    label: 'adv. 副词',
    value: 'adv.',
  },
  {
    label: 'det. 限定词',
    value: 'det.',
    children: [
      {
        label: 'det. 限定词',
        value: 'det.',
      },
      {
        label: 'art. 冠词',
        value: 'art.',
      },
      {
        label: 'poss. 物主限定词',
        value: 'det.poss.',
      },
      {
        label: 'dem. 指示限定词',
        value: 'det.dem.',
      },
      {
        label: 'quant. 量词',
        value: 'det.quant.',
      },
      {
        label: 'num. 数词',
        value: 'det.num.',
      },
    ],
  },
  {
    label: 'conj. 连词',
    value: 'conj.',
    children: [
      {
        label: 'conj. 连词',
        value: 'conj.',
      },
      {
        label: 'cconj. 并列连词',
        value: 'cconj.',
      },
      {
        label: 'sconj. 从属连词',
        value: 'sconj.',
      },
    ],
  },
  {
    label: 'pron. 代词',
    value: 'pron.',
    children: [
      {
        label: 'pron. 代词',
        value: 'pron.',
      },
      {
        label: 'poss. 物主代词',
        value: 'pron.poss.',
      },
      {
        label: 'refl. 反身代词',
        value: 'pron.refl.',
      },
      {
        label: 'dem. 指示代词',
        value: 'pron.dem.',
      },
      {
        label: 'rel. 关系代词',
        value: 'pron.rel.',
      },
      {
        label: 'recip. 相互代词',
        value: 'pron.recip.',
      },
      {
        label: 'int. 不定代词',
        value: 'pron.int.',
      },
      {
        label: 'pers. 人称代词',
        value: 'pron.pers.',
      },
      {
        label: 'interrog. 疑问代词',
        value: 'pron.interrog.',
      },
    ],
  },
  {
    label: 'prep. 介词',
    value: 'prep.',
  },
  {
    label: 'int. 感叹词',
    value: 'int.',
  },
];

export const POS_MAP_EN: {
  [key: string]: string;
} = POS_CASCADER_OPTIONS_EN.reduce(((acc, item) => {
  if (item.children) {
    const map = item.children.reduce((a, i) => ({
      ...a,
      [i.value]: item.value,
    }), {});
    return {
      ...acc,
      ...map,
    };
  }
  return acc;
}), {});
