const vDescriptor = {
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
  variations: {
    type: 'object',
    label: 'variations',
    fields: {
      original: {
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
      original: {
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
    variations: {
      type: 'object',
      label: 'variations',
      fields: {
        original: {
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
};
