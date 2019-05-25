import { ADD_MESSAGE, UPDATE_MESSAGE, DELETE_MESSAGE } from "./actionTypes";
import store from "../store";
import { getMessage as getMessageAPI, updateMessage as updateMessageAPI, deleteMessage as deleteMessageAPI } from "../services/messageService";

export const getMessage = (messageId) => dispatch => {
    // check if the message already exists in the redux store if so, retireive and use it
    if (store.getState().messages[messageId]) {
        console.log('MESSAGE_SERVICE: got the message from cache')
        return Promise.resolve(store.getState().messages[messageId])
    }
    console.log('MESSAGE SERIVCE: No message in the cache, making API call for retreiving the message')
    // if not we would user the serive API call to get he message and also add it to the redux
    return getMessageAPI(messageId)
        .then(message => {
            console.log('MESSAGE_SERVICE: got the message from API, storing into the cache...')
            dispatch({ type: ADD_MESSAGE, payload: { message } })
            return message
        })
}

export const updateMessage = (messageId, message) => dispatch => {
    return updateMessageAPI(messageId, message)
        .then(_ => {
            dispatch({ type: UPDATE_MESSAGE, payload: { message, messageId } })
        })
}

export const deleteMessage = (messageId) => dispatch => {
    return deleteMessageAPI(messageId)
        .then(_ => { dispatch({ type: DELETE_MESSAGE, payload: { messageId } }) })
}

