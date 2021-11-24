<template>
    <div class="game-field">
        <falling-zone></falling-zone>
        <tetter-totter></tetter-totter>
    </div>
</template>

<script>
    import TetterTotter from './TetterTotter';
    import FallingZone from './FallingZone';
    import { mapActions } from 'vuex';

    export default {
        name: 'GameField',

        components: {
            FallingZone,
            TetterTotter
        },

        mounted() {
            this.prepareGame();
        },

        methods: {
            ...mapActions(['prepareGame'])
        }
    }
</script>

<style scoped lang="scss">
    .game-field {
        width: 50%;
        height: 500px;
        margin: 0 auto;
        position: relative;
        flex-direction: column;
        display: flex;
    }
</style>
