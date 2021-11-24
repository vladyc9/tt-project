import { generateShape } from '../helpers';

export default {
    prepareGame({ commit }) {
        commit('resetShapes');
        
        commit('addFallingShape', generateShape());
        commit('addFallingShape', generateShape());
        
        commit('addRandomlyLandedShape', generateShape(true));
    }
}
