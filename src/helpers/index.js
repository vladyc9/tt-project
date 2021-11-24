import { MAX_OFFSET, MIN_OFFSET } from './constants';

export const getShapesBalanceCoeff = (shapes, left = false) => {
    let result = 0;
    
    shapes.forEach(shape => {
        if (left) {
            result += (100 - (shape.left * 2)) * shape.weight;
        } else {
            result += (shape.left * 2) * shape.weight;
        }
    });
    
    return result;
};

export const generateNumber = (min = 0, max = 0) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const generateShape = (() => {
    let shapeId = 1;
    
    return function() {
        return {
            id: shapeId++,
            weight: generateNumber(1, 10),
            type: generateNumber(1, 3),
            color: `rgb(${generateNumber(0, 255)},${generateNumber(0, 255)},${generateNumber(0, 255)})`,
            left: generateNumber(MIN_OFFSET, MAX_OFFSET),
            top: 0
        }
    }
})();
