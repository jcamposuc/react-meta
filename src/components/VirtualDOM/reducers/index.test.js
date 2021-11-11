import { ACTIONS, INITIAL_STATE, virtualDOMReducer } from ".";

describe('virtualDomReducer', () => {
    it(`${ACTIONS.ADD_ITEM} action`, () => {
        // Arrange
        const initialState = INITIAL_STATE;
        const lastIndex = INITIAL_STATE.currentList.length + 1;
        const newItem = {
            id: `idDB-${lastIndex}`,
            name: `tarea ${lastIndex}`,
        };
        const action = {
            type: ACTIONS.ADD_ITEM,
            payload: newItem,
        };
    
        // Act
        const newState = virtualDOMReducer(initialState, action);

        // Assert
        expect(newState).toEqual({
            ...initialState,
            previewList: initialState.currentList,
            currentList: [...initialState.currentList, newItem],
        });
    });

    it(`${ACTIONS.ADD_ITEM} action with priority`, () => {
        // Arrange
        const initialState = {
            ...INITIAL_STATE,
            withPriority: true,
        };
        const lastIndex = INITIAL_STATE.currentList.length + 1;
        const newItem = {
            id: `idDB-${lastIndex}`,
            name: `tarea ${lastIndex}`,
        };
        const action = {
            type: ACTIONS.ADD_ITEM,
            payload: newItem,
        };
    
        // Act
        const newState = virtualDOMReducer(initialState, action);

        // Assert
        expect(newState).toEqual({
            ...initialState,
            previewList: initialState.currentList,
            currentList: [newItem, ...initialState.currentList],
        });
    });

    it(`${ACTIONS.CHANGE_PRIORITY} action`, () => {
        // Arrange
        const initialState = INITIAL_STATE;
        const action = {
            type: ACTIONS.CHANGE_PRIORITY,
        };
    
        // Act
        const newState = virtualDOMReducer(initialState, action);

        // Assert
        expect(newState).toEqual({
            ...initialState,
            withPriority: !initialState.withPriority,
        });
    });

    it(`${ACTIONS.PRIORITIZE_LAST_ITEM} action`, () => {
        // Arrange
        const initialState = INITIAL_STATE;
        const action = {
            type: ACTIONS.PRIORITIZE_LAST_ITEM,
        };
    
        // Act
        const newState = virtualDOMReducer(initialState, action);

        // Assert
        const { length } = initialState.currentList;
        const lastItem = initialState.currentList[length - 1];
        expect(newState).toEqual({
            ...initialState,
            previewList: initialState.currentList,
            currentList: [lastItem, ...initialState.currentList.slice(0, length-1)],
        });
    });

    it(`should reset state to the initial state`, () => {
        // Arrange
        const initialState = {
            ...INITIAL_STATE,
            withPriority: true,
        };
        const action = {
            type: ACTIONS.RESET_STATE,
        };
    
        // Act
        const newState = virtualDOMReducer(initialState, action);

        // Assert
        expect(newState).toEqual(INITIAL_STATE);
    });

    it('should return initialState when action is not exist', () => {
        // Arrange
        const initialState = INITIAL_STATE;
        const action = {
            type: "fake-action"
        };
    
        // Act
        const newState = virtualDOMReducer(initialState, action);

        // Assert
        expect(newState).toEqual(initialState);
    });
})
