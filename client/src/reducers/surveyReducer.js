import { FETCH_SURVEYS, REMOVE_SURVEY } from "../actions/types";

export default function(state = [], action) {
    switch (action.type) {
        case FETCH_SURVEYS:
            return action.payload;
        case REMOVE_SURVEY:
            return action.payload;
        default:
            return state;
    }
}