const metadata = {
  word: {
    type: 'string',
    disabled: true,
  },
  dict_pos: {
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
          type: 'string',
        },
      },
    },
  },
  extension: {
    type: 'object',
    label: 'extension',
    fields: {
      origin: {
        type: 'string',
      },
      past_tense: {
        type: 'string',
      },
      past_participle: {
        type: 'string',
      },
      present_participle: {
        type: 'string',
      },
      3: {
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
      singular: {
        type: 'string',
      },
      plural: {
        type: 'string',
      },
    },
  },
};
export default {
  'n.': nDescriptor,
  'n.C.': nDescriptor,
  'n.U.': nDescriptor,
  'v.': vDescriptor,
  'vt.': vDescriptor,
  'vi.': vDescriptor,
  'v.vt.': vDescriptor,
  'v.vi.': vDescriptor,
  'v.aux.': vDescriptor,
  'v.link.': vDescriptor,
  'v.modal.': vDescriptor,
  'adj.': {
    ...metadata,
    extension: {
      type: 'object',
      label: 'extension',
      fields: {
        origin: {
          type: 'string',
        },
        comparative: {
          type: 'string',
        },
        superlative: {
          type: 'string',
        },
      },
    },
  },
  'adv.': metadata,
  'prep.': metadata,
  'pron.': metadata,
  'pron.poss.': metadata,
  'pron.refl.': metadata,
  'pron.dem.': metadata,
  'pron.rel.': metadata,
  'pron.recip.': metadata,
  'pron.int.': metadata,
  'pron.pers.': metadata,
  'pron.interrog.': metadata,
  'conj.': metadata,
  'cconj.': metadata,
  'sconj.': metadata,
};
