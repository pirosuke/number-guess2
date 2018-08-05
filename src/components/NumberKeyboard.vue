<template>
    <g transform="translate(1, 150)">
        <g class="number-key" v-for="item in numberList" v-bind:key="item.index">
            <rect width="50" height="50" stroke="#ccc" v-bind:fill="(item.isSelected ? '#fff' : '#6200ee')" stroke-width="1" @click="onClickKey(item.value)" v-bind:x="item.x" v-bind:y="item.y" />
            <text pointer-events="none" font-weight="bold" v-bind:fill="(item.isSelected ? '#6200ee' : '#fff')" v-bind:x="item.x + 20" v-bind:y="item.y + 30">{{ item.value }}</text>
        </g>
    </g>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import * as _ from 'lodash';

@Component
export default class NumberKeyboard extends Vue {
    get numberList() {
        const selectedNumbers: string[] = this.$store.getters.getSelectedNumbers();
        return ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', '', '' ].map((n, i) => {
            return {
                index: i,
                value: n,
                isSelected: _.includes(selectedNumbers, n),
                x: 50 * (i % 3),
                y: 50 * (i - (i % 3)) / 3,
            };
        });
    }

    public onClickKey(num: string) {
        this.$store.dispatch('selectNumber', num);
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
