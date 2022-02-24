# Simple Balance Checker

This is a simple website composed of a react frontend and node backend that allows a user to login and check the balance for a credit card. The goal was to write something mimicing 'real world' concerns of performance, security, testability and reasonable UX while balancing an imposed time limit of standing up the application in a few hours.

## Getting started

### Required software

Both the client and api were developed using the LTS version of node (v16 at the time of writing). See the `.nvmrc` for the compatible version. If you are using nvm, do `nvm use` to download and change to the correct version. Package managment are done using yarn. No other prerequistes are necessary.

### Running the application

As a first step, both applications require installing the dependencies via yarn (classic). Go to the subdirectory of each project and run `yarn install`. Once you have completed this, you can run each project independently by consulting the instructions in the individual README's of the projects.

See [here for the api](api/README.md) and [here for the frontend](client/README.md). The documents provide the details on required environment variables and how to run.

## Project architecture

This project consists of a [NextJS](https://https://nextjs.org/) front end backed by [express](https://expressjs.com/) and a simple REST api using [Fastify](https://www.fastify.io/). The api is not intended to be directly exposed publicly, but rather is reached by proxying requests though the front end at `/api`. Sessions are managed by the express cookie-session middleware which is enhanced by keeping a JWT access token in the session for the user that is signed by a shared secret between the front and backend processes. This simulates a standard Oauth/Oidc flow for securing an api and delegating identity (obviously there is some hand waving here because of constraints to simplify). No state is needed and the application could be scaled a needed (if it was a real app, which it is not). Further this mitigates security concerns by limiting the surface area exposed on the api and keeping tokens out of session state.

On the front end, for simplicity, the validation is delegated to built-in HTML5. This leverages a given browser's implementation to avoid extra libraries and confers some advtangages such as languages translated to the user's native language (if that was important). Styling is done using bootstrap 5, which was chosen to keep a simple layout without spending a lot of time. The scss version is used to afford removing any unnecessary features that are not used to limit the payload (no major effort was made to pare this down to the bare minimum, just noted that the opportunity is there). Api calls are done via fetch rather than additional 3rd party libraries.

Data sources are simply in-memory objects, but are segregated from the routing so that it would in theory be simple to plugin a real external data source.

## Application flow

From an end user perspective, when going to the application, you will be immediately prompted to login. As this is for just demonstration purposes, the login names are first initial + last name and the password is simply "password". Once logged in, the user is presented with an input field to enter a 16-digit card number for which to check the balance. The user can log out at any time.

### Sample accounts:

- username: jsmith, password: password, valid card: 5141222222229082
- username: pbean, password: password, valid card: 5141111111119844
