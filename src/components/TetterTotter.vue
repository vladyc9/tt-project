<template>
    <div class="tetter-totter">
        <div class="board">
            <div class="left-side">
                <shape v-for="shape in manuallyLandedShapes" :key="shape.id" :shape="shape" landed></shape>
            </div>

            <div class="right-side">
                <shape v-for="shape in randomlyLandedShapes" :key="shape.id" :shape="shape" landed></shape>
            </div>
        </div>
        <div class="base"></div>
    </div>
</template>

<script>
    import Shape from './Shape';
    import { mapGetters, mapState } from 'vuex';

    export default {
        name: 'TetterTotter',

        components: {
            Shape
        },

        computed: {
            ...mapState(['manuallyLandedShapes', 'randomlyLandedShapes']),
            ...mapGetters(['getBalanceRotation']),

            // TODO
            // balanceAngleStyle() {
            //     console.log(this.getBalanceRotation);
            //
            //     return {
            //         transform: `rotate(${this.getBalanceRotation}deg)`
            //     };
            // }
        },
    }
</script>

<style scoped lang="scss">
    .tetter-totter {
        display: flex;
        align-items: center;
        flex-direction: column;
    }

    .board {
        width: 100%;
        height: 5px;
        background-color: hotpink;

        display: flex;
        justify-content: space-between;
    }

    .base {
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 0 75px 150px 75px;
        border-color: transparent transparent #4d4d4d transparent;
    }

    .left-side, .right-side {
        position: relative;
        width: 50%;
    }
</style>
