<template>
    <section class="control-panel">
        <div class="game-statistic">
            <div class="board">
                <div>
                    Manually landed: <span class="game-statistic--weight">{{`${getTotalManuallyLandedShapesWeight} kg`}}</span>
                </div>
                <div>
                    Randomly landed: <span class="game-statistic--weight">{{`${getTotalRandomlyLandedShapesWeight} kg`}}</span>
                </div>
            </div>
            <div class="momentum">
                Momentum: <span class="game-statistic--weight">{{`${firstFallingShape} kg`}}</span>
            </div>
            <div class="balance">
                Balance: <span class="game-statistic--balance">{{`${getBalanceRotation} deg`}}</span>
            </div>
        </div>
        <div class="control-buttons">
            <button class="button--play-pause" @click="onGameModeClickHandler">{{gameModeName}}</button>
            <button class="button--restart" @click="onRestartClickHandler">Restart</button>

            <div class="direction-buttons">
                <button class="button--left" @click="onUiButtonsDirectionHandler(true)">Move left</button>
                <button class="button--right" @click="onUiButtonsDirectionHandler(false)">Move right</button>
            </div>
        </div>
    </section>
</template>

<script>
    import { mapActions, mapGetters, mapMutations, mapState } from 'vuex';
    import { MAX_OFFSET, MIN_OFFSET } from '../helpers/constants';

    const BUTTONS = {
        PLAY: 'Play',
        PAUSE: 'Pause'
    };

    const KEYS = {
        ENTER: 'Enter',
        ARROW_LEFT: 'ArrowLeft',
        ARROW_RIGHT: 'ArrowRight'
    };

    const STEP_KEYDOWN_LENGTH = 1;
    const STEP_CLICK_UI_LENGTH = 20;

    export default {
        name: 'ControlPanel',

        mounted() {
            window.addEventListener('keydown', this.onKeyDownHandler);
        },

        beforeDestroy() {
            window.removeEventListener('keydown', this.onKeyDownHandler);
        },

        computed: {
            ...mapState([
                'isGamePaused',
                'fallingShapes'
            ]),
            ...mapGetters([
                'getTotalManuallyLandedShapesWeight',
                'getTotalRandomlyLandedShapesWeight',
                'getBalanceRotation'
            ]),

            gameModeName() {
                return this.isGamePaused ? BUTTONS.PLAY : BUTTONS.PAUSE;
            },

            firstFallingShape() {
                return (this.fallingShapes[0] && this.fallingShapes[0].weight) || 0;
            }
        },

        methods: {
            ...mapMutations(['toggleGameMode', 'setShapeOffset']),
            ...mapActions(['prepareGame']),

            onGameModeClickHandler() {
                this.toggleGameMode();
            },

            onRestartClickHandler() {
                !this.isGamePaused && this.toggleGameMode();
                this.prepareGame();
            },

            onKeyDownHandler(event) {
                if ((event.code === KEYS.ARROW_LEFT || event.code === KEYS.ARROW_RIGHT) && !this.isGamePaused) {
                    this.changeShapePosition(event.code);
                }

                if (event.code === KEYS.ENTER) {
                    this.$store.commit('toggleGameMode');
                }
            },

            onUiButtonsDirectionHandler(left = false) {
                this.setShapeOffset({
                    left,
                    stepLength: STEP_CLICK_UI_LENGTH
                });
            },

            changeShapePosition(code) {
                if (code === KEYS.ARROW_LEFT && ((this.fallingShapes[0].left - 1) >= MIN_OFFSET)) {
                    this.setShapeOffset({
                        left: true,
                        stepLength: STEP_KEYDOWN_LENGTH
                    });
                }

                if (code === KEYS.ARROW_RIGHT && ((this.fallingShapes[0].left + 1) <= MAX_OFFSET)) {
                    this.setShapeOffset({
                        left: false,
                        stepLength: STEP_KEYDOWN_LENGTH
                    });
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .control-panel {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    .game-statistic {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 10px;
        width: 400px;

        &--weight, &--balance {
            font-weight: bold;
        }
    }

    .board {
        display: flex;
        justify-content: space-around;
        width: 100%;
    }

    .direction-buttons {
        margin-top: 10px;
    }
</style>
