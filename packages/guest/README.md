# Music Monkey Guest Web Application

[ ![Codeship Status for ruairitobrien/music-monkey-guest](https://app.codeship.com/projects/b25fe630-4df0-0136-7141-0679aea688a0/status?branch=master)](https://app.codeship.com/projects/293427)

MusicMonkey Guest is the guest component of the MusicMonkey application. There is also a hosts application [here](http://hosts.musicmonkey.io/). The guest and host application are fairly similar in functionality and architecture but the code bases and deployments have been kept separate to reduce overall complexity and ease of change,

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

This application runs on port 3002. THe host application runs on port 3001. This is so they can both be run locally at the same time. Also, note the api backend and authorisation services whitelist specific hosts and ports so if you change the port, the application will not work.

## Deploying

The deployment pipeline for this is on <https://codeship.com/>.

On every merge to master, this deploys to <http://guests.musicmonkey.io/>.

The build pipeline builds the application, runs the linter and runs tests. Once all those are successful, the application deploys to AWS using [CloudFront](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html).

CloudFront uses a CDN with caching when serving the UI so it can take over an hour for changes to become visible in production. If a change is urgent, we can go in and invalidate the cache.

## Getting an invite to test with

The guest application can't do much until the logged in user has an 'Event' to work with. An event is created by a host and guests are invited to events.

Currently, the way invites work is, a host creates an event and shares an invite link. To do this, go to the host site here: <http://hosts.musicmonkey.io/> and login with your Spotify account.

Create a new event or open an existing one. Once in the event, click the invite link on the top right to copy the link to your clipboard.

![Event View](docs/img/EventView.png?raw=true 'Event View')

Opening that link in your browser will open the guest application and load the event data related to that invite.

If you are running the guest application locally and want to load an invite, you will need to change the host to localhost. For example, this URL: <https://guests.musicmonkey.io/invite/65e46338-22e5-431c-abc4-6f070c12cb46> would become <http://localhost:3002/invite/65e46338-22e5-431c-abc4-6f070c12cb46>

Currently, the guest application stores the invite ID locally, in local storage. We do persist a users invite in our database but we are not linking them just yet so if you change browser and login, your previous invites are not retrieved for your user. We will be changing that soon but something to be aware of.
