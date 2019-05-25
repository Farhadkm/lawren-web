import { ADD_MESSAGE, UPDATE_MESSAGE, DELETE_MESSAGE } from "../actions/actionTypes";

const INITIAL_STATE = {
    messages: {}
}
export default (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case ADD_MESSAGE:
            return { ...state, messages: { ...state.messages, [action.payload.message.messageId]: action.payload.message } }
        case UPDATE_MESSAGE:
            return {
                ...state, messages: { ...state.messages, [action.payload.message.messageId]: action.payload.message }
            }
        case DELETE_MESSAGE:
            var messagesCopy = { ...state.messages }
            delete messagesCopy[action.payload.messageId]
            return {
                ...state, messages: messagesCopy
            }
        default:
            return state
    }


}