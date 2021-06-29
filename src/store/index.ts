import Vue from 'vue';
import Vuex from 'vuex';
import { cloneDeep } from 'lodash';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    baseWord: {} as any,
  },
  mutations: {
    setBaseWord(state, word) {
      state.baseWord = {
        form: word.form,
        word: word.word,
      };
      if (word.explanation) {
        state.baseWord.explanation = cloneDeep(word.explanation);
      }
      if (word.extension) {
        state.baseWord.extension = cloneDeep(word.extension);
      }
    },
  },
  actions: {
  },
  modules: {
  },
});
