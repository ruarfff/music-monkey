# Music Monkey Host Web Application

[ ![Codeship Status for ruairitobrien/music-monkey-host](https://app.codeship.com/projects/8ac61ef0-4a6f-0136-2620-4a52da5c14e7/status?branch=master)](https://app.codeship.com/projects/292696)

MusicMonkey Host is the host component of the MusicMonkey application. There is also a guest application [here](http://guests.musicmonkey.io/).

## Building

This is built with [React](https://reactjs.org/) using [create-react-app-typescript](https://github.com/wmonk/create-react-app-typescript).

Install dependencies: `yarn`

Run: `yarn start`

Linting: `yarn lint`

Testing: `yarn test`

When running the application locally, it will connect to the production API ar <https://api.musicmonkey.io/>.

If you want to run the API locally, you can make this app connect to that instead by running `yarn start:local`

Running tests: `yarn test`

### A note on ports

This application runs on port 3001. The guest application runs on port 3002. This is so they can both be run locally at the same time. Also, note the api backend and authorisation services whitelist specific hosts and ports so if you change the port, the application will not work.

## Deploying

The deployment pipeline for this is on <https://codeship.com/>.

On every merge to master, this deploys to <http://hosts.musicmonkey.io/>.

The build pipeline builds the application, runs the linter and runs tests. Once all those are successful, the application deploys to AWS using [CloudFront](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html).

CloudFront uses a CDN with caching when serving the UI so it can take over an hour for changes to become visible in production. If a change is urgent, we can go in and invalidate the cache.
