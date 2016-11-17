const fs = require('fs');
const {red, green} = require('colors');
const md5 = require('blueimp-md5');

const baseUrl = 'https://cronduty.com';

/* Check if cron file exists */
let fileExists = (path) => {
    try {
        let stat = fs.statSync(path);
    } catch (e) {
        error(`${path} does not exist`);
    }
};

/* Pretty error message + exit */
let error = (message) => {
    console.log(`\n${red(message)}\n`);
    process.exit(1);
};

/* Pretty success message */
let success = (message) => {
    console.log(`\n${green(message)}\n`);
};

/* Generate an unique id for each job
 *
 * Based on userId + cron string
 */
let getUniqueId = (userId, jobString) => {
    let randomDigits = Math.random().toString(36).slice(2, 6);
    let combination = userId + jobString + randomDigits;
    let uniqueId = md5(combination).slice(0, 4);
    return uniqueId;
};

/* Remove curl url from command */
let stripMonitoring = (userId, job) => {

};

/* Attach curl url to command */
let attachMonitoring = (userId, job) => {
    let uniqueId = getUniqueId(userId, job.toString());

    let command = `curl ${baseUrl}/start/${uniqueId}`;
    command += ` || `;
    command += job.command();
    command += ` && `;
    command += `curl ${baseUrl}/done/${uniqueId}`;

    return job.command(command);
};

/* Upload to API */
let upload = (userId, jobs) => {};

module.exports = {
    fileExists,
    error,
    success,
    attachMonitoring,
    upload
};

