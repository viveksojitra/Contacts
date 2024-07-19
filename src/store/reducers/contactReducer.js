const initialState = {
    contacts: [],
    contact: null,
    record: null,
    error: null,
};

const contactReducer = (state = initialState, action) => {
    switch (action.type) {
        case "FETCH_CONTACTS":
            return {
                ...state,
                contacts: action.payload,
                contact: null,
            };

        case "ADD_CONTACT":
            return {
                ...state,
                contacts: action.payload,
                contact: null,
            };

        case "SELECT_CONTACT":
            return {
                ...state,
                contact: action.payload,
            };

        case "UPDATE_CONTACT":
            return {
                ...state,
                contact: action.payload,
            };

        case "DELETE_CONTACT":
            return {
                ...state,
                contact: action.payload,
            };

        case "RECORD_UPDATED":
            return {
                ...state,
                record: action.payload
            }

        case "RECORD_ERROR":
            return {
                ...state,
                error: action.payload
            }

        default:
            return state;
    }
};

export default contactReducer;