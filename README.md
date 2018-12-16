# MusicMonkey - MonoRepo

This is the MonoRepo for MusicMonkey.

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)

This project uses [lerna](https://lernajs.io/) and [yarn workspaces](https://yarnpkg.com/lang/en/docs/workspaces/) to manage dependencies and executing tasks in the workspace.

## Getting started

This project expects you to use [yarn](https://yarnpkg.com/) as your package manager instead of npm.

After cloning this project, first bootstrap:

`yarn bootstrap`

The to run:

`yarn start`

This will run all projects at the same time.

MusicMonkey host app will start on <https://locahost:3001>

MusicMonkey guest app will start on <https://locahost:3002>

Other commands:

`yarn clean` - deletes all node_modules

`yarn test` - run all tests in all projects

`yarn lint` - lint all code in all projects

## Deploying

This app is deployed to AWS using Codeship.

On any merge to master, all projects get deployed. Future optimisation will be to only deploy apps that have changes.
