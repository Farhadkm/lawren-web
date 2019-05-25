import Axios from "axios";

const axios = Axios.create();
axios.interceptors.request.use(config => {
    console.log(config)
    return config
})
const url = 'https://3uzu6sza97.execute-api.us-east-1.amazonaws.com/dev'

export const getMessage = (messageId) => {
    return axios.get(`${url}/messages/${messageId}`)
        .then(res => {
            console.log(res)
            return res.data})
}

export const createMessage = (message) => {
    return axios.post(`${url}/messages`, message)
        .then(res => {
            return res.data.messageId
        })
}

export const updateMessage = (messageId, message) => {
    return axios.put(`${url}/messages/${messageId}`, message)
        .then(res => {
            console.log(res.data); return res.data
        })
}

export const deleteMessage = (messageId) => axios.delete(`${url}/messages/${messageId}`)


export const getNLP = (NlpText) => {
    var bodyFormData = new FormData();
    bodyFormData.append('user_input', NlpText || 'Tenant');
    return axios.post('http://3.95.142.53', bodyFormData)
}