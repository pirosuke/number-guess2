import Vue from 'vue';
import Vuex from 'vuex';

import * as numeron from './numeron';

export interface Guess {
  value: string;
  eats: number;
  bites: number;
}

interface State {
  answer: string;
  guesses: Guess[];
  hasWon: boolean;
  level: number;
  selectedNumbers: string[];
}

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    answer: '',
    guesses: [],
    hasWon: false,
    level: 3,
    selectedNumbers: [],
  } as State,
  getters: {
    getLevel: (state, getters) => () => {
      return state.level;
    },
    getAnswer: (state, getters) => () => {
      return state.answer;
    },
    getSelectedNumbers: (state, getters) => () => {
      return state.selectedNumbers;
    },
    getGuessList: (state, getters) => () => {
      return state.guesses;
    },
    hasWon: (state, getters) => () => {
      return state.hasWon;
    },
  },
  mutations: {
    generateAnswer(state, payload) {
      state.answer = numeron.createAnswer(state.level);
    },
    addSelectedNumber(state, payload) {
      state.selectedNumbers.push(payload.value);
    },
    resetSelectedNumber(state, payload) {
      state.selectedNumbers = [];
    },
    addGuess(state, payload) {
      state.guesses.push(payload);
    },
    clearGuesses(state, payload) {
      state.guesses = [];
    },
    setWon(state, payload) {
      state.hasWon = payload.hasWon;
    },
  },
  actions: {
    resetGame(context) {
      context.commit('clearGuesses');
      context.commit('generateAnswer');
      context.commit('resetSelectedNumber');
      context.commit('setWon', {
        hasWon: false,
      });
    },
    selectNumber(context, num: string) {
      if (context.state.selectedNumbers.length === context.state.level) {
        context.commit('resetSelectedNumber', {});
      }

      context.commit('addSelectedNumber', {
        value: num,
      });
      if (context.state.selectedNumbers.length === context.state.level) {
        const guess = context.state.selectedNumbers.join('');

        const guessResult = numeron.guess(context.state.answer, guess);
        if (guessResult.result) {
          context.commit('setWon', {
            hasWon: true,
          });
        } else {
          context.commit('addGuess', {
            value: guess,
            eats: guessResult.eats,
            bites: guessResult.bites,
          });
        }
      }
    },
  },
});
