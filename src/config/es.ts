const metadata = {
  word: {
    type: 'string',
    disabled: true,
  },
  pos: {
    type: 'string',
  },
  meaning: {
    type: 'string',
  },
  status: {
    type: 'enum',
    label: 'status',
    enum: ['init', 'edited', 'checked'],
    options: [
      { label: 'init', value: 'init' },
      { label: 'edited', value: 'edited' },
      { label: 'checked', value: 'checked' },
    ],
  },
};
const vImperativo = {
  yo: {
    type: 'string',
  },
  tú: {
    type: 'string',
  },
  'él/ella/Usted': {
    type: 'string',
  },
  nosotros: {
    type: 'string',
  },
  vosotros: {
    type: 'string',
  },
  'ellos/ellas/Ustedes': {
    type: 'string',
  },
};
const vDescriptor = {
  ...metadata,
  variations: {
    type: 'object',
    label: 'variations',
    fields: {
      origin: {
        type: 'string',
      },
      formats: {
        type: 'array',
        defaultField: {
          type: 'object',
          fields: {
            tense: {
              type: 'string',
            },
            person: {
              type: 'string',
            },
            format: {
              type: 'string',
            },
          },
        },
      },
    },
  },
  extension: {
    type: 'object',
    label: 'extension',
    fields: {
      imperativo_afirmativo: {
        type: 'object',
        label: 'imperativo_afirmativo',
        fields: {
          ...vImperativo,
        },
      },
      imperativo_negativo: {
        type: 'object',
        label: 'imperativo_negativo',
        fields: {
          ...vImperativo,
        },
      },
      'indicativo-pretérito': {
        type: 'object',
        label: 'indicativo-pretérito',
        fields: {
          ...vImperativo,
        },
      },
      'indicativo-presente': {
        type: 'object',
        label: 'indicativo-presente',
        fields: {
          ...vImperativo,
        },
      },
      'subjuntivo-presente': {
        type: 'object',
        label: 'subjuntivo-presente',
        fields: {
          ...vImperativo,
        },
      },
      'indicativo-futuro': {
        type: 'object',
        label: 'indicativo-futuro',
        fields: {
          ...vImperativo,
        },
      },
      'subjuntivo-futuro': {
        type: 'object',
        label: 'subjuntivo-futuro',
        fields: {
          ...vImperativo,
        },
      },
      'indicativo-imperfecto': {
        type: 'object',
        label: 'indicativo-imperfecto',
        fields: {
          ...vImperativo,
        },
      },
      'subjuntivo-imperfecto': {
        type: 'object',
        label: 'subjuntivo-imperfecto',
        fields: {
          ...vImperativo,
        },
      },
      'indicativo-condicional': {
        type: 'object',
        label: 'indicativo-condicional',
        fields: {
          ...vImperativo,
        },
      },
      participio: {
        type: 'string',
      },
      gerundio: {
        type: 'string',
      },
    },
  },
};
const nDescriptor = {
  ...metadata,
  variations: {
    type: 'object',
    label: 'variations',
    fields: {
      origin: {
        type: 'string',
      },
      formats: {
        type: 'array',
        defaultField: {
          type: 'string',
        },
      },
    },
  },
  extension: {
    type: 'object',
    label: 'extension',
    fields: {
      m: {
        type: 'string',
      },
      f: {
        type: 'string',
      },
      mpl: {
        type: 'string',
      },
      fpl: {
        type: 'string',
      },
    },
  },
};
export default {
  'm.': nDescriptor,
  'f.': nDescriptor,
  'm.pl.': nDescriptor,
  'f.pl.': nDescriptor,
  'v.': vDescriptor,
  'vt.': vDescriptor,
  'vi.': vDescriptor,
  'adj.': {
    ...metadata,
    extension: {
      type: 'object',
      label: 'extension',
      fields: {
        m: {
          type: 'string',
        },
        f: {
          type: 'string',
        },
        mpl: {
          type: 'string',
        },
        fpl: {
          type: 'string',
        },
      },
    },
  },
  'adv.': metadata,
  'prep.': metadata,
  'conj.': metadata,
  'pron.': metadata,
};
