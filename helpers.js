const fs = require('fs');
const {red, green} = require('colors');
const md5 = require('blueimp-md5');

const baseUrl = 'https://cronduty.com';

/* Check if cron file exists */
let fileExists = (path) => {
    try {
        fs.statSync(path);
        return true;
    } catch (e) {
        return error(`${path} does not exist`);
    }
};

/* Pretty error message + exit */
let error = (message) => {
    console.log(`\n${red(message)}\n`);
    return process.exit(1);
};

/* Pretty success message */
let success = (message) => {
    console.log(`\n${green(message)}\n`);
};

/* Generate an unique hash for each job
 *
 * Based on userId + cron string
 */
let getUniqueHash = (userId, jobString) => {
    let combination = userId + jobString;
    let uniqueHash = md5(combination).slice(0, 6);
    return uniqueHash;
};

/* Remove curl url from command */
let stripMonitoring = (job) => {
    let command = job.command();

    /* Match text between curl and || */
    let re = /curl(.*?)\|\| /g;
    let matches = command.match(re);
    if (!matches) return command;
    command = command.replace(matches[0], '');

    /*
     * Match text between '&& curl' and 'done/......'
     * each . stands for a charachter
     */
    re = / && curl(.*?)done\/....../g;
    matches = command.match(re);
    command = command.replace(matches[0], '');

    return command;
};

/* Attach curl url to command */
let attachMonitoring = (userId, job) => {

    /* Clean */
    let strippedCommand = stripMonitoring(job);

    let uniqueHash = getUniqueHash(userId, strippedCommand);

    let command = `curl ${baseUrl}/start/${uniqueHash}`;
    command += ` || `;
    command += strippedCommand;
    command += ` && `;
    command += `curl ${baseUrl}/done/${uniqueHash}`;

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

