const axios = require('axios');
const querystring = require('querystring');

const {error} = require('./helpers');

const registerUrl = 'https://rz2qv03g85.execute-api.us-east-1.amazonaws.com/dev/user';

let register = (user) => {
    return new Promise((resolve, reject) => {
        axios.post(registerUrl, user)
        .then(response => {
            let data = response.data;
            resolve(data);
        })
        .catch(err => {
            let message = err.response.data.error;
            error(message);
            reject(message);
        });
    });
};

let upload = (crons) => {

};

module.exports = {
    register,
    upload
};
