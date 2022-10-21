# kf-backend-test

This application posts all site outages for the `norwich-pear-tree` site that have occurred since the start of 2022

# Set Up
## Pre-Requisite
Run `npm install` from the directory where this repo is cloned.
Set environment variables in the .env file at the root of this project. The API key is missing as we don't want to commit secrets to a public version control repository.

## Run tests
Run `npm run test` to run all the unit tests

## Run app
Run `npm run start` to run the application

# Architecture
There are two controllers `outage` and `siteInfo` which retrieve all outages data and site info for the norwich pear tree site.

There is a `siteOutage` service which takes this data and transforms it into a site outage array. This array consists of all outages for devices that belong to the specified site since midnight Jan 1st 2022.

Finally we have `siteOutage` controller which is responsible for posting all of this data to the provided post API.

## Notes
Currently the `siteInfo` and `siteOutage` controller are configured to only query info and post outages for the Norwich pear tree site. This could be made more generic if requirements changed to include more sites.

I was unable to work on the extension problem of handling potential 500 errors. If I was to implement a solution I would introduce a retry mechanism. 