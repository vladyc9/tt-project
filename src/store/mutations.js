export default {
    toggleGameMode(state) {
        state.isGamePaused = !state.isGamePaused;
    },
    
    addFallingShape(state, shape) {
        state.fallingShapes.push(shape);
    },
    
    removeFallingShape(state) {
        state.fallingShapes.splice(0, 1);
    },
    
    addManuallyLandedShape(state, shape) {
        state.manuallyLandedShapes.push(shape);
    },
    
    addRandomlyLandedShape(state, shape) {
        state.randomlyLandedShapes.push(shape);
    },
    
    setShapeOffset({ fallingShapes }, { left }) {
        left ? fallingShapes[0].left -= 1 : fallingShapes[0].left += 1;
    },
    
    updateShape(state, updatedShape) {
        state.fallingShapes = state.fallingShapes.map(shape => {
            if (shape.id === updatedShape.id) {
                return updatedShape;
            }
            
            return shape;
        });
    },
    
    resetShapes(state) {
        state.fallingShapes = [];
        state.manuallyLandedShapes = [];
        state.randomlyLandedShapes = [];
    }
}
