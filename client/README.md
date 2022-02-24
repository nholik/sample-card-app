# Sample front end

This is a nextjs site with an express backend demoing a basic login and account data gathering site.


## Running

Please see [here](../README.md) for prereqs.  After doing this, you can run `yarn install`, then `yarn dev` to launch the host.
You will need a .env file with `JWT_SECRET` which can be any string but must match the analagous value in the api project.
Once you have this setup, you can view the site at localhost:5000.


## Building

Just run `yarn build`.  The following directories/files are needed to deploy:

- server.js
- node_modules
- package.json
- .next