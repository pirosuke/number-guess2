<template>
  <svg id="app" width="500px" height="600px">
    <g transform="translate(1, 1)">
      <g class="message-block">
        <g v-if="hasWon">
          <rect width="450" height="40" x="0" y="0" stroke="none" fill="#3700b3" />
          <text pointer-events="none" x="225" y="25" stroke="none" fill="#fff" text-anchor="middle">あたり！こたえは {{ answer }} でした。</text>
          <rect width="450" height="30" x="0" y="42" stroke="none" rx="3" ry="3" style="fill:#03dac5;" @click="onResetClick" />
          <text pointer-events="none" x="225" y="62" fill="black" font-weight="bold" text-anchor="middle">もういちどはじめる</text>
        </g>
        <g v-else>
          <rect width="450" height="40" x="0" y="0" stroke="none" fill="#fff" stroke-width="1" />
          <text pointer-events="none" x="225" y="25" stroke="none" text-anchor="middle">かずあてゲーム2</text>
          <text pointer-events="none" x="225" y="50" stroke="none" text-anchor="middle">
            {{ level }}けたのすうじをえらんだよ。あててみてね。
          </text>
        </g>
      </g>

      <GuessBoard />
      <NumberKeyboard />
      <GuessList />
    </g>
  </svg>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import NumberKeyboard from './components/NumberKeyboard.vue';
import GuessList from './components/GuessList.vue';
import GuessBoard from './components/GuessBoard.vue';

@Component({
  components: {
    NumberKeyboard,
    GuessList,
    GuessBoard,
  },
})
export default class App extends Vue {
  get answer() {
    return this.$store.getters.getAnswer();
  }

  get hasWon() {
    return this.$store.getters.hasWon();
  }

  get level() {
    return this.$store.getters.getLevel();
  }

  public onResetClick(e: any) {
    this.$store.dispatch('resetGame');
  }

  public created() {
    this.$store.dispatch('resetGame');
  }
}
</script>

<style>
</style>
