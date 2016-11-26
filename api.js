const axios = require('axios');
const querystring = require('querystring');

const {error} = require('./helpers');

const base = 'https://rz2qv03g85.execute-api.us-east-1.amazonaws.com/dev/';

let register = (user) => {
    return new Promise((resolve, reject) => {
        axios.post(base + 'user', user)
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

let upload = (userId, jobs) => {
    let crons = jobs.map(job => job.toString());
    return new Promise((resolve, reject) => {
        axios.post(base + 'crons', crons)
        .then(response => {
            let data = response.data;
            resolve(data);
        })
        .catch(err => {
            let message = err.response.data.error || err.response.data.message;
            error(message);
            reject(message);
        });
    });
};

module.exports = {
    register,
    upload
};
