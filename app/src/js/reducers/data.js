function data(state = {}, action) {
    switch (action.type) {

        // add recipe
        case 'GET_DATA':
            return {
                ...state,
                data: action.data
            }
            break;

        // fallback
        default:
            return state;
    }
};

export default data;