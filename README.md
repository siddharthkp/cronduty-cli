# cronduty-cli

![WIP](https://img.shields.io/badge/status-work_in_progress-yellow.svg)

[![Build Status](https://travis-ci.org/siddharthkp/cronduty-cli.svg?branch=master)](https://travis-ci.org/siddharthkp/cronduty-cli)
[![Coverage
Status](https://coveralls.io/repos/github/siddharthkp/cronduty-cli/badge.svg)](https://coveralls.io/github/siddharthkp/cronduty-cli)

cron monitoring with minimal configuration

### Install

`npm install -g cronduty`

### Usage

`cron`

cronduty will wrap your commands with tracking commands and add them to the cronduty API.

&nbsp;

```
30 * * * * sh /usr/ubuntu/backup.sh
```

becomes

```
30 * * * * curl https://cronduty.com/start/29effd || sh /usr/ubuntu/backup.sh && curl https://cronduty.com/done/29effd
```
