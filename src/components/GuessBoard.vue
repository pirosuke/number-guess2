<template>
    <g transform="translate(1, 30)">
        <g v-for="item in selectNumberList" v-bind:key="item.index">
            <rect width="50" height="50" stroke="#ccc" fill="#fff" stroke-width="1" v-bind:x="item.x" v-bind:y="item.y" />
            <text pointer-events="none" font-weight="bold" v-bind:x="item.x + 20" v-bind:y="item.y + 30">{{ item.value }}</text>
        </g>
    </g>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import * as _ from 'lodash';

@Component
export default class GuessBoard extends Vue {
    get selectNumberList() {
        const level = this.$store.getters.getLevel();
        const selectedNumbers: string[] = this.$store.getters.getSelectedNumbers();
        return _.concat(selectedNumbers, _.fill(Array(level - selectedNumbers.length), '')).map((n, i) => {
            return {
                index: i,
                value: n,
                x: 50 * i,
                y: 50,
            };
        });
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
