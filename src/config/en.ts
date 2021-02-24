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
export default {
  'n.': {
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
  },
  'v.': vDescriptor,
  'vt.': vDescriptor,
  'vi.': vDescriptor,
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
  'conj.': metadata,
  'pron.': metadata,
};
