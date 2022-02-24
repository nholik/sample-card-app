# Sample API

This is a sample api using fastify. All routes are protected via JWT to simulate Oauth/Oidc.

## Getting started

See [here](../README.md) for prereqs. After doing this, you can run `yarn install`, then run `node index.js` to launch the api.
You will need a .env file with `JWT_SECRET` which can be any string but must match the analagous value in the frontend project.
There is no special build step for this project.
