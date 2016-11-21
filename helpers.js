const fs = require('fs');
const {red, green} = require('colors');
const md5 = require('blueimp-md5');

const baseUrl = 'https://cronduty.com';

/* Check if cron file exists */
let fileExists = (path) => {
    try {
        let stat = fs.statSync(path);
        return true;
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
    let combination = userId + jobString;
    let uniqueId = md5(combination).slice(0, 6);
    return uniqueId;
};

/* Remove curl url from command */
let stripMonitoring = (job) => {
    let command = job.command();

    let re = /curl(.*?)\|\| /g;
    let matches = command.match(re);
    if (!matches) return command;
    command = command.replace(matches[0], '');

    re = / && curl(.*?)done\/....../g;
    matches = command.match(re);
    command = command.replace(matches[0], '');

    return command;
};

/* Attach curl url to command */
let attachMonitoring = (userId, job) => {

    /* Clean */
    let strippedCommand = stripMonitoring(job);

    let uniqueId = getUniqueId(userId, strippedCommand);

    let command = `curl ${baseUrl}/start/${uniqueId}`;
    command += ` || `;
    command += strippedCommand;
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

