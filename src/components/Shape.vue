<template>
    <div
        class="shape"
        :class="shapeClass"
        :id="`shape-${shape.id}`"
        >
        <span class="weight">{{`${shape.weight} kg`}}</span>
    </div>
</template>

<script>
    const SHAPE_TYPES = {
        TRIANGLE: 1,
        SQUARE: 2,
        CIRCLE: 3
    };

    export default {
        name: 'Shape',

        props: {
            landed: {
                type: Boolean,
                default: false
            },

            shape: {
                type: Object,
                required: true
            }
        },

        computed: {
            shapeClass() {
                return {
                    'triangle': this.shape.type === SHAPE_TYPES.TRIANGLE,
                    'square': this.shape.type === SHAPE_TYPES.SQUARE,
                    'circle': this.shape.type === SHAPE_TYPES.CIRCLE
                }
            }
        },

        watch: {
            'shape.left': function(newLeft) {
                this.$el.style.left = `${newLeft}%`;
            }
        },

        mounted() {
            const shapeBounds = this.$el.getBoundingClientRect();

            this.landed ? this.placeLandedShape(shapeBounds) : this.placeFallingShape();
            this.setShapeColor();
        },

        methods: {
            placeLandedShape(shapeBounds) {
                this.$el.style.top = `-${shapeBounds.height}px`;
                this.$el.style.left = `calc(${this.shape.left * 2}%)`;
            },

            placeFallingShape() {
                this.$el.style.left = `${this.shape.left}%`;
            },

            setShapeColor() {
                if (this.shape.type === SHAPE_TYPES.TRIANGLE) {
                    this.$el.style.borderBottomColor = this.shape.color;
                } else {
                    this.$el.style.backgroundColor = this.shape.color;
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .shape {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 0;
    }

    .circle {
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }

    .square {
        width: 50px;
        height: 50px;
    }

    .triangle {
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 0 25px 50px 25px;
        border-color: transparent;
        text-align: center;

        .weight {
            position: absolute;
            top: 10px;
        }
    }
</style>
