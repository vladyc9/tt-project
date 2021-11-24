<template>
    <div class="falling-zone">
        <shape v-for="shape in fallingShapes" :key="shape.id" :shape="shape"></shape>
    </div>
</template>

<script>
    import Shape from './Shape';
    import { generateShape } from '../helpers';
    import { mapMutations, mapState } from 'vuex';

    const FALLING_SPEED = 15;

    export default {
        name: 'FallingZone',

        data() {
            return {
                intervalInstance: null
            }
        },

        components: {
            Shape
        },

        computed: {
            ...mapState([
                'fallingShapes',
                'isGamePaused',
                'manuallyLandedShapes',
                'randomlyLandedShapes'
            ]),
        },

        watch: {
            isGamePaused: function(isPaused) {
                isPaused ? clearInterval(this.intervalInstance) : this.setShapeInMotion();
            }
        },

        methods: {
            ...mapMutations([
                'updateShape',
                'addFallingShape',
                'addManuallyLandedShape',
                'addRandomlyLandedShape',
                'removeFallingShape',
            ]),

            setShapeInMotion() {
                this.intervalInstance = setInterval(() => {
                    const shapeHTMLel = document.getElementById(`shape-${this.fallingShapes[0].id}`)
                        , boardHTMLel = document.querySelector(`.board`)
                        , shapeHTMLBounds = shapeHTMLel.getBoundingClientRect()
                        , boardHTMLBounds = boardHTMLel.getBoundingClientRect();

                    if (shapeHTMLBounds.bottom >= boardHTMLBounds.top) {
                        clearInterval(this.intervalInstance);

                        this.addManuallyLandedShape(this.fallingShapes[0]);
                        this.removeFallingShape();

                        this.addFallingShape(generateShape());
                        this.addRandomlyLandedShape(generateShape());
                        this.setShapeInMotion();

                    } else {
                        this.updateShape({
                            ...this.fallingShapes[0],
                            top: ++this.fallingShapes[0].top
                        });

                        shapeHTMLel.style.top = `${this.fallingShapes[0].top + 1}px`;
                    }
                }, FALLING_SPEED);
            }
        }
    }
</script>

<style scoped lang="scss">
    .falling-zone {
        height: 100%;
    }
</style>
