const vDescriptor = {
  extension: {
    type: 'object',
    label: 'extension',
    fields: {
      3: {
        type: 'string',
      },
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
    },
  },
};
const nDescriptor = {
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
  'v.': vDescriptor,
  'adj.': {
    extension: {
      type: 'object',
      label: 'extension',
      fields: {
        original: {
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
};
