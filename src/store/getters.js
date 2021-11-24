import { getShapesBalanceCoeff } from '../helpers';

export default {
    getTotalManuallyLandedShapesWeight(state) {
        return state.manuallyLandedShapes.reduce((total, shape) => {
            total += shape.weight;
            
            return total;
        }, 0);
    },
    
    getTotalRandomlyLandedShapesWeight(state) {
        return state.randomlyLandedShapes.reduce((total, shape) => {
            total += shape.weight;
        
            return total;
        }, 0);
    },
    
    getBalanceRotation({ manuallyLandedShapes, randomlyLandedShapes}) {
        let rotation = 0;
        
        if (!manuallyLandedShapes.length) {
            return rotation;
        }
        
        const manuallyLandedShapesSum = getShapesBalanceCoeff(manuallyLandedShapes, true)
            , randomlyLandedShapesSum = getShapesBalanceCoeff(randomlyLandedShapes)
            , diff = manuallyLandedShapesSum - randomlyLandedShapesSum;
    
        if (manuallyLandedShapesSum < randomlyLandedShapesSum) {
            rotation = Math.abs(diff) / randomlyLandedShapesSum * 50
        } else {
            rotation = Math.abs(diff) / manuallyLandedShapesSum * -50;
        }
        
        return Math.floor(rotation);
    }
}
