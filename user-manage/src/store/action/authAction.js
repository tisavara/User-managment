import axios from 'axios';

const linkAPI = process.env.REACT_APP_SERVER_URI

export const loginAction = (login) => {
    return (dispatch, getState) => {
        axios.post(linkAPI + 'login', login).then(response => {
            console.log(response);
            
        }).catch(error => {
            console.log(error);
        })
    }
}