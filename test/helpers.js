const test = require('ava');
const crontab = require('crontab');
const {fileExists, success, attachMonitoring, upload} = require('../helpers');

/* Overwriting functions to make them testable */
test.before(t => {
    process.exit = (code) => {
        return code; // Don't exit, return exit code instead
    };
    console.log = (message) => {
        return message; // Instead of logging
    };
});

test('fileExists +', t => {
    let exists = fileExists('package.json');
    t.true(exists);
});

test('fileExists -', t => {
    let exitCode = fileExists('fake-file');
    t.is(exitCode, 1);
});

test('success message', t => {
    let message = success('Happy message');
    t.is(message, '\n\u001b[32mHappy message\u001b[39m\n');
});

test.cb('attach monitoring - fresh', t => {
    let userId = 1;

    let result = crontab.load((err, crontab) => {
        let job = crontab.create('ls', '* * * * *');
        let result = attachMonitoring(userId, job);
        t.deepEqual(result, 'curl https://cronduty.com/start/29effd || ls && curl https://cronduty.com/done/29effd');
        t.end();
    });
});

test.cb('attach monitoring - update', t => {
    let userId = 1;

    let result = crontab.load((err, crontab) => {
        let job = crontab.create('curl https://cronduty.com/start/29effd || ls && curl https://cronduty.com/done/29effd', '* * * * *');
        let result = attachMonitoring(userId, job);
        t.deepEqual(result, 'curl https://cronduty.com/start/29effd || ls && curl https://cronduty.com/done/29effd');
        t.end();
    });

});

test.todo('upload');

