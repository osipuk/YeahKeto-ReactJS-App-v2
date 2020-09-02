# YeahKeto-ReactJS-App-v2 Frontend

## Setup

You need the following dependencies:

1. Node.js version 8 or higher
2. Redis server version 3 or higher
3. Yarn

Installation:

1. Download the code.
2. Install the Node packages (run this in a console):
    ```bash
    yarn install
    ```
3. Copy the environment configuration:
    ```bash
    cp example.env .env
    ```
4. Setup the configuration in the `.env` file (usually the default configuration is fine).

## Start

Starting the application in the development mode:

1. Start a Redis server (e.g. by running `redis-server` in a console).
2. `yarn dev`

Starting the application in the production mode:

1. `yarn build` (you need to do it only once after each code update).
2. Start a Redis server (e.g. by running `redis-server` in a console).
3. `yarn start`

When the application is started, open http://localhost:3001 or http://localhost:3001/promo in a browser.

## Docs 

Architecture documentation: https://docs.google.com/document/d/1jr9OcKldhq58CRmS8Wz396kFjGgcic7rZa5R3hoaaGA

Low-level documentation:

* open `/out/index.html` in browser to access JSDoc documentation for the frontend app.
* `yarn generate-docs` command to re-generate docs in your local machine. `/out` folder contains the html and css files are generated. These files use the comments written in the sourcecode and present all of them in one presentable place. 
* Please see http://usejsdoc.org/, for all the available tags we can use while writing JSdocs. 
