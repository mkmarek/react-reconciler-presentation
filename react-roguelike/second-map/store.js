const { createStore } = require('redux');

const initialState = { playerX: 10, playerY: 10, playerSpeed: 32 };
const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'KEYDOWN_119': return { ...state, playerY: state.playerY - state.playerSpeed};
        case 'KEYDOWN_100': return { ...state, playerX: state.playerX + state.playerSpeed}; 
        case 'KEYDOWN_115': return { ...state, playerY: state.playerY + state.playerSpeed}; 
        case 'KEYDOWN_97': return { ...state, playerX: state.playerX - state.playerSpeed}; 
    }
    return state;
}

const store = createStore(rootReducer)

module.exports = store;