
import React, { useMemo, useReducer, useContext, useEffect } from "react";

export const actions = {
    NODE: 'NODE',
    MOVE: 'MOVE',
    MOUSE_X: 'MOUSE_X',
    MOUSE_Y: 'MOUSE_Y',
}

const initialState = {node: null, mouseX: null, mouseY: null};

const BoardContext = React.createContext({
    state: null,
    dispatch: null,
});

function reducer(state, action) {
    switch(action.type) {
        case actions.NODE: return {...state, node: action.payload};
        case actions.MOUSE_X: return {...state, mouseX: action.payload};
        case actions.MOUSE_Y: return {...state, mouseY: action.payload};
        case actions.MOVE: return {...state, mouseX: action.payload.x, mouseY: action.payload.y};
        default: return state;
    }
}

export const BoardProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    const contextValue = useMemo(() => {
        return { state, dispatch };
    }, [state, dispatch]);

    return <BoardContext.Provider value={contextValue}>
        {children}
    </BoardContext.Provider>
}

/**
 * Custom hook para utilizar este contexto en otros componentes
 */
 export const useBoardStore = () => useContext(BoardContext);