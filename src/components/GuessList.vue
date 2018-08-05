<template>
    <g transform="translate(171, 170)">
        <g>
            <text pointer-events="none" font-weight="bold" x="0" y="0">きろく</text>
            <text pointer-events="none" font-weight="bold" x="120" y="0">あたり</text>
            <text pointer-events="none" font-weight="bold" x="175" y="0">おしい</text>
        </g>
        <g transform="translate(0, 30)" v-for="(guess, index) in guessMessageList" v-bind:key="index">
            <text pointer-events="none" font-weight="bold" text-anchor="end" v-bind:x="guess.x + 30" v-bind:y="guess.y">{{ guess.index }}：</text>
            <text pointer-events="none" font-weight="bold" v-bind:x="guess.x + 40" v-bind:y="guess.y">{{ guess.value }}</text>
            <text pointer-events="none" font-weight="bold" text-anchor="end" v-bind:x="guess.x + 170" v-bind:y="guess.y">{{ guess.eats }}こ</text>
            <text pointer-events="none" font-weight="bold" text-anchor="end" v-bind:x="guess.x + 225" v-bind:y="guess.y">{{ guess.bites }}こ</text>
        </g>
    </g>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class GuessList extends Vue {
    get guessMessageList() {
        const guessList: any[] = this.$store.getters.getGuessList();
        const guessMessageList = guessList.map((v, i) => Object.assign(v, {
            index: i + 1,
            x: 0,
            y: 20 * i,
        }));

        return guessMessageList;
    }

    get hasWon() {
        return this.$store.getters.hasWon();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
