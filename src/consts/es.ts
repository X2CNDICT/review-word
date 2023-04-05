export const POS_V_OPTIONS_ES = [
  {
    label: 'v. 动词',
    value: 'v.',
  },
  {
    label: 'tr. 及物动词',
    value: 'v.tr.',
  },
  {
    label: 'intr. 不及物动词',
    value: 'v.intr.',
  },
  {
    label: 'prnl. 代词式动词',
    value: 'v.prnl.',
  },
  {
    label: 'aux. 助动词',
    value: 'v.aux.',
  },
  {
    label: 'copulat. 系动词',
    value: 'v.copulat.',
  },
];

export const POS_ADJ_OPTIONS_ES = [
  {
    label: 'adj. 形容词',
    value: 'adj.',
  },
  {
    label: 'cal. 属性形容词',
    value: 'adj.cal.',
  },
  {
    label: 'dem. 指示形容词',
    value: 'adj.dem.',
  },
  {
    label: 'poses. 物主形容词',
    value: 'adj.poses.',
  },
  {
    label: 'indef. 不定形容词',
    value: 'adj.indef.',
  },
  {
    label: 'interrog. 疑问形容词',
    value: 'adj.interrog.',
  },
  {
    label: 'excl. 感叹形容词',
    value: 'adj.excl.',
  },
];

export const POS_CASCADER_OPTIONS_ES = [
  {
    label: 's. 名词',
    value: 's.',
    children: [
      {
        label: 's. 名词',
        value: 's.',
      },
      {
        label: 's.m. 阳性名词',
        value: 's.m.',
      },
      {
        label: 's.f. 阴性名词',
        value: 's.f.',
      },
    ],
  },
  {
    label: 'v. 动词',
    value: 'v.',
    children: POS_V_OPTIONS_ES,
  },
  {
    label: 'adj. 形容词',
    value: 'adj.',
    children: POS_ADJ_OPTIONS_ES,
  },
  {
    label: 'adv. 副词',
    value: 'adv.',
  },
  {
    label: 'art. 冠词',
    value: 'art.',
  },
  {
    label: 'conj. 连词',
    value: 'conj.',
  },
  {
    label: 'prep. 介词',
    value: 'prep.',
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
        label: 'dem. 指示代词',
        value: 'pron.dem.',
      },
      {
        label: 'person. 人称代词',
        value: 'pron.person.',
      },
      {
        label: 'indef. 不定代词',
        value: 'pron.indef.',
      },
      {
        label: 'interrog. 疑问代词',
        value: 'pron.interrog.',
      },
      {
        label: 'excl. 感叹代词',
        value: 'pron.excl.',
      },
      {
        label: 'relat. 关系代词',
        value: 'pron.relat.',
      },
      {
        label: 'poses. 物主代词',
        value: 'pron.poses.',
      },
      {
        label: 'num. 数目代词',
        value: 'pron.num.',
      },
    ],
  },
];

export const POS_MAP_ES: {
  [key: string]: string;
} = POS_CASCADER_OPTIONS_ES.reduce(((acc, item) => {
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
