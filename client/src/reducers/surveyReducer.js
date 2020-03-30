import {SEND_SURVEY} from "../actions/types";

export default function(state = null, action) {
    switch (action.type) {
        case SEND_SURVEY:
            return state;
        default:
            return state;
    }
}