#!/usr/bin/env node

const crontab = require('crontab');
const argv = require('yargs-parser')(process.argv.slice(2));
const {fileExists, error, success, attachMonitoring, upload} = require('./helpers');

/* Is file passed as argument? */
let filePath = argv._[0] || '';

/* If yes, make sure the file exists */
if (filePath) fileExists(filePath);

/* Register user - get back id */
let userId = 1;

/* Setup jobs
 *
 * Load cron file
 * Append urls
 * Push all jobs to api
 * Save to cron file
 *
 */

crontab.load('', filePath, (err, crons) => {
    if (err) error('Could not parse cron file');

    let jobs = crons.jobs();

    if (!jobs.length) error('No jobs found');
    else success(`Found ${jobs.length} jobs`);

    /* Attach monitoring */
    for (let job of jobs) {
        attachMonitoring(userId, job);
    }

    /* Upload jobs to API */
    upload(userId, jobs);

    /* Save changes to file */
    crons.save();
});

