export const ACTIONS = {
    ADD_ITEM: "ADD_ITEM",
    RESET_STATE: "RESET_STATE",
    CHANGE_PRIORITY: "CHANGE_PRIORITY",
    PRIORITIZE_LAST_ITEM: "PRIORITIZE_LAST_ITEM",
};

export const INITIAL_STATE = {
    withPriority: false,
    previewList: [],
    currentList: [{
        id: "idDB-1",
        name: "tarea 1",
    }, {
        id: "idDB-2",
        name: "tarea 2",
    }],
};

export const virtualDOMReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ACTIONS.ADD_ITEM:
            return {
                ...state,
                previewList: state.currentList,
                currentList: state.withPriority 
                    ? [action.payload, ...state.currentList] 
                    : [...state.currentList, action.payload],
            };
        case ACTIONS.PRIORITIZE_LAST_ITEM:
            const { length } = state.currentList;
            const lastItem = state.currentList[length - 1];
            return {
                ...state,
                previewList: state.currentList,
                currentList: [lastItem, ...state.currentList.slice(0, length-1)],
            };
        case ACTIONS.CHANGE_PRIORITY:
            return {
                ...state,
                withPriority: !state.withPriority,
            };
        case ACTIONS.RESET_STATE:
            return {
                ...INITIAL_STATE,
            };
        default:
            return state
    }
}
