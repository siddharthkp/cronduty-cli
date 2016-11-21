const test = require('ava');
const crontab = require('crontab');
const {fileExists, attachMonitoring, upload} = require('../helpers');

test('fileExists +', t => {
    let exists = fileExists('package.json');
    t.true(exists);
});

test.todo('fileExists -');

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

